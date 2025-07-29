package com.ewandzdigital.talentvault.util;

import org.apache.tika.Tika;
import org.apache.tika.exception.TikaException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public class TikaTextExtractor {

    private static final Tika tika = new Tika();

    public static String extractText(MultipartFile file) throws IOException, TikaException {
        return tika.parseToString(file.getInputStream());
    }
}
