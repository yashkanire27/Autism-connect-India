package com.autismconnect.repository;

import com.autismconnect.entity.Parent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ParentRepository extends JpaRepository<Parent, Long> {
    Optional<Parent> findByUser_UserId(Long userId);
}
