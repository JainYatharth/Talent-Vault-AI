package com.ewandzdigital.talentvault.controller;

import com.ewandzdigital.talentvault.dto.*;
import com.ewandzdigital.talentvault.service.ResumeSearchService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@Slf4j
@RestController
@RequestMapping("/resume")
public class ResumeSearchController {

    @Autowired
    private ResumeSearchService resumeSearchService;

    /**
     * 🔹 New endpoint for search without pagination
     */
    @GetMapping("/search")
    public ResponseEntity<ApiResponse> searchAllResumes(
            @RequestParam Map<String, String> filters
    ) {
        List<ResumeSearchResponse> results = resumeSearchService.searchResumesWithoutPagination(filters);
        return ResponseEntity.ok(new ApiResponse(true, "Results retrieved successfully", results));
    }
}
