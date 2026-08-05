package com.autismconnect.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "consultants")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Consultant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "consultant_id")
    private Long consultantId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    private String qualification;

    @Column(name = "experience_years")
    private Integer experienceYears;

    private String specialization;

    @Column(name = "languages_spoken")
    private String languagesSpoken;

    @Column(columnDefinition = "TEXT")
    private String bio;

    private BigDecimal rating;

    @Column(name = "available_days")
    private String availableDays;

    @Column(name = "available_time_start")
    private LocalTime availableTimeStart;

    @Column(name = "available_time_end")
    private LocalTime availableTimeEnd;

    @Column(name = "consultation_fee")
    private BigDecimal consultationFee;

    @Column(name = "photo_url")
    private String photoUrl;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
