package com.autismconnect.dto;

import com.autismconnect.entity.enums.AutismLevel;
import com.autismconnect.entity.enums.Gender;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ChildRequest {

    @NotBlank(message = "Child name is required")
    private String name;

    @NotNull(message = "Age is required")
    private Integer age;

    @NotNull(message = "Gender is required")
    private Gender gender;

    @NotNull(message = "Autism level is required")
    private AutismLevel autismLevel;

    private String interests;
    private String communicationSkills;
    private String behaviorNotes;
    private String therapistNotes;
    private String medicalNotes;
    private String favoriteActivities;
    private String profileImage;
}
