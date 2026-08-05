package com.autismconnect.entity;

import com.autismconnect.entity.enums.AutismLevel;
import com.autismconnect.entity.enums.Gender;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/** Stores each child's profile - the core record parents manage day to day. */
@Entity
@Table(name = "children")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Child {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "child_id")
    private Long childId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id", nullable = false)
    private Parent parent;

    @Column(nullable = false, length = 120)
    private String name;

    @Column(nullable = false)
    private Integer age;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private Gender gender;

    @Enumerated(EnumType.STRING)
    @Column(name = "autism_level", nullable = false, length = 10)
    private AutismLevel autismLevel;

    private String interests;

    @Column(name = "communication_skills")
    private String communicationSkills;

    @Column(name = "behavior_notes", columnDefinition = "TEXT")
    private String behaviorNotes;

    @Column(name = "therapist_notes", columnDefinition = "TEXT")
    private String therapistNotes;

    @Column(name = "medical_notes", columnDefinition = "TEXT")
    private String medicalNotes;

    @Column(name = "favorite_activities")
    private String favoriteActivities;

    @Column(name = "profile_image")
    private String profileImage;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
