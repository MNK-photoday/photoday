package com.photoday.photoday.follow.controller;

import com.photoday.photoday.dto.SingleResponseDto;
import com.photoday.photoday.follow.dto.FollowDto;
import com.photoday.photoday.follow.service.FollowServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/api/follows")
@RequiredArgsConstructor
@Validated
public class FollowController {
    private final FollowServiceImpl followServiceImpl;

    @GetMapping
    public ResponseEntity<?> getFollowUsers() {
        FollowDto.ResponseFollowUsers response = followServiceImpl.findFollowUser();
        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @PatchMapping("/{followingId}")
    public ResponseEntity<?> followingUser(@PathVariable @Positive long followingId) {
        FollowDto.ResponseFollowUsers response = followServiceImpl.registerFollowUser(followingId);
        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }
}
