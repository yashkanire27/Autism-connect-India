package com.autismconnect.service;

import com.autismconnect.dto.ChildRequest;
import com.autismconnect.entity.Child;
import com.autismconnect.entity.Parent;
import com.autismconnect.exception.ResourceNotFoundException;
import com.autismconnect.repository.ChildRepository;
import com.autismconnect.repository.ParentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/** CRUD operations for child profiles, scoped to the owning parent. */
@Service
@RequiredArgsConstructor
public class ChildService {

    private final ChildRepository childRepository;
    private final ParentRepository parentRepository;

    public Child createChild(Long parentUserId, ChildRequest request) {
        Parent parent = parentRepository.findByUser_UserId(parentUserId)
                .orElseThrow(() -> new ResourceNotFoundException("Parent profile not found for this account"));

        Child child = new Child();
        mapRequestToEntity(request, child);
        child.setParent(parent);

        return childRepository.save(child);
    }

    public List<Child> getChildrenForParent(Long parentUserId) {
        Parent parent = parentRepository.findByUser_UserId(parentUserId)
                .orElseThrow(() -> new ResourceNotFoundException("Parent profile not found for this account"));
        return childRepository.findByParent_ParentId(parent.getParentId());
    }

    public Child getChildById(Long childId) {
        return childRepository.findById(childId)
                .orElseThrow(() -> new ResourceNotFoundException("Child not found with id: " + childId));
    }

    public Child updateChild(Long childId, ChildRequest request) {
        Child child = getChildById(childId);
        mapRequestToEntity(request, child);
        return childRepository.save(child);
    }

    public void deleteChild(Long childId) {
        Child child = getChildById(childId);
        childRepository.delete(child);
    }

    private void mapRequestToEntity(ChildRequest request, Child child) {
        child.setName(request.getName());
        child.setAge(request.getAge());
        child.setGender(request.getGender());
        child.setAutismLevel(request.getAutismLevel());
        child.setInterests(request.getInterests());
        child.setCommunicationSkills(request.getCommunicationSkills());
        child.setBehaviorNotes(request.getBehaviorNotes());
        child.setTherapistNotes(request.getTherapistNotes());
        child.setMedicalNotes(request.getMedicalNotes());
        child.setFavoriteActivities(request.getFavoriteActivities());
        child.setProfileImage(request.getProfileImage());
    }
}
