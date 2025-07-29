package com.ewandzdigital.talentvault.controller;

import com.ewandzdigital.talentvault.dto.ApiResponse;
import com.ewandzdigital.talentvault.dto.ResumeParsedDTO;
import com.ewandzdigital.talentvault.model.Resume;
import com.ewandzdigital.talentvault.service.OpenAiService;
import com.ewandzdigital.talentvault.service.ResumeService;
import com.ewandzdigital.talentvault.util.TikaTextExtractor;

import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Slf4j
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/resume")
public class ResumeController {

    private static final Logger log = LoggerFactory.getLogger(ResumeController.class);

    @Autowired
    private OpenAiService openAiService;

    @Autowired
    private ResumeService resumeService;

    // ✅ Resume Parsing Endpoint — returns parsed fields as JSON
    @PostMapping("/parse")
    public ResponseEntity<?> parseResume(@RequestParam("file") MultipartFile file) {
        try {
            log.info("Received resume file: {}", file.getOriginalFilename());

            String extractedText = TikaTextExtractor.extractText(file);
            log.info("Text extracted successfully");

            ResumeParsedDTO parsed = openAiService.extractFieldsFromText(extractedText);
            log.info("Resume parsed successfully");

            return ResponseEntity.ok(parsed);
        } catch (Exception e) {
            log.error("Resume parsing failed: {}", e.getMessage(), e); // Add full stack trace
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to parse resume: " + e.getMessage());
        }
    }


    // ✅ Resume Upload Endpoint — stores full resume data (DB)
    @PostMapping("/upload")
    public ResponseEntity<ApiResponse> uploadResume(
            @RequestParam String candidateName,
            @RequestParam String email,
            @RequestParam String contactNumber,
            @RequestParam String countryCode,
            @RequestParam String country,
            @RequestParam String city,
            @RequestParam String highestEducation,
            @RequestParam String specialization,
            @RequestParam String primarySkill,
            @RequestParam String secondarySkill,
            @RequestParam Integer workExperience,
            @RequestParam String lastOrganization,
            @RequestParam String department,
            @RequestParam String currentStatus,
            @RequestParam Boolean willingToRelocate,
            @RequestParam Boolean validPassport,
            @RequestParam(required = false) Integer passportExpiryYear,
            @RequestParam MultipartFile file
    ) throws IOException {
        try {
            Long userIdLong = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            Integer userId = userIdLong.intValue();

            Resume resume = new Resume();
            resume.setUserId(userId);
            resume.setCandidateName(candidateName);
            resume.setEmail(email);
            resume.setCountryCode(countryCode);
            resume.setContactNumber(contactNumber);
            resume.setCountry(country);
            resume.setCity(city);
            resume.setHighestEducation(highestEducation);
            resume.setSpecialization(specialization);
            resume.setPrimarySkillset(primarySkill);
            resume.setSecondarySkillset(secondarySkill);
            resume.setWorkExperience(workExperience);
            resume.setLastOrganization(lastOrganization);
            resume.setDepartment(department);
            resume.setCurrentStatus(currentStatus);
            resume.setWillingToRelocate(willingToRelocate);
            resume.setValidPassport(validPassport);
            resume.setPassportExpiryYear(passportExpiryYear);

            log.info("Upload request received from frontend - Candidate: {}, Email: {}", candidateName, email);
            String result = resumeService.uploadResume(resume, file);

            return ResponseEntity.ok(new ApiResponse(true, "Resume uploaded successfully"));
        } catch (IOException e) {
            log.error("Error uploading resume: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Upload failed"));
        }
    }
}
