package com.autismconnect.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/** Tracks per-child progress, favorites, and completion state for each activity. */
@Entity
@Table(name = "completed_activities", uniqueConstraints = @UniqueConstraint(columnNames = {"child_id", "activity_id"}))
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompletedActivity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "completed_id")
    private Long completedId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "child_id", nullable = false)
    private Child child;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "activity_id", nullable = false)
    private Activity activity;

    @Column(name = "is_favorite")
    private Boolean isFavorite = false;

    @Column(name = "is_completed")
    private Boolean isCompleted = false;

    @Column(name = "completion_date")
    private LocalDateTime completionDate;

    @Column(name = "progress_percent")
    private Integer progressPercent = 0;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
