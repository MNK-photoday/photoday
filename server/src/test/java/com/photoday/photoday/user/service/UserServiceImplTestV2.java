package com.photoday.photoday.user.service;

import com.photoday.photoday.image.service.S3Service;
import com.photoday.photoday.security.service.AuthUserService;
import com.photoday.photoday.security.utils.CustomAuthorityUtils;
import com.photoday.photoday.user.mapper.UserMapper;
import com.photoday.photoday.user.repository.UserRepository;
import com.photoday.photoday.user.service.impl.UserServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit.jupiter.SpringExtension;

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
    void createUserTest() {
    }
}
