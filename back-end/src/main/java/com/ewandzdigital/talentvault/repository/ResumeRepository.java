package com.ewandzdigital.talentvault.repository;

import com.ewandzdigital.talentvault.model.Resume;
import org.springframework.data.jpa.repository.JpaRepository;


import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResumeRepository extends JpaRepository<Resume, Long> {

    // Find all resumes by candidate name (case-insensitive contains)
    List<Resume> findByCandidateNameContainingIgnoreCase(String candidateName);

    // Find all resumes by primary skillset
    List<Resume> findByPrimarySkillsetContainingIgnoreCase(String primarySkillset);

    // Find by city
    List<Resume> findByCityContainingIgnoreCase(String city);

    // Filter by multiple fields
    List<Resume> findByCandidateNameContainingIgnoreCaseAndPrimarySkillsetContainingIgnoreCaseAndCityContainingIgnoreCase(
            String candidateName, String primarySkillset, String city
    );

    // Get all resumes for a user (foreign key)
    List<Resume> findByUserId(Integer userId);
}
