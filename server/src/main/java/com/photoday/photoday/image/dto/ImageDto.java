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
    public static class Patch {
        @Size(min = 1, max = 20)
        List<String> tags;
    }

    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    public static class Response {
        private Long imageId;
        private UserDto.Response owner;
        private String imageUrl;
        private boolean like;
        private int likeCount;
        private boolean report;
        private int reportCount; //필드 이름을 reportedCount로 했어야 덜 헷갈렸을 듯.
        private boolean bookmark;
        private int viewCount;
        private List<String> tags;
        private LocalDateTime createdAt;
        private boolean myImage;
        private boolean checkAdmin;
    }

    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    public static class PageResponse {
        private Long imageId;
        private String thumbnailUrl;
        private boolean like;
        private boolean bookmark;
    }
}
