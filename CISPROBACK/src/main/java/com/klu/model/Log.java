package com.klu.model;

import jakarta.persistence.*;

@Entity
public class Log {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String action;
    private String attackType;
    private String status;
    private String timestamp;

    // Getters & Setters

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getAction() { return action; }

    public void setAction(String action) { this.action = action; }

    public String getAttackType() { return attackType; }

    public void setAttackType(String attackType) { this.attackType = attackType; }

    public String getStatus() { return status; }

    public void setStatus(String status) { this.status = status; }

    public String getTimestamp() { return timestamp; }

    public void setTimestamp(String timestamp) { this.timestamp = timestamp; }
}