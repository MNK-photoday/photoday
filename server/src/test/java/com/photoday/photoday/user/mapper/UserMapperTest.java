package com.photoday.photoday.user.mapper;

import com.photoday.photoday.follow.entity.Follow;
import com.photoday.photoday.user.dto.UserDto;
import com.photoday.photoday.user.entity.User;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;

class UserMapperTest {
    UserMapper userMapper = new UserMapper();

    @Test
    @DisplayName("userPostToUser: 정상 작동")
    void userPostToUserTest() {
        // given
        String email = "test@email.com";
        String password = "123456A!";
        UserDto.Post postDto = new UserDto.Post(email, password);

        // when
        User user = userMapper.userPostToUser(postDto);

        // then
        assertNotNull(user);
        assertEquals(user.getEmail(), email);
        assertEquals(user.getPassword(), password);
    }

    @Test
    @DisplayName("userPatchToUser: 정상 작동")
    void userPatchToUserTest() {
        // given
        String description = "짱구입니다.";
        UserDto.Update updateDto = new UserDto.Update(description);

        // when
        User user = userMapper.userUpdateToUser(updateDto);

        // then
        assertNotNull(user);
        assertEquals(user.getDescription(), description);
    }

    @Test
    @DisplayName("userToUserResponse: 정상 작동")
    void userToUserResponseTest() {
        // given
        User currentUser = User.builder()
                .userId(1L)
                .follower(new ArrayList<>())
                .following(new ArrayList<>())
                .build();
        User responseUser = User.builder()
                .userId(2L)
                .email("user2@email.com")
                .name("2번 유저")
                .profileImageUrl("http://profileImageUrl2.jpg")
                .description("2번 유저 입니다.")
                .status(User.UserStatus.USER_ACTIVE)
                .banTime(LocalDateTime.now())
                .follower(new ArrayList<>())
                .following(new ArrayList<>())
                .build();
        Follow follow = new Follow();
        follow.setFollowId(1L);
        follow.setFollower(responseUser);
        follow.setFollowing(currentUser);

        // when
        UserDto.Response response = userMapper.userToUserResponse(responseUser, currentUser.getUserId());

        // then
        assertEquals(responseUser.getUserId(), response.getUserId());
        assertEquals(responseUser.getName(), response.getName());
        assertEquals(responseUser.getProfileImageUrl(), response.getProfileImageUrl());
        assertEquals(responseUser.getDescription(), response.getDescription());
        assertTrue(response.isCheckFollow());
        assertEquals(0L, response.getLikeCount());
        assertEquals(0L, response.getReportCount());
        assertEquals(0L, response.getReportCount());
        assertEquals(1L, response.getFollowerCount());
        assertEquals(0L, response.getFollowingCount());

    }
}