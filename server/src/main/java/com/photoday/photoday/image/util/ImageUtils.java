package com.photoday.photoday.image.util;

import org.springframework.http.ContentDisposition;
import java.nio.charset.StandardCharsets;

public class ImageUtils {
    public static ContentDisposition createContentDisposition(String categoryWithFileName) {
        String fileName = categoryWithFileName;
        return ContentDisposition.builder("attachment")
                .filename(fileName, StandardCharsets.UTF_8)
                .build();
    }
}
