package com.photoday.photoday.follow.dto;

import lombok.*;

import java.util.List;

public class FollowDto {
    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    @Builder
    public static class ResponseFollowUsers {
        private List<ResponseFollowingUserData> userFollowing;
        private List<ResponseFollowerUserData> userFollower;
        private int userFollowingCount;
        private int userFollowerCount;
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    @Builder
    public static class ResponseFollowingUserData {
        private Long userId;
        private String name;
        private String userProfileImage;
        private boolean checkFollow;
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    @Builder
    public static class ResponseFollowerUserData {
        private Long userId;
        private String name;
        private String userProfileImage;
        private boolean checkFollow;
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Builder
    public static class Response {
        private List<FollowingUser> userFollowing;
        private List<FollowerUser> userFollower;
        private int userFollowingCount;
        private int userFollowerCount;

    }


    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Builder
    public static class FollowingUser {
        private Long userId;
        private String name;
        private String userProfileImage;
        private boolean checkFollow;
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Builder
    public static class FollowerUser {
        private Long userId;
        private String name;
        private String userProfileImage;
        private boolean checkFollow;
    }
}
