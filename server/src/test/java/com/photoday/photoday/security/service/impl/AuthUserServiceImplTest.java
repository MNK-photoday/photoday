package com.photoday.photoday.security.service.impl;

import com.photoday.photoday.user.entity.User;
import com.photoday.photoday.user.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;

@ExtendWith(SpringExtension.class)
class AuthUserServiceImplTest {
    @Mock
    UserRepository userRepository;
    @InjectMocks
    AuthUserServiceImpl authUserService;

    @Test // 삭제 예정
    void getLoginUserId() {
    }

    @Test  // 삭제 예정
    void checkLogin() {
    }

    @Test
    @WithMockUser(username = "test@email.com")
    @DisplayName("getLoginUser: 유저를 찾을 수 없을 때")
    void getLoginUserOf() {
        User user = User.builder().userId(1L).name("test").email("test@email.com").build();
        given(userRepository.findByEmail(anyString())).willReturn(Optional.of(user));
        authUserService.getLoginUser();
    }

    @Test
    @WithMockUser(username = "test@email.com")
    @DisplayName("getLoginUser: 유저를 찾을 수 없을 때")
    void getLoginUserEmpty() {
        given(userRepository.findByEmail(anyString())).willReturn(Optional.empty());
        authUserService.getLoginUser();
    }

    @Test
    void setNewPassword() {
    }
}