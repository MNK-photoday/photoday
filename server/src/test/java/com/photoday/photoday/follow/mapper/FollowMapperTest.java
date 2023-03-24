package com.photoday.photoday.follow.mapper;

import com.photoday.photoday.follow.dto.FollowDto;
import com.photoday.photoday.follow.entity.Follow;
import com.photoday.photoday.user.entity.User;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class FollowMapperTest {
    FollowMapper followMapper = new FollowMapper();

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
        assertEquals(following.getUserId(), response.getUserFollower().get(0).getUserId());
        assertEquals(following.getName(), response.getUserFollower().get(0).getName());
        assertTrue(response.getUserFollowing().isEmpty());
        assertEquals(1L, response.getUserFollowerCount());
        assertEquals(0L, response.getUserFollowingCount());
    }
}