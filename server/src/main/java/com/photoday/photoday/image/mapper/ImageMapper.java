package com.photoday.photoday.image.mapper;

import com.photoday.photoday.image.dto.ImageDto;
import com.photoday.photoday.image.entity.Image;
import com.photoday.photoday.user.dto.UserDto;
import com.photoday.photoday.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class ImageMapper {
    private final UserService userService;

    public ImageDto.Response imageToResponse(Image image) {
        return ImageDto.Response.builder()
                .imageId(image.getImageId())
                .owner(getOwner(image))
                .imageUrl(image.getImageUrl())
                .like(hasLiked(image))
                .likeCount(image.getLikeList().size())
                .report(hasReported(image))
                .reportCount(image.getReportList().size())
                .bookmark(hasBookmarked(image))
                .viewCount(image.getViewCount())
                .tags(getTags(image))
                .createdAt(image.getCreatedAt())
                .build();
    }

    private List<String> getTags(Image image) {
        return image.getImageTagList().stream()
                .map(imageTag -> imageTag.getTag().getName())
                .collect(Collectors.toList());

    }

    private boolean hasBookmarked(Image image) {
        //TODO 비로그인 회원이면 false 때려야함,, 지금은 예외 터짐. 리팩토링 필요. 디비 세 번 뒤짐.
        Long userId = userService.getLoginUserId();
        return image.getBookmarkList().stream()
                .anyMatch(bookmark -> bookmark.getUser().getUserId() == userId);
    }

    private boolean hasReported(Image image) {
        //TODO 비로그인 회원이면 false 때려야함,, 지금은 예외 터짐.
        Long userId = userService.getLoginUserId();
        return image.getReportList().stream()
                .anyMatch(report -> report.getUser().getUserId() == userId);
    }

    private boolean hasLiked(Image image) {
        //TODO 비로그인 회원이면 false 때려야함,, 지금은 예외 터짐.
        Long userId = userService.getLoginUserId();
        return image.getLikeList().stream()
                .anyMatch(like -> like.getUser().getUserId() == userId);
    }

    private UserDto.Response getOwner(Image image) {
        return new UserDto.Response(image.getUser());
    }
}
