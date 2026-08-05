package com.autismconnect.controller;

import com.autismconnect.dto.ApiResponse;
import com.autismconnect.entity.Activity;
import com.autismconnect.entity.enums.ActivityCategory;
import com.autismconnect.service.ActivityService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/activities")
@RequiredArgsConstructor
public class ActivityController {

    private final ActivityService activityService;

    @GetMapping
    public ResponseEntity<List<Activity>> getAll(
            @RequestParam(required = false) ActivityCategory category,
            @RequestParam(required = false) String search) {

        if (category != null) {
            return ResponseEntity.ok(activityService.getByCategory(category));
        }
        if (search != null && !search.isBlank()) {
            return ResponseEntity.ok(activityService.search(search));
        }
        return ResponseEntity.ok(activityService.getAllActivities());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Activity> getById(@PathVariable Long id) {
        return ResponseEntity.ok(activityService.getActivityById(id));
    }

    @PostMapping
    public ResponseEntity<Activity> create(@Valid @RequestBody Activity activity) {
        return ResponseEntity.status(HttpStatus.CREATED).body(activityService.createActivity(activity));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Activity> update(@PathVariable Long id, @Valid @RequestBody Activity activity) {
        return ResponseEntity.ok(activityService.updateActivity(id, activity));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> delete(@PathVariable Long id) {
        activityService.deleteActivity(id);
        return ResponseEntity.ok(new ApiResponse(true, "Activity deleted successfully"));
    }
}
