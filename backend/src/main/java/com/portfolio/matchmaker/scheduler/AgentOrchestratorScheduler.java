package com.portfolio.matchmaker.scheduler;

import com.portfolio.matchmaker.model.JobPosting;
import com.portfolio.matchmaker.service.JobPostingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Component
public class AgentOrchestratorScheduler {

    private static final Logger log = LoggerFactory.getLogger(AgentOrchestratorScheduler.class);

    private final RestTemplate restTemplate;
    private final JobPostingService jobPostingService;

    public AgentOrchestratorScheduler(RestTemplate restTemplate, JobPostingService jobPostingService) {
        this.restTemplate = restTemplate;
        this.jobPostingService = jobPostingService;
    }

    @Value("${agent-service.url}")
    private String agentServiceUrl;

    // Run every day at 8:00 AM server time
    @Scheduled(cron = "0 0 8 * * ?")
    public void triggerAgentWorkflow() {
        log.info("Starting Daily Agentic Matchmaker Workflow...");
        try {
            String endpoint = agentServiceUrl + "/trigger-workflow";
            ResponseEntity<List<JobPosting>> response = restTemplate.exchange(
                    endpoint,
                    HttpMethod.POST,
                    null,
                    new ParameterizedTypeReference<List<JobPosting>>() {}
            );

            List<JobPosting> jobs = response.getBody();
            if (jobs != null && !jobs.isEmpty()) {
                log.info("Received {} job postings from AI Agent. Saving to Database...", jobs.size());
                for (JobPosting job : jobs) {
                    try {
                        jobPostingService.saveJobPosting(job);
                        log.info("Successfully saved job: {} at {}", job.getJobTitle(), job.getCompanyName());
                    } catch (Exception e) {
                        log.warn("Failed to save job (skipping duplicate): {}", job.getJobTitle());
                    }
                }
            } else {
                log.info("Workflow completed but no matching jobs were found.");
            }
        } catch (Exception ex) {
            log.error("Error communicating with AI Agent Service: ", ex.getMessage());
        }
    }
}
