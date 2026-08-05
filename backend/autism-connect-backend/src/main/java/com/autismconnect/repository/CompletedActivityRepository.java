package com.autismconnect.repository;

import com.autismconnect.entity.CompletedActivity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CompletedActivityRepository extends JpaRepository<CompletedActivity, Long> {
    List<CompletedActivity> findByChild_ChildId(Long childId);
    Optional<CompletedActivity> findByChild_ChildIdAndActivity_ActivityId(Long childId, Long activityId);
    List<CompletedActivity> findByChild_ChildIdAndIsFavoriteTrue(Long childId);
    List<CompletedActivity> findByChild_ChildIdAndIsCompletedTrue(Long childId);
}
