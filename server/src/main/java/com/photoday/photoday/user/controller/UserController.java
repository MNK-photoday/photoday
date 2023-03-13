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

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Validated
public class UserController {
    private final UserMapper userMapper;
    private final FollowMapper followMapper;
    private final UserService userService;

    @PostMapping
    public ResponseEntity postUser(@RequestBody UserDto.Post userPostDto) {
        User user = userMapper.userPostToUser(userPostDto);
        User createdUser = userService.createUser(user);

        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity getUser() {
        User user = userService.getUser();
        UserDto.Response response = userMapper.userToUserResponse(user);

        return new ResponseEntity(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @PatchMapping
    public ResponseEntity patchUser(@RequestPart UserDto.Patch userPatchDto,
                                    @RequestPart(value = "file") MultipartFile multipartFile) {
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
