package com.photoday.photoday.image.dto;

import com.photoday.photoday.user.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;

public class ImageDto {
    @Getter
    public static class Post {
        @Size(min =1, max = 5)
        List<String> tags;
    }

    @Getter
    public static class Patch {
        @Size(min =1, max = 5)
        List<String> tags;
    }

    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {
        private Long imageId;
        private UserDto.Response owner;
        private String imageUrl;
        private boolean like;
        private int likeCount;
        private boolean report;
        private int reportCount;
        private boolean bookmark;
        private int viewCount;
        private List<String> tags;
        private LocalDateTime createdAt;
    }
}
