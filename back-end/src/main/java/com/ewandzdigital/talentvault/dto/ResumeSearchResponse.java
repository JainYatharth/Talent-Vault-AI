package com.ewandzdigital.talentvault.dto;

import lombok.Data;

@Data
public class ResumeSearchResponse {
    private Long id;
    private String candidateName;
    private String email;
    private String contactNumber;
    private String city;
    private String country;
    private String highestEducation;
//    private String specialization;
    private String primarySkillset;
    private String secondarySkillset;
    private Integer workExperience;
    private String lastOrganization;
    private String department;
    private Boolean willingToRelocate;
    private Boolean validPassport;

    public Long getId() {
        return id;
    }

    public Boolean getValidPassport() {
        return validPassport;
    }

    public void setValidPassport(Boolean validPassport) {
        this.validPassport = validPassport;
    }

    public void setId(Long id) {
        this.id = id;
    }

//    public String getFilePath() {
//        return filePath;
//    }
//
//    public void setFilePath(String filePath) {
//        this.filePath = filePath;
//
//    }
    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public Boolean getWillingToRelocate() {
        return willingToRelocate;
    }

    public void setWillingToRelocate(Boolean willingToRelocate) {
        this.willingToRelocate = willingToRelocate;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getLastOrganization() {
        return lastOrganization;
    }

    public void setLastOrganization(String lastOrganization) {
        this.lastOrganization = lastOrganization;
    }

    public Integer getWorkExperience() {
        return workExperience;
    }

    public void setWorkExperience(Integer workExperience) {
        this.workExperience = workExperience;
    }

    public String getSecondarySkillset() {
        return secondarySkillset;
    }

    public void setSecondarySkillset(String secondarySkillset) {
        this.secondarySkillset = secondarySkillset;
    }

    public String getPrimarySkillset() {
        return primarySkillset;
    }

    public void setPrimarySkillset(String primarySkillset) {
        this.primarySkillset = primarySkillset;
    }

//    public String getSpecialization() {
//        return specialization;
//    }
//
//    public void setSpecialization(String specialization) {
//        this.specialization = specialization;
//    }

    public String getHighestEducation() {
        return highestEducation;
    }

    public void setHighestEducation(String highestEducation) {
        this.highestEducation = highestEducation;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCandidateName() {
        return candidateName;
    }

    public void setCandidateName(String candidateName) {
        this.candidateName = candidateName;
    }

//    private String filePath;
}
