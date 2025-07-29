package com.ewandzdigital.talentvault.model;

import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "resumes")
public class Resume {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "candidate_name", nullable = false, length = 255)
    private String candidateName;

    @Column(nullable = false, length = 255)
    private String email;

    @Column(name = "contact_number", nullable = false, length = 20)
    private String contactNumber;

    @Column(name = "country_code", length = 10)
    private String countryCode;

    @Column(name ="country",length = 255)
    private String country;

    @Column(name ="city",nullable = false, length = 255)
    private String city; // renamed from location

    @Column(name = "highest_education", length = 255)
    private String highestEducation;

    @Column(length = 255)
    private String specialization;

    @Column(name = "primary_skillset", nullable = false, length = 255)
    private String primarySkillset;

    @Column(name = "secondary_skillset", nullable = false, length = 255)
    private String secondarySkillset;

    @Column(name = "work_experience", nullable = false)
    private Integer workExperience;

    @Column(name = "last_organization", length = 255)
    private String lastOrganization;

    @Column(name ="department",length = 255)
    private String department;

    @Column(name = "current_status", length = 255)
    private String currentStatus;

    @Column(name = "willing_to_relocate")
    private Boolean willingToRelocate = false;

    @Column(name = "valid_passport")
    private Boolean validPassport = false;

    @Column(name = "passport_expiry_year")
    private Integer passportExpiryYear;

    @Column(name = "file_path", nullable = false, unique = true, length = 255)
    private String filePath;

    @Column(name = "uploaded_at")
    private Timestamp uploadedAt;

    // Removed: contact, passportExpiry, and position fields

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getCandidateName() {
        return candidateName;
    }

    public void setCandidateName(String candidateName) {
        this.candidateName = candidateName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getCountryCode() {
        return countryCode;
    }

    public void setCountryCode(String countryCode) {
        this.countryCode = countryCode;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getHighestEducation() {
        return highestEducation;
    }

    public void setHighestEducation(String highestEducation) {
        this.highestEducation = highestEducation;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public String getPrimarySkillset() {
        return primarySkillset;
    }

    public void setPrimarySkillset(String primarySkillset) {
        this.primarySkillset = primarySkillset;
    }

    public String getSecondarySkillset() {
        return secondarySkillset;
    }

    public void setSecondarySkillset(String secondarySkillset) {
        this.secondarySkillset = secondarySkillset;
    }

    public Integer getWorkExperience() {
        return workExperience;
    }

    public void setWorkExperience(Integer workExperience) {
        this.workExperience = workExperience;
    }

    public String getLastOrganization() {
        return lastOrganization;
    }

    public void setLastOrganization(String lastOrganization) {
        this.lastOrganization = lastOrganization;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getCurrentStatus() {
        return currentStatus;
    }

    public void setCurrentStatus(String currentStatus) {
        this.currentStatus = currentStatus;
    }

    public Boolean getWillingToRelocate() {
        return willingToRelocate;
    }

    public void setWillingToRelocate(Boolean willingToRelocate) {
        this.willingToRelocate = willingToRelocate;
    }

    public Boolean getValidPassport() {
        return validPassport;
    }

    public void setValidPassport(Boolean validPassport) {
        this.validPassport = validPassport;
    }

    public Integer getPassportExpiryYear() {
        return passportExpiryYear;
    }

    public void setPassportExpiryYear(Integer passportExpiryYear) {
        this.passportExpiryYear = passportExpiryYear;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public Timestamp getUploadedAt() {
        return uploadedAt;
    }

    public void setUploadedAt(Timestamp uploadedAt) {
        this.uploadedAt = uploadedAt;
    }
}
