package com.ewandzdigital.talentvault.service;


import com.ewandzdigital.talentvault.model.Resume;
import com.ewandzdigital.talentvault.repository.ResumeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;
import java.io.*;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;


@Service
public class ResumeService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Autowired
    private ResumeRepository resumeRepo;

    public String uploadResume(Resume resume, MultipartFile file) throws IOException {
        // Save file to disk
        String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path filepath = Paths.get(uploadDir, filename);
        Files.createDirectories(filepath.getParent());
        Files.write(filepath, file.getBytes());

        // Set file path & timestamp
        resume.setFilePath(filepath.toString());
        resume.setUploadedAt(new Timestamp(System.currentTimeMillis()));

        // Save metadata to DB
        resumeRepo.save(resume);

        return "Resume uploaded successfully.";
    }


}
