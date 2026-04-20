package com.portfolio.matchmaker.controller;

import com.portfolio.matchmaker.model.JobPosting;
import com.portfolio.matchmaker.service.JobPostingService;
import com.portfolio.matchmaker.scheduler.AgentOrchestratorScheduler;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "*") // Allow frontend access
public class JobPostingController {

    private final JobPostingService jobPostingService;
    private final AgentOrchestratorScheduler scheduler;

    public JobPostingController(JobPostingService jobPostingService, AgentOrchestratorScheduler scheduler) {
        this.jobPostingService = jobPostingService;
        this.scheduler = scheduler;
    }

    @GetMapping
    public ResponseEntity<List<JobPosting>> getJobs() {
        return ResponseEntity.ok(jobPostingService.getAllJobPostings());
    }

    @PostMapping("/trigger")
    public ResponseEntity<String> triggerAgentNow() {
        // Run the workflow instantly in a new thread so it doesn't block the HTTP request
        new Thread(scheduler::triggerAgentWorkflow).start();
        return ResponseEntity.ok("AI Agent Workflow has been manually triggered in the background!");
    }
}
