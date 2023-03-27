package com.photoday.photoday.user.service;

import com.photoday.photoday.excpetion.CustomException;
import com.photoday.photoday.image.service.S3Service;
import com.photoday.photoday.security.service.AuthUserService;
import com.photoday.photoday.security.utils.CustomAuthorityUtils;
import com.photoday.photoday.user.dto.UserDto;
import com.photoday.photoday.user.entity.User;
import com.photoday.photoday.user.mapper.UserMapper;
import com.photoday.photoday.user.repository.UserRepository;
import com.photoday.photoday.user.service.impl.UserServiceImpl;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;

@ExtendWith(SpringExtension.class)
public class UserServiceImplTestV2 {
    @InjectMocks
    UserServiceImpl userService;
    @Spy
    PasswordEncoder passwordEncoder;
    @Spy
    UserMapper userMapper;
    @Spy
    CustomAuthorityUtils customAuthorityUtils;
    @Mock
    UserRepository userRepository;
    @Mock
    AuthUserService authUserService;
    @Mock
    S3Service s3Service;

    private Long userId = 0L;

    @Test
    @DisplayName("createUser: 정상 입력")
    void createUserTest() {
        // given
        String email = "test@test.com";
        String password = "123456a!";
        User user = getUser(email);

        UserDto.Post post = new UserDto.Post(email, password);

        given(userRepository.findByEmail(anyString())).willReturn(Optional.empty());
        given(userRepository.save(any(User.class))).willReturn(user);

        // when
        UserDto.Response response = userService.createUser(post);

        // then
        assertEquals(user.getUserId(), response.getUserId());
        assertEquals(user.getName(), response.getName());
        assertEquals(user.getDescription(), response.getDescription());
    }

    @Test
    @DisplayName("createUser: 이미 존재")
    void createUserAlreadyExistsTest() {
        // given
        String email = "test@test.com";
        String password = "123456a!";
        User user = getUser(email);

        UserDto.Post post = new UserDto.Post(email, password);

        given(userRepository.findByEmail(anyString())).willReturn(Optional.of(user));

        // when & then
        CustomException exception = assertThrows(CustomException.class, () -> userService.createUser(post));
        assertEquals(HttpStatus.CONFLICT, exception.getExceptionCode().getHttpStatus());
        assertEquals("이미 존재하는 이메일입니다.", exception.getExceptionCode().getMessage());
    }

    @Test
    @DisplayName("registerUserOAuth2: 정상 입력")
    void registerUserOAuth2Test() {
        // given
        User user = getUser("test@test.com");

        given(userRepository.findByEmail(anyString())).willReturn(Optional.empty());
        given(userRepository.save(any(User.class))).willReturn(user);

        // when
        User response = userService.registerUserOAuth2(user);

        // then
        assertEquals(user.getUserId(), response.getUserId());
    }

    @Test
    @DisplayName("registerUserOAuth2: 중복 입력")
    void registerUserOAuth2LoginTest() {
        // given
        User user = getUser("test@test.com");

        given(userRepository.findByEmail(anyString())).willReturn(Optional.of(user));

        // when
        User response = userService.registerUserOAuth2(user);

        // then
        assertEquals(user.getUserId(), response.getUserId());
    }


    private User getUser(String email) {
        return User.builder()
                .userId(getId())
                .email(email)
                .name("test")
                .roles(List.of("USER"))
                .build();
    }

    private Long getId() {
        userId += 1;
        return userId;
    }

}
