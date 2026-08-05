package com.autismconnect.service;

import com.autismconnect.entity.Activity;
import com.autismconnect.entity.enums.ActivityCategory;
import com.autismconnect.exception.ResourceNotFoundException;
import com.autismconnect.repository.ActivityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ActivityService {

    private final ActivityRepository activityRepository;

    public List<Activity> getAllActivities() {
        return activityRepository.findAll();
    }

    public Activity getActivityById(Long id) {
        return activityRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Activity not found with id: " + id));
    }

    public List<Activity> getByCategory(ActivityCategory category) {
        return activityRepository.findByCategory(category);
    }

    public List<Activity> search(String keyword) {
        return activityRepository.findByTitleContainingIgnoreCase(keyword);
    }

    public Activity createActivity(Activity activity) {
        return activityRepository.save(activity);
    }

    public Activity updateActivity(Long id, Activity updated) {
        Activity existing = getActivityById(id);
        existing.setTitle(updated.getTitle());
        existing.setDescription(updated.getDescription());
        existing.setImageUrl(updated.getImageUrl());
        existing.setDifficulty(updated.getDifficulty());
        existing.setDurationMinutes(updated.getDurationMinutes());
        existing.setAgeGroup(updated.getAgeGroup());
        existing.setMaterialsNeeded(updated.getMaterialsNeeded());
        existing.setBenefits(updated.getBenefits());
        existing.setInstructions(updated.getInstructions());
        existing.setYoutubeLink(updated.getYoutubeLink());
        existing.setInstagramLink(updated.getInstagramLink());
        existing.setCategory(updated.getCategory());
        return activityRepository.save(existing);
    }

    public void deleteActivity(Long id) {
        Activity activity = getActivityById(id);
        activityRepository.delete(activity);
    }
}
