package com.klu.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.klu.model.Log;

public interface LogRepository extends JpaRepository<Log, Long> {
}