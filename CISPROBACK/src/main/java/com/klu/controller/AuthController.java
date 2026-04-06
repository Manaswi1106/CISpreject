package com.klu.controller;

import java.util.List;
import java.util.Map;
import com.klu.model.Log;
import com.klu.repository.LogRepository;
import com.klu.service.WAFService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.time.LocalDateTime;

@RestController
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private LogRepository logRepository;

    @Autowired
    private WAFService wafService;

    // ✅ Home endpoint (fixes Whitelabel error)
    @GetMapping("/")
    public String home() {
        return "WAF Backend Running 🚀";
    }

    // ✅ Get all logs
    @GetMapping("/logs")
    public List<Log> getLogs() {
        return logRepository.findAll();
    }

    // ✅ Login API with WAF check
    @PostMapping("/login")
    public String login(@RequestBody Map<String, String> data) {

        String username = data.get("username");

        // 🚫 Malicious check
        if (wafService.isMaliciousInput(username)) {

            Log log = new Log();
            log.setAction("Login");
            log.setAttackType("SQL/XSS Attack");
            log.setStatus("Blocked");
            log.setTimestamp(LocalDateTime.now().toString());

            logRepository.save(log);

            return "WAF: Malicious login detected 🚫";
        }

        // ✅ NORMAL LOGIN → SAVE THIS ALSO
        Log log = new Log();
        log.setAction("Login");
        log.setAttackType("None");
        log.setStatus("Success");
        log.setTimestamp(LocalDateTime.now().toString());

        logRepository.save(log);

        return "Login Successful ✅";
    }
    @PostMapping("/upload")
    public String uploadFile(@RequestParam("file") MultipartFile file) {

        String fileName = file.getOriginalFilename();

        try {
            // 🚫 WAF check
            if (wafService.isMaliciousInput(fileName)) {

                Log log = new Log();
                log.setAction("File Upload");
                log.setAttackType("Malicious File");
                log.setStatus("Blocked");
                log.setTimestamp(LocalDateTime.now().toString());
                logRepository.save(log);

                return "WAF: Malicious file blocked 🚫";
            }

            // 📂 CREATE FOLDER (ABSOLUTE PATH)
            String uploadDir = System.getProperty("user.dir") + "/uploads/";
            java.io.File directory = new java.io.File(uploadDir);

            if (!directory.exists()) {
                boolean created = directory.mkdirs();
                System.out.println("Folder created: " + created);
            }

            // 📄 SAVE FILE
            String filePath = uploadDir + fileName;
            file.transferTo(new java.io.File(filePath));

            System.out.println("File saved at: " + filePath);

            // ✅ SAVE LOG
            Log log = new Log();
            log.setAction("File Upload");
            log.setAttackType("None");
            log.setStatus("Success");
            log.setTimestamp(LocalDateTime.now().toString());
            logRepository.save(log);

            return "File uploaded & saved ✅";

        } catch (Exception e) {
            e.printStackTrace(); // 🔥 VERY IMPORTANT
            return "Upload failed ❌: " + e.getMessage();
        }
    }
    @GetMapping("/files/{name}")
    public org.springframework.core.io.Resource getFile(@PathVariable String name) throws Exception {

        java.nio.file.Path path = java.nio.file.Paths.get("uploads").resolve(name);
        return new org.springframework.core.io.UrlResource(path.toUri());
    }
}
        
