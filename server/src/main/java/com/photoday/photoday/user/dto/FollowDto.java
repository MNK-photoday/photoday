package com.photoday.photoday.user.dto;

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
        private List<User> followers;
        private List<User> following;
        private int followerCount;
        private int followingCount;
    }
}
