package com.ewandzdigital.talentvault.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResumeParsedDTO {
    private String candidateName;
    private String email;
    private String contactNumber;
    private String code;
    private String country;
    private String city;
    private String highestEducation;
    private String specialization;
    private String primarySkill;
    private String secondarySkill;
    private Integer workExperience;
    private String lastOrganization;
    private String department;
    private String currentStatus;
}
