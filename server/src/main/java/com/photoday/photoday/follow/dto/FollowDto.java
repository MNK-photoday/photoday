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
}
