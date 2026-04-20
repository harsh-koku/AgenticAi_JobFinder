package com.portfolio.matchmaker.model;

import io.hypersistence.utils.hibernate.type.json.JsonType;
import jakarta.persistence.*;
import org.hibernate.annotations.Type;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "job_postings")
public class JobPosting {

    @Id
    @Column(length = 36, updatable = false, nullable = false)
    private String id;

    @Column(name = "company_name", nullable = false)
    private String companyName;

    @Column(name = "job_title", nullable = false)
    private String jobTitle;

    @Column(name = "description_summary", columnDefinition = "TEXT", nullable = false)
    private String descriptionSummary;

    @Type(JsonType.class)
    @Column(columnDefinition = "json", nullable = false)
    private List<String> requiredSkills;

    @Column(name = "application_link", length = 512, nullable = false, unique = true)
    private String applicationLink;

    @Column(name = "match_score", nullable = false)
    private Integer matchScore;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    public JobPosting() {}

    public JobPosting(String id, String companyName, String jobTitle, String descriptionSummary, List<String> requiredSkills, String applicationLink, Integer matchScore, LocalDateTime createdAt) {
        this.id = id;
        this.companyName = companyName;
        this.jobTitle = jobTitle;
        this.descriptionSummary = descriptionSummary;
        this.requiredSkills = requiredSkills;
        this.applicationLink = applicationLink;
        this.matchScore = matchScore;
        this.createdAt = createdAt;
    }

    @PrePersist
    protected void onCreate() {
        if (id == null) {
            id = UUID.randomUUID().toString();
        }
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
    }

    // Getters
    public String getId() { return id; }
    public String getCompanyName() { return companyName; }
    public String getJobTitle() { return jobTitle; }
    public String getDescriptionSummary() { return descriptionSummary; }
    public List<String> getRequiredSkills() { return requiredSkills; }
    public String getApplicationLink() { return applicationLink; }
    public Integer getMatchScore() { return matchScore; }
    public LocalDateTime getCreatedAt() { return createdAt; }

    // Setters
    public void setId(String id) { this.id = id; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }
    public void setJobTitle(String jobTitle) { this.jobTitle = jobTitle; }
    public void setDescriptionSummary(String descriptionSummary) { this.descriptionSummary = descriptionSummary; }
    public void setRequiredSkills(List<String> requiredSkills) { this.requiredSkills = requiredSkills; }
    public void setApplicationLink(String applicationLink) { this.applicationLink = applicationLink; }
    public void setMatchScore(Integer matchScore) { this.matchScore = matchScore; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    // Manual Builder
    public static JobPostingBuilder builder() {
        return new JobPostingBuilder();
    }

    public static class JobPostingBuilder {
        private String companyName;
        private String jobTitle;
        private String descriptionSummary;
        private List<String> requiredSkills;
        private String applicationLink;
        private Integer matchScore;

        public JobPostingBuilder companyName(String companyName) { this.companyName = companyName; return this; }
        public JobPostingBuilder jobTitle(String jobTitle) { this.jobTitle = jobTitle; return this; }
        public JobPostingBuilder descriptionSummary(String descriptionSummary) { this.descriptionSummary = descriptionSummary; return this; }
        public JobPostingBuilder requiredSkills(List<String> requiredSkills) { this.requiredSkills = requiredSkills; return this; }
        public JobPostingBuilder applicationLink(String applicationLink) { this.applicationLink = applicationLink; return this; }
        public JobPostingBuilder matchScore(Integer matchScore) { this.matchScore = matchScore; return this; }

        public JobPosting build() {
            JobPosting jp = new JobPosting();
            jp.setCompanyName(this.companyName);
            jp.setJobTitle(this.jobTitle);
            jp.setDescriptionSummary(this.descriptionSummary);
            jp.setRequiredSkills(this.requiredSkills);
            jp.setApplicationLink(this.applicationLink);
            jp.setMatchScore(this.matchScore);
            return jp;
        }
    }
}
