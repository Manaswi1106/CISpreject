package com.klu.service;

import org.springframework.stereotype.Service;

@Service
public class WAFService {
    public boolean isInvalidFile(String filename) {
    if (filename == null) return true;

    // Example validation (you can modify)
    return filename.contains("..") || filename.contains("/") || filename.contains("\\");
}
    // Simple attack detection logic
    public boolean isMaliciousInput(String input) {

        if (input == null) return false;

        String lower = input.toLowerCase();

        return lower.contains("select") ||
               lower.contains("drop") ||
               lower.contains("insert") ||
               lower.contains("delete") ||
               lower.contains("<script>") ||
               lower.contains("--");
    }
}
