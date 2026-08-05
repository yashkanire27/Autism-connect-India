package com.autismconnect.controller;

import com.autismconnect.dto.ApiResponse;
import com.autismconnect.dto.ChildRequest;
import com.autismconnect.entity.Child;
import com.autismconnect.entity.User;
import com.autismconnect.service.ChildService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/** Parent-facing CRUD endpoints for managing child profiles. */
@RestController
@RequestMapping("/api/children")
@RequiredArgsConstructor
public class ChildController {

    private final ChildService childService;

    @PostMapping
    public ResponseEntity<Child> createChild(@AuthenticationPrincipal User user,
                                              @Valid @RequestBody ChildRequest request) {
        Child created = childService.createChild(user.getUserId(), request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/my-children")
    public ResponseEntity<List<Child>> getMyChildren(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(childService.getChildrenForParent(user.getUserId()));
    }

    @GetMapping("/{childId}")
    public ResponseEntity<Child> getChild(@PathVariable Long childId) {
        return ResponseEntity.ok(childService.getChildById(childId));
    }

    @PutMapping("/{childId}")
    public ResponseEntity<Child> updateChild(@PathVariable Long childId,
                                              @Valid @RequestBody ChildRequest request) {
        return ResponseEntity.ok(childService.updateChild(childId, request));
    }

    @DeleteMapping("/{childId}")
    public ResponseEntity<ApiResponse> deleteChild(@PathVariable Long childId) {
        childService.deleteChild(childId);
        return ResponseEntity.ok(new ApiResponse(true, "Child profile deleted successfully"));
    }
}
