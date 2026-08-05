package com.autismconnect.service;

import com.autismconnect.dto.*;
import com.autismconnect.entity.Parent;
import com.autismconnect.entity.User;
import com.autismconnect.entity.enums.Role;
import com.autismconnect.exception.DuplicateResourceException;
import com.autismconnect.exception.InvalidCredentialsException;
import com.autismconnect.exception.ResourceNotFoundException;
import com.autismconnect.repository.ParentRepository;
import com.autismconnect.repository.UserRepository;
import com.autismconnect.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

/** Handles registration, login, and password-reset flows. */
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final ParentRepository parentRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("An account with this email already exists");
        }

        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setPhone(request.getPhone());
        user.setRole(request.getRole());

        User saved = userRepository.save(user);

        // Parents get an accompanying extension row created automatically.
        if (saved.getRole() == Role.PARENT) {
            Parent parent = new Parent();
            parent.setUser(saved);
            parentRepository.save(parent);
        }

        String token = jwtUtil.generateToken(saved.getEmail(), saved.getUserId(), saved.getRole().name());
        return new AuthResponse(token, saved.getUserId(), saved.getFullName(), saved.getEmail(), saved.getRole());
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new InvalidCredentialsException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new InvalidCredentialsException("Invalid email or password");
        }

        if (!Boolean.TRUE.equals(user.getIsActive())) {
            throw new InvalidCredentialsException("This account has been disabled");
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getUserId(), user.getRole().name());
        return new AuthResponse(token, user.getUserId(), user.getFullName(), user.getEmail(), user.getRole());
    }

    public ApiResponse forgotPassword(ForgotPasswordRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("No account found with this email"));

        String token = UUID.randomUUID().toString();
        user.setResetToken(token);
        user.setResetTokenExpiry(LocalDateTime.now().plusHours(1));
        userRepository.save(user);

        // In production this token is emailed to the user via an SMTP/email service.
        return new ApiResponse(true, "Password reset instructions have been sent to " + user.getEmail());
    }

    public ApiResponse resetPassword(ResetPasswordRequest request) {
        User user = userRepository.findByResetToken(request.getToken())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid or expired reset token"));

        if (user.getResetTokenExpiry() == null || user.getResetTokenExpiry().isBefore(LocalDateTime.now())) {
            throw new InvalidCredentialsException("Reset token has expired, please request a new one");
        }

        user.setPasswordHash(passwordEncoder.encode(request.getNewPassword()));
        user.setResetToken(null);
        user.setResetTokenExpiry(null);
        userRepository.save(user);

        return new ApiResponse(true, "Password has been reset successfully");
    }
}
