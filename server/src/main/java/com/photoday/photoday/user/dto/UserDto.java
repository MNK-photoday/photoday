package com.photoday.photoday.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Max;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

public class UserDto {

    @Getter
    public static class Post {
        @Pattern(regexp = "[0-9a-zA-Z]+(.[_a-z0-9-]+)*@(?:\\w+\\.)+\\w+$", message = "유효한 이메일 주소가 아닙니다.")
        private String email;

        @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*\\W).{8,20}$", message = "비밀번호는 영문과 특수문자, 숫자를 포함하여 8자 이상이고 20자 이하여야 합니다.")
        private String password;
    }

    @Getter
    public static class Patch {
        @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*\\W).{8,20}$", message = "비밀번호는 영문과 특수문자, 숫자를 포함하여 8자 이상이고 20자 이하여야 합니다.")
        private String password;

        @Max(200)
        private String aboutMe;
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
