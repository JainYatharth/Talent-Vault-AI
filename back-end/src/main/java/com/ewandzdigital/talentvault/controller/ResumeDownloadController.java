package com.ewandzdigital.talentvault.controller;


import com.ewandzdigital.talentvault.model.Resume;
import com.ewandzdigital.talentvault.service.ResumeDownloadService;
import com.ewandzdigital.talentvault.service.ResumeSearchService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/resume")
public class ResumeDownloadController {

    @Autowired
    private ResumeDownloadService resumeDownloadService;

    @Autowired
    private ResumeSearchService resumeSearchService;

    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> downloadResume(@PathVariable Long id) throws IOException {
        Resource file = resumeDownloadService.loadFileById(id);

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + file.getFilename() + "\"")
                .body(file);
    }

    @GetMapping("/download-all")
    public ResponseEntity<Resource> downloadFilteredResumes(@RequestParam Map<String, String> filters) throws IOException {
        // Use the search service to get all matching resumes (no pagination, get all results!)
        List<Resume> filteredResumes = resumeSearchService.searchResumesForDownload(filters);

        // Generate the zip file containing all matching resumes
        File zipFile = resumeDownloadService.createZipFromResumes(filteredResumes);

        // Stream the zip file to the client
        InputStreamResource resource = new InputStreamResource(new FileInputStream(zipFile));

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"filtered-resumes.zip\"")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .contentLength(zipFile.length())
                .body(resource);
    }
}
