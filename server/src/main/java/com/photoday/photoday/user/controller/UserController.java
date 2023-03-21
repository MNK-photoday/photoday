package com.photoday.photoday.user.controller;

import com.photoday.photoday.dto.SingleResponseDto;
import com.photoday.photoday.user.dto.UserDto;
import com.photoday.photoday.user.service.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Validated
public class UserController {
    private final UserServiceImpl userServiceImpl;

    @PostMapping
    public ResponseEntity<?> postUser(@Valid @RequestBody UserDto.Post userPostDto) {
        UserDto.Response createdUserDto = userServiceImpl.createUser(userPostDto);
        return ResponseEntity.created(URI.create("/api/users/" + createdUserDto.getUserId())).build();
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getUser(@PathVariable @Positive long userId) {
        UserDto.Response response = userServiceImpl.getUser(userId);
        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateUser(@RequestPart(required = false) @Valid UserDto.Update userUpdateDto,
                                        @RequestPart(value = "file", required = false) MultipartFile multipartFile) {
        UserDto.Response response = userServiceImpl.updateUser(userUpdateDto, multipartFile);
        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @PostMapping("/update/password")
    public ResponseEntity<?> updateUserPassword(@RequestBody @Valid UserDto.UpdateUserPassword updateUserPasswordDto) {
        UserDto.Response response = userServiceImpl.updateUserPassword(updateUserPasswordDto);
        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteUser() {
        userServiceImpl.deleteUser();
        return ResponseEntity.noContent().build();
    }
}
