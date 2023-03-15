package com.photoday.photoday.user.controller;

import com.photoday.photoday.dto.SingleResponseDto;
import com.photoday.photoday.user.dto.UserDto;
import com.photoday.photoday.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.net.URI;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Validated
public class UserController {
    private final UserService userService;

    @PostMapping
    public ResponseEntity<?> postUser(@Valid @RequestBody UserDto.Post userPostDto) {
        UserDto.Response createdUserDto = userService.createUser(userPostDto);
        return ResponseEntity.created(URI.create("/api/users/" + createdUserDto.getUserId())).build();
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getUser(@PathVariable long userId) {
        UserDto.Response response = userService.getUser(userId);
        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateUser(@RequestPart(required = false) UserDto.Update userUpdateDto,
                                        @RequestPart(value = "file", required = false) MultipartFile multipartFile) throws IOException {
        UserDto.Response response = userService.updateUser(userUpdateDto, multipartFile);
        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteUser() {
        userService.deleteUser();
        return ResponseEntity.noContent().build();
    }
}
