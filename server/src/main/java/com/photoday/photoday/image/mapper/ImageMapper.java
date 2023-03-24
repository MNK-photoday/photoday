package com.photoday.photoday.image.mapper;

import com.photoday.photoday.image.dto.ImageDto;
import com.photoday.photoday.image.entity.Image;
import com.photoday.photoday.security.service.AuthUserService;
import com.photoday.photoday.user.dto.UserDto;
import com.photoday.photoday.user.mapper.UserMapper;
import com.photoday.photoday.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class ImageMapper {
    private final UserMapper userMapper;
    private final AuthUserService authUserService;
    private final UserService userService;

    public ImageDto.PageResponse imageToPageResponse(Image image){
        return ImageDto.PageResponse.builder()
                .imageId(image.getImageId())
                .imageUrl(image.getImageUrl())
                .like(hasLiked(image))
                .bookmark(hasBookmarked(image))
                .build();
    }

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
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        if (email.isEmpty()) {
            return false;
        }
        return image.getBookmarkList().stream()
                .anyMatch(bookmark -> bookmark.getUser().getEmail().equals(email));
    }

    private boolean hasReported(Image image) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        if (email.isEmpty()) {
            return false;
        }
        return image.getReportList().stream()
                .anyMatch(report -> report.getUser().getEmail().equals(email));
    }

    private boolean hasLiked(Image image) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        if (email.isEmpty()) {
            return false;
        }
        return image.getLikeList().stream()
                .anyMatch(like -> like.getUser().getEmail().equals(email));
    }

    private UserDto.Response getOwner(Image image) {
        Long loginUserId = authUserService.checkLogin();
        boolean checkAdmin = userService.checkAdmin(loginUserId);
        return userMapper.userToUserResponse(image.getUser(), loginUserId, checkAdmin);
    }
}
