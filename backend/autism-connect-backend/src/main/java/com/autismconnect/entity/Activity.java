package com.autismconnect.entity;

import com.autismconnect.entity.enums.ActivityCategory;
import com.autismconnect.entity.enums.Difficulty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "activities")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "activity_id")
    private Long activityId;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "image_url")
    private String imageUrl;

    @Enumerated(EnumType.STRING)
    private Difficulty difficulty = Difficulty.EASY;

    @Column(name = "duration_minutes")
    private Integer durationMinutes;

    @Column(name = "age_group")
    private String ageGroup;

    @Column(name = "materials_needed")
    private String materialsNeeded;

    @Column(columnDefinition = "TEXT")
    private String benefits;

    @Column(columnDefinition = "TEXT")
    private String instructions;

    @Column(name = "youtube_link")
    private String youtubeLink;

    @Column(name = "instagram_link")
    private String instagramLink;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private ActivityCategory category;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
