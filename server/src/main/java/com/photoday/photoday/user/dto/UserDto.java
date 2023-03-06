package com.photoday.photoday.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

public class UserDto {

    @Getter
    public static class Post {
        private String email;
        private String password;
    }

    @Getter
    public static class Patch {
        private String password;
        private String aboutMe;
        private String profileImageUrl;
    }

    @AllArgsConstructor
    @Getter
    @Setter
    public static class Response {
        private long userId;
        private String name;
        private String profileImageUrl;
        private String aboutMe;
        private int likeCount;
        private int reportCount;
        private int followerCount;
        private int followingCount;
    }
}
