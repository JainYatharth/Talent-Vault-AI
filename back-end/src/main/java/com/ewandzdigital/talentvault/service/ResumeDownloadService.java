package com.ewandzdigital.talentvault.service;

import com.ewandzdigital.talentvault.model.Resume;
import com.ewandzdigital.talentvault.repository.ResumeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@Service
public class ResumeDownloadService {

    @Autowired
    private ResumeRepository resumeRepository;

    public Resource loadFileById(Long id) throws IOException {
        Resume resume = resumeRepository.findById(id)
                .orElseThrow(() -> new FileNotFoundException("Resume not found with id: " + id));

        Path filePath = Paths.get(resume.getFilePath());
        if (!Files.exists(filePath)) {
            throw new FileNotFoundException("File not found at path: " + filePath);
        }

        return new UrlResource(filePath.toUri());
    }

    public File createZipFromResumes(List<Resume> resumes) throws IOException {
        File zipFile = File.createTempFile("resumes-", ".zip");

        try (ZipOutputStream zos = new ZipOutputStream(new FileOutputStream(zipFile))) {
            for (Resume resume : resumes) {
                Path filePath = Paths.get(resume.getFilePath());
                if (!Files.exists(filePath)) continue;

                zos.putNextEntry(new ZipEntry(filePath.getFileName().toString()));
                Files.copy(filePath, zos);
                zos.closeEntry();
            }
        }

        return zipFile;
    }



}
