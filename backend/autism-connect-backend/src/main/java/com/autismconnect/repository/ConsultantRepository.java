package com.autismconnect.repository;

import com.autismconnect.entity.Consultant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ConsultantRepository extends JpaRepository<Consultant, Long> {
    Optional<Consultant> findByUser_UserId(Long userId);
}
