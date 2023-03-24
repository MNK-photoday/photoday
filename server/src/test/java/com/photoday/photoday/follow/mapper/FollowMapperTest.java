package com.photoday.photoday.follow.mapper;

import com.photoday.photoday.follow.dto.FollowDto;
import com.photoday.photoday.follow.entity.Follow;
import com.photoday.photoday.user.entity.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
class FollowMapperTest {
    @Autowired
    FollowMapper followMapper;

    @Test
    void followUserListToResponseFollowUsers() {
        // given
        User follower = User.builder()
                .userId(1L)
                .email("follower@email.com")
                .name("follower")
                .build();
        User following = User.builder()
                .userId(2L)
                .email("following@email.com")
                .name("following")
                .build();
        Follow follow = new Follow();
        follow.setFollowId(1L);
        follow.setFollowing(following);
        follow.setFollower(follower);
        // when
        FollowDto.ResponseFollowUsers response = followMapper.followUserListToResponseFollowUsers(follower, following.getUserId());

        // then
        assertTrue(response.getUserFollowing().isEmpty());
        assertTrue(response.getUserFollower().get(0).isCheckFollow());
        assertEquals(0L, response.getUserFollowingCount());
        assertEquals(1L, response.getUserFollowerCount());
    }
}