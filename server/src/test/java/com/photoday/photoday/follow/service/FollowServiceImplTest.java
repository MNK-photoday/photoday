package com.photoday.photoday.follow.service;

import com.photoday.photoday.follow.dto.FollowDto;
import com.photoday.photoday.follow.entity.Follow;
import com.photoday.photoday.follow.repository.FollowRepository;
import com.photoday.photoday.follow.service.impl.FollowServiceImpl;
import com.photoday.photoday.security.service.AuthUserService;
import com.photoday.photoday.user.entity.User;
import com.photoday.photoday.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Objects;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;

@SpringBootTest
class FollowServiceImplTest {
    @Autowired
    FollowServiceImpl followService;
    @Autowired
    UserRepository userRepository;
    @Autowired
    FollowRepository followRepository;
    @MockBean
    AuthUserService authUserService;

    @BeforeEach
    void clear() {
        userRepository.deleteAll();
        followRepository.deleteAll();
    }

    @Test
    void findFollowUser() {
        // given
        User following = getUser("following@email.com", "following");
        User follower = getUser("follower@email.com", "follower");

        Follow follow = new Follow();
        follow.setFollowing(following);
        follow.setFollower(follower);
        followRepository.save(follow);

        given(authUserService.getLoginUserId()).willReturn(null);

        // when
        FollowDto.ResponseFollowUsers followingResponse = followService.findFollowUser(following.getUserId());
        FollowDto.ResponseFollowUsers followerResponse = followService.findFollowUser(follower.getUserId());

        // then
        assertEquals(1, followingResponse.getUserFollowingCount());
        assertEquals(0, followingResponse.getUserFollowerCount());
        assertEquals(0, followerResponse.getUserFollowingCount());
        assertEquals(1, followerResponse.getUserFollowerCount());
        assertFalse(followerResponse.getUserFollower().get(0).isCheckFollow());
        assertTrue(followingResponse.getUserFollowing().stream().anyMatch(followerUser -> Objects.equals(followerUser.getUserId(), follower.getUserId())));
    }

    @Test
    void registerFollowUser() {
        User following = getUser("following@email.com", "following");
        User follower = getUser("follower@email.com", "follower");

        given(authUserService.getLoginUserId()).willReturn(following.getUserId());

        FollowDto.ResponseFollowUsers response = followService.registerFollowUser(follower.getUserId());

        assertEquals(following.getUserId(), response.getUserFollower().get(0).getUserId());
        assertEquals(following.getName(), response.getUserFollower().get(0).getName());
        assertTrue(response.getUserFollowing().isEmpty());
        assertEquals(1L, response.getUserFollowerCount());
        assertEquals(0L, response.getUserFollowingCount());
    }

    private User getUser(String email, String owner) {
        User user = User.builder()
                .email(email)
                .name(owner)
                .password("123456a!")
                .build();
        return userRepository.save(user);
    }
}