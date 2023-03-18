package com.photoday.photoday.follow.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

public class FollowDto {
    @AllArgsConstructor
    @Getter
    @Setter
    public static class ResponseFollowUsers {
        private List<ResponseFollowingUserData> userFollowing;
        private List<ResponseFollowerUserData> userFollower;
        private int userFollowingCount;
        private int userFollowerCount;
    }

    @AllArgsConstructor
    @Getter
    @Setter
    public static class ResponseFollowingUserData {
        private Long userId;
        private String name;
        private String userProfileImage;
    }

    @AllArgsConstructor
    @Getter
    @Setter
    public static class ResponseFollowerUserData {
        private Long userId;
        private String name;
        private String userProfileImage;
        private boolean checkFollow;
    }
}
