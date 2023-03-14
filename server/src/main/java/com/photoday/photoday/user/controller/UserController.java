package com.photoday.photoday.user.controller;

import com.photoday.photoday.dto.SingleResponseDto;
import com.photoday.photoday.user.dto.UserDto;
import com.photoday.photoday.user.entity.User;
import com.photoday.photoday.follow.mapper.FollowMapper;
import com.photoday.photoday.user.mapper.UserMapper;
import com.photoday.photoday.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Validated
public class UserController {
    private final UserMapper userMapper;
    private final UserService userService;

    @PostMapping
    public ResponseEntity postUser(@RequestBody UserDto.Post userPostDto) {
        User user = userMapper.userPostToUser(userPostDto);
        userService.createUser(user);
        return ResponseEntity.ok().build(); //TODO created로 수정 + URI
    }

    @GetMapping("/{userId}") //TODO API 업데이트
    public ResponseEntity getUser(@PathVariable long userId) {
        User user = userService.getUser(userId);
        UserDto.Response response = userMapper.userToUserResponse(user);
        return new ResponseEntity(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @PatchMapping
    public ResponseEntity patchUser(@RequestPart UserDto.Patch userPatchDto,
                                    @RequestPart(value = "file") MultipartFile multipartFile) throws IOException {
        User user = userMapper.userPatchToUser(userPatchDto);
        User updateUser = userService.updateUser(user, multipartFile);
        UserDto.Response response = userMapper.userToUserResponse(updateUser);
        return new ResponseEntity(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity deleteUser() {
        userService.deleteUser();
        return ResponseEntity.noContent().build();
    }
}
