package com.klu.service;

import org.springframework.stereotype.Service;

@Service
public class WAFService {

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