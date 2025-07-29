package com.ewandzdigital.talentvault.controller;

import com.ewandzdigital.talentvault.config.JwtUtil;
import com.ewandzdigital.talentvault.dto.ApiResponse;
import com.ewandzdigital.talentvault.model.User;
import com.ewandzdigital.talentvault.repository.UserRepository;
import com.nimbusds.jose.JOSEException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil; // 🔹 Inject JwtUtil

    // Signup API
    @PostMapping("/signup")
    public ResponseEntity<ApiResponse> signup(@RequestBody User request) {
        System.out.println("SIGNUP DATA =>");
        System.out.println("Name: " + request.getName());
        System.out.println("Email: " + request.getEmail());
        System.out.println("PasswordHash: " + request.getPasswordHash());
        System.out.println("Role: " + request.getRole());
        if (userRepo.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Signup failed: email already exists"));
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPasswordHash()));
        user.setRole(request.getRole());
        userRepo.save(user);

        return ResponseEntity.ok(new ApiResponse(true, "Signup successful", user));
    }

    // Login API
    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@RequestBody User request) throws JOSEException {
        Optional<User> optionalUser = userRepo.findByEmail(request.getEmail());

        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse(false, "Invalid Credentials"));
        }

        User user = optionalUser.get();
        if (!passwordEncoder.matches(request.getPasswordHash(), user.getPasswordHash())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse(false, "Invalid credentials"));
        }

        // 🔹 Generate JWT
        String token = jwtUtil.generateToken(user.getEmail(), user.getId());

        Map<String, Object> data = new HashMap<>();
        data.put("token", token);
        data.put("user", user);

        return ResponseEntity.ok(new ApiResponse(true, "Login successful", data));
    }
}
