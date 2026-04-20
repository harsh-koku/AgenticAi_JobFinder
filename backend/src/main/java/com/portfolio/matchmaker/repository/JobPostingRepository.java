package com.portfolio.matchmaker.repository;

import com.portfolio.matchmaker.model.JobPosting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobPostingRepository extends JpaRepository<JobPosting, String> {
}
