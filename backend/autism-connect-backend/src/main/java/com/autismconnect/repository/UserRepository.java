package com.autismconnect.repository;

import com.autismconnect.entity.User;
import com.autismconnect.entity.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    Optional<User> findByResetToken(String resetToken);
    java.util.List<User> findByRole(Role role);
}
