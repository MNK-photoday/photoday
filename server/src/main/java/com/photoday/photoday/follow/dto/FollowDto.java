package com.photoday.photoday.follow.dto;

import com.photoday.photoday.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

public class FollowDto {
    @AllArgsConstructor
    @Getter
    @Setter
    public static class ResponseFollowUsers {
        private List<ResponseFollowUserData> userFollowing;
        private List<ResponseFollowUserData> userFollower;
        private int userFollowingCount;
        private int userFollowerCount;
    }

    @AllArgsConstructor
    @Getter
    @Setter
    public static class ResponseFollowUserData {
        private Long userId;
        private String name;
    }
}
