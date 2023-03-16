package com.photoday.photoday.user.service;

import com.photoday.photoday.excpetion.CustomException;
import com.photoday.photoday.security.service.AuthUserService;
import com.photoday.photoday.user.dto.UserDto;
import com.photoday.photoday.user.entity.User;
import com.photoday.photoday.user.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;

@SpringBootTest
class UserServiceTest {

    @Autowired
    UserService userService;
    @Autowired
    UserRepository userRepository;
    @MockBean
    AuthUserService authUserService;
    @Test
    @DisplayName("createUser: 정상 입력")
    void createUserTest() {
        // given
        UserDto.Post post = new UserDto.Post("test@email.com", "123456a!");
        String defaultProfileImageUrl = "https://cdn.discordapp.com/attachments/1082610363712950272/1082610364371435540/userImage.png";
        given(authUserService.checkLogin()).willReturn(null);

        // when
        UserDto.Response userDtoResponse = userService.createUser(post);

        //then
        assertEquals(1L, userDtoResponse.getUserId());
        assertEquals("test", userDtoResponse.getName());
        assertEquals(defaultProfileImageUrl, userDtoResponse.getProfileImageUrl());
        assertEquals("안녕하세요!", userDtoResponse.getDescription());
        assertEquals(0, userDtoResponse.getLikeCount());
        assertEquals(0, userDtoResponse.getReportCount());
        assertEquals(0, userDtoResponse.getFollowerCount());
        assertEquals(0, userDtoResponse.getFollowingCount());
        assertFalse(userDtoResponse.isCheckFollow());
    }

    @Test
    @DisplayName("createUser: 중복 이메일 입력")
    void createUserExistedEmail() {
        // given
        UserDto.Post post = new UserDto.Post("test@email.com", "123456a!");
        given(authUserService.checkLogin()).willReturn(null);
        userService.createUser(post);

        // when
        CustomException exception = assertThrows(CustomException.class, () -> userService.createUser(post));
        assertEquals(exception.getExceptionCode().getHttpStatus(), HttpStatus.CONFLICT);
        assertEquals(exception.getExceptionCode().getMessage(), "이미 존재하는 이메일입니다.");
    }

    @Test
    @DisplayName("registerUserOAuth2: OAuth 회원가입")
    void registerUserOAuth2Test() {
        // given
        User user = new User();
        user.setEmail("test@email.com");
        user.setPassword("@265sx*vS^&ax&#DE#");

        // when
        User resultUser = userService.registerUserOAuth2(user);

        // then
        assertNotNull(resultUser.getUserId());
    }

    @Test
    @DisplayName("registerUserOAuth2: OAuth 로그인")
    void registerUserOAuth2LoginTest() {
        // given
        User user = new User();
        user.setEmail("test@email.com");
        user.setPassword("@265sx*vS^&ax&#DE#");
        User registeredUser = userService.registerUserOAuth2(user);
        // when
        User loginUser = userService.registerUserOAuth2(user);

        // then
        assertEquals(registeredUser.getUserId(), loginUser.getUserId());
    }

    @Test
    void getUserTest() {
    }

    @Test
    void updateUserTest() {
    }

    @Test
    void updateUserPasswordTest() {
    }

    @Test
    void deleteUserTest() {
    }

    @Test
    void findVerifiedUserTest() {
    }

    @Test
    void checkUserReportCountTest() {
    }

    @Test
    void findUserByEmailTest() {
    }

    @Test
    void checkBanTimeTest() {
    }

    @Test
    void resetTodayUserReportCountTest() {
    }
}