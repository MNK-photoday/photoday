package com.photoday.photoday.follow.controller;

import com.photoday.photoday.dto.SingleResponseDto;
import com.photoday.photoday.follow.dto.FollowDto;
import com.photoday.photoday.follow.service.FollowService;
import com.photoday.photoday.user.entity.User;
import com.photoday.photoday.follow.mapper.FollowMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/follows")
@RequiredArgsConstructor
@Validated
public class FollowController {
    private final FollowService followService;
    private final FollowMapper followMapper;

    @GetMapping
    public ResponseEntity getFollowUsers() {
        Map<String, List<User>> follow = followService.findFollowUser();
        FollowDto.ResponseFollowUsers response = followMapper.followUserListToResponseFollowUsers(follow);
        return new ResponseEntity(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @PatchMapping("/{followingId}")
    public ResponseEntity followingUser(@PathVariable long followingId) {
        Map<String, List<User>> follow = followService.registerFollowUser(followingId);
        FollowDto.ResponseFollowUsers response = followMapper.followUserListToResponseFollowUsers(follow);
        return new ResponseEntity(new SingleResponseDto<>(response), HttpStatus.OK);
    }
}
