package com.autismconnect.repository;

import com.autismconnect.entity.Activity;
import com.autismconnect.entity.enums.ActivityCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ActivityRepository extends JpaRepository<Activity, Long> {
    List<Activity> findByCategory(ActivityCategory category);
    List<Activity> findByTitleContainingIgnoreCase(String keyword);
}
