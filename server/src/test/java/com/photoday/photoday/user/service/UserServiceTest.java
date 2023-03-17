package com.photoday.photoday.user.service;

import com.photoday.photoday.excpetion.CustomException;
import com.photoday.photoday.image.service.S3Service;
import com.photoday.photoday.security.service.AuthUserService;
import com.photoday.photoday.user.dto.UserDto;
import com.photoday.photoday.user.entity.User;
import com.photoday.photoday.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;

import static com.photoday.photoday.helper.snippets.RestDocsSnippets.getMockMultipartFile;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

@SpringBootTest
class UserServiceTest {

    @Autowired
    UserService userService;
    @Autowired
    UserRepository userRepository;
    @MockBean
    AuthUserService authUserService;
    @MockBean
    S3Service s3Service;

    @BeforeEach
    void dropRepository() {
        userRepository.deleteAll();
    }

    @Test
    @DisplayName("createUser: 정상 입력")
    void createUserTest() {
        // given
        UserDto.Post post = new UserDto.Post("test@email.com", "123456a!");
        String defaultProfileImageUrl = "https://ifh.cc/g/zPrPfv.png";
        given(authUserService.checkLogin()).willReturn(null);

        // when
        UserDto.Response userDtoResponse = userService.createUser(post);

        //then
        assertNotNull(userDtoResponse.getUserId());
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
        UserDto.Post post = new UserDto.Post("default@email.com", "123456a!");
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
        user.setEmail("oauth@email.com");
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
        user.setEmail("oauth@email.com");
        user.setPassword("@265sx*vS^&ax&#DE#");
        User registeredUser = userService.registerUserOAuth2(user);
        // when
        User loginUser = userService.registerUserOAuth2(user);

        // then
        assertEquals(registeredUser.getUserId(), loginUser.getUserId());
    }

    @Test
    @DisplayName("getUser: 정상 입력")
    void getUserTest() {
        // given
        User user = User.builder()
                .email("default@mail.com")
                .name("default")
                .password("123456a!")
                .build();
        User loginUser = userRepository.save(user);

        UserDto.Post post = new UserDto.Post("test@email.com", "123456a!");
        UserDto.Response ExpectedResponse = userService.createUser(post);
        given(authUserService.getLoginUserId()).willReturn(loginUser.getUserId());

        // when
        UserDto.Response actualResponse = userService.getUser(ExpectedResponse.getUserId());

        // then
        assertEquals(ExpectedResponse.getUserId(), actualResponse.getUserId());
        assertEquals(ExpectedResponse.getName(), actualResponse.getName());
        assertEquals(ExpectedResponse.getProfileImageUrl(), actualResponse.getProfileImageUrl());
        assertEquals(ExpectedResponse.getDescription(), actualResponse.getDescription());
        assertEquals(ExpectedResponse.getLikeCount(), actualResponse.getLikeCount());
        assertEquals(ExpectedResponse.getReportCount(), actualResponse.getReportCount());
        assertEquals(ExpectedResponse.getFollowerCount(), actualResponse.getFollowerCount());
        assertEquals(ExpectedResponse.getFollowingCount(), actualResponse.getFollowingCount());
        assertEquals(ExpectedResponse.isCheckFollow(), actualResponse.isCheckFollow());
    }

    @Test
    @DisplayName("updateUser: description, profileImageUrl")
    void updateUserTest() throws IOException, NoSuchAlgorithmException {
        // given
        User user = User.builder()
                .email("default@mail.com")
                .name("default")
                .password("123456a!")
                .build();
        User loginUser = userRepository.save(user);
        given(authUserService.getLoginUserId()).willReturn(loginUser.getUserId());

        UserDto.Update userUpdateDto = new UserDto.Update("edited!");
        MultipartFile multipartFile = getMockMultipartFile("multipartFile", "multipartFile");
        given(s3Service.saveImage(any(MultipartFile.class))).willReturn("http://changedProfileImageUrl.jpg");

        // when
        UserDto.Response response = userService.updateUser(userUpdateDto, multipartFile);

        // then
        assertEquals("edited!", response.getDescription());
        assertEquals("http://changedProfileImageUrl.jpg", response.getProfileImageUrl());
    }

    @Test
    @DisplayName("updateUser: description만 변경")
    void updateUserDescriptionOnlyTest() {
        // given
        User user = User.builder()
                .email("default@mail.com")
                .name("default")
                .password("123456a!")
                .build();
        User loginUser = userRepository.save(user);
        given(authUserService.getLoginUserId()).willReturn(loginUser.getUserId());

        UserDto.Update userUpdateDto = new UserDto.Update("edited!");

        // when
        UserDto.Response response = userService.updateUser(userUpdateDto, null);

        // then
        assertEquals("edited!", response.getDescription());
        assertEquals(loginUser.getProfileImageUrl(), response.getProfileImageUrl());
    }

    @Test
    @DisplayName("updateUser: profileImage만 변경")
    void updateUserProfileImageUrlOnlyTest() throws IOException, NoSuchAlgorithmException {
        // given
        User user = User.builder()
                .email("default@mail.com")
                .name("default")
                .password("123456a!")
                .build();
        User loginUser = userRepository.save(user);
        given(authUserService.getLoginUserId()).willReturn(loginUser.getUserId());

        MultipartFile multipartFile = getMockMultipartFile("multipartFile", "multipartFile");
        given(s3Service.saveImage(any(MultipartFile.class))).willReturn("http://changedProfileImageUrl.jpg");

        // when
        UserDto.Response response = userService.updateUser(null, multipartFile);

        // then
        assertEquals("http://changedProfileImageUrl.jpg", response.getProfileImageUrl());
    }

    @Test
    @DisplayName("updateUserPassword: 비밀번호 불일치")
    void updateUserPasswordTest() {
        // given
        UserDto.UpdateUserPassword userDto = new UserDto.UpdateUserPassword("123456a@", "123456a#");

        // when & then
        CustomException exception = assertThrows(CustomException.class, () -> userService.updateUserPassword(userDto));
        assertEquals(HttpStatus.UNAUTHORIZED, exception.getExceptionCode().getHttpStatus());
        assertEquals("비밀번호가 일치하지 않습니다.", exception.getExceptionCode().getMessage());
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