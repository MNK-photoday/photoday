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
        private List<ResponseFollowUserData> userFollowing;
        private List<ResponseFollowUserData> userFollower;
        private int userFollowingCount;
        private int userFollowerCount;
    }

    @AllArgsConstructor
    @Getter
    @Setter
    public static class ResponseFollowUserData {
        //TODO 피그마 보니까, 유저 사진도 들어가던데 고려해보기, 그리고 피그마 상으로는 팔로우랑 팔로워 목록 따로 조회하는 듯?, 팔로우 true, false 체크여부
        private Long userId;
        private String name;
    }
}
