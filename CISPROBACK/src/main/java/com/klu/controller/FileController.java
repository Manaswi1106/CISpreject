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
public class FileController {

    @Autowired
    private WAFService wafService;

    @Autowired
    private LogRepository logRepository;
    

    @PostMapping("/file-upload")
    public String upload(@RequestParam("file") MultipartFile file) {

        String filename = file.getOriginalFilename();

        if (wafService.isInvalidFile(filename)) {

            Log log = new Log();
            log.setAction("Upload");
            log.setAttackType("Invalid File");
            log.setStatus("Blocked");
            log.setTimestamp(LocalDateTime.now().toString());
            logRepository.save(log);

            return "WAF: Invalid file type 🚫";
        }

        return "File uploaded successfully ✅";
    }
}