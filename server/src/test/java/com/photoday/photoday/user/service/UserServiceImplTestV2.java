package com.photoday.photoday.user.service;

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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
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

    @Test
    @DisplayName("createUser: 정상 입력")
    void createUserTest() {
        // given
        String email = "test@test.com";
        String password = "123456a!";
        User user = User.builder()
                .userId(1L)
                .email(email)
                .name("test")
                .roles(List.of("USER"))
                .build();

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
}
