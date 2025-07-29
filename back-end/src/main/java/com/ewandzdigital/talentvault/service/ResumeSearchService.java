package com.ewandzdigital.talentvault.service;

import com.ewandzdigital.talentvault.dto.ResumeSearchResponse;
import com.ewandzdigital.talentvault.model.Resume;
import jakarta.persistence.*;
import jakarta.persistence.criteria.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ResumeSearchService {

    @Autowired
    private EntityManager entityManager;


     // Method for search without pagination

    public List<ResumeSearchResponse> searchResumesWithoutPagination(Map<String, String> filters) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();

        CriteriaQuery<Resume> query = cb.createQuery(Resume.class);
        Root<Resume> root = query.from(Resume.class);

        List<Predicate> predicates = buildPredicates(filters, cb, root);

        query.select(root).where(cb.and(predicates.toArray(new Predicate[0])))
                .orderBy(cb.desc(root.get("uploadedAt")));

        List<Resume> resumes = entityManager.createQuery(query).getResultList();

        return resumes.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    //  Common predicate builder for reuse
    private List<Predicate> buildPredicates(Map<String, String> filters, CriteriaBuilder cb, Root<Resume> root) {
        List<Predicate> predicates = new ArrayList<>();

        filters.forEach((key, value) -> {
            if (value == null || value.isEmpty()) return;

            String[] values = value.split(",");
            List<Predicate> orPredicates = new ArrayList<>();

            for (String v : values) {
                v = v.trim().toLowerCase();

                switch (key) {
                    case "name":
                    case "candidateName":
                        orPredicates.add(cb.like(cb.lower(root.get("candidateName")), "%" + v + "%"));
                        break;
                    case "country":
                        orPredicates.add(cb.like(cb.lower(root.get("country")), "%" + v + "%"));
                        break;
                    case "city":
                        orPredicates.add(cb.like(cb.lower(root.get("city")), "%" + v + "%"));
                        break;
                    case "lastOrganization":
                        orPredicates.add(cb.like(cb.lower(root.get("lastOrganization")), "%" + v + "%"));
                        break;
                    case "highestEducation":
                        orPredicates.add(cb.like(cb.lower(root.get("highestEducation")), "%" + v + "%"));
                        break;
                    case "primarySkillset":
                        orPredicates.add(cb.like(cb.lower(root.get("primarySkillset")), "%" + v + "%"));
                        break;
                    case "secondarySkillset":
                        orPredicates.add(cb.like(cb.lower(root.get("secondarySkillset")), "%" + v + "%"));
                        break;
                    case "specialization":
                        orPredicates.add(cb.like(cb.lower(root.get("specialization")), "%" + v + "%"));
                        break;
                    case "department":
                        orPredicates.add(cb.like(cb.lower(root.get("department")), "%" + v + "%"));
                        break;
                    case "workExperience":
                        try {
                            int minExp = Integer.parseInt(v);
                            orPredicates.add(cb.greaterThanOrEqualTo(root.get("workExperience"), minExp));
                        } catch (NumberFormatException ignored) {}
                        break;
                    case "willingToRelocate":
                        if (v.equals("yes") || v.equals("true")) {
                            orPredicates.add(cb.equal(root.get("willingToRelocate"), true));
                        } else if (v.equals("no") || v.equals("false")) {
                            orPredicates.add(cb.equal(root.get("willingToRelocate"), false));
                        }
                        break;
                    case "validPassport":
                        if (v.equals("yes") || v.equals("true")) {
                            orPredicates.add(cb.equal(root.get("validPassport"), true));
                        } else if (v.equals("no") || v.equals("false")) {
                            orPredicates.add(cb.equal(root.get("validPassport"), false));
                        }
                        break;
                }
            }
            if (!orPredicates.isEmpty()) {
                predicates.add(cb.or(orPredicates.toArray(new Predicate[0])));
            }
        });

        return predicates;
    }

    private ResumeSearchResponse mapToDto(Resume resume) {
        ResumeSearchResponse dto = new ResumeSearchResponse();
        dto.setId(resume.getId());
        dto.setCandidateName(resume.getCandidateName());
        dto.setEmail(resume.getEmail());
        dto.setContactNumber(resume.getContactNumber());
        dto.setCity(resume.getCity());
        dto.setHighestEducation(resume.getHighestEducation());
//        dto.setSpecialization(resume.getSpecialization());
        dto.setPrimarySkillset(resume.getPrimarySkillset());
        dto.setSecondarySkillset(resume.getSecondarySkillset());
        dto.setWorkExperience(resume.getWorkExperience());
        dto.setLastOrganization(resume.getLastOrganization());
        dto.setDepartment(resume.getDepartment());
        dto.setWillingToRelocate(resume.getWillingToRelocate());
//        dto.setFilePath(resume.getFilePath());
        dto.setValidPassport(resume.getValidPassport());
        return dto;
    }

    // In ResumeSearchService.java
    public List<Resume> searchResumesForDownload(Map<String, String> filters) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Resume> query = cb.createQuery(Resume.class);
        Root<Resume> root = query.from(Resume.class);

        List<Predicate> predicates = new ArrayList<>();

        filters.forEach((key, value) -> {
            if (value == null || value.trim().isEmpty()) return;

            String[] values = value.split(",");
            List<Predicate> orPredicates = new ArrayList<>();

            for (String v : values) {
                v = v.trim().toLowerCase();

                switch (key) {
                    case "name":
                    case "candidateName":
                        orPredicates.add(cb.like(cb.lower(root.get("candidateName")), "%" + v + "%"));
                        break;
                    case "country":
                        orPredicates.add(cb.like(cb.lower(root.get("country")), "%" + v + "%"));
                        break;
                    case "city":
                        orPredicates.add(cb.like(cb.lower(root.get("city")), "%" + v + "%"));
                        break;
                    case "lastOrganization":
                        orPredicates.add(cb.like(cb.lower(root.get("lastOrganization")), "%" + v + "%"));
                        break;
                    case "highestEducation":
                        orPredicates.add(cb.like(cb.lower(root.get("highestEducation")), "%" + v + "%"));
                        break;
                    case "primarySkillset":
                        orPredicates.add(cb.like(cb.lower(root.get("primarySkillset")), "%" + v + "%"));
                        break;
                    case "secondarySkillset":
                        orPredicates.add(cb.like(cb.lower(root.get("secondarySkillset")), "%" + v + "%"));
                        break;
                    case "specialization":
                        orPredicates.add(cb.like(cb.lower(root.get("specialization")), "%" + v + "%"));
                        break;
                    case "department":
                        orPredicates.add(cb.like(cb.lower(root.get("department")), "%" + v + "%"));
                        break;
                    case "workExperience":
                        try {
                            int minExp = Integer.parseInt(v);
                            orPredicates.add(cb.greaterThanOrEqualTo(root.get("workExperience"), minExp));
                        } catch (NumberFormatException ignored) {}
                        break;
                    case "willingToRelocate":
                        if (v.equals("yes") || v.equals("true")) {
                            orPredicates.add(cb.isTrue(root.get("willingToRelocate")));
                        } else if (v.equals("no") || v.equals("false")) {
                            orPredicates.add(cb.isFalse(root.get("willingToRelocate")));
                        }
                        break;
                    case "validPassport":
                        if (v.equals("yes") || v.equals("true")) {
                            orPredicates.add(cb.isTrue(root.get("validPassport")));
                        } else if (v.equals("no") || v.equals("false")) {
                            orPredicates.add(cb.isFalse(root.get("validPassport")));
                        }
                        break;
                }
            }

            if (!orPredicates.isEmpty()) {
                predicates.add(cb.or(orPredicates.toArray(new Predicate[0])));
            }
        });

        query.select(root)
                .where(cb.and(predicates.toArray(new Predicate[0])))
                .orderBy(cb.desc(root.get("uploadedAt")));

        return entityManager.createQuery(query).getResultList();
    }

}
