package com.photoday.photoday.image.mapper;

import com.photoday.photoday.image.dto.ImageDto;
import com.photoday.photoday.image.entity.Image;
import com.photoday.photoday.user.dto.UserDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface ImageMapper {

    default ImageDto.Response imageToResponse(Image image) {
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

    default List<String> getTags(Image image) {
        return image.getImageTagList().stream()
                .map(imageTag -> imageTag.getTag().getName())
                .collect(Collectors.toList());

    }

    default boolean hasBookmarked(Image image) {
        // TODO: UserId는 Authentication에서 꺼내서 비교할 것
        return image.getBookmarkList().stream()
                .anyMatch(bookmark -> bookmark.getUser().getUserId() == 1L);
    }

    default boolean hasReported(Image image) {
        // TODO: UserId는 Authentication에서 꺼내서 비교할 것
        return image.getReportList().stream()
                .anyMatch(report -> report.getUser().getUserId() == 1L);
    }

    default boolean hasLiked(Image image) {
        // TODO: UserId는 Authentication에서 꺼내서 비교할 것
        return image.getLikeList().stream()
                .anyMatch(like -> like.getUser().getUserId() == 1L);
    }

    default UserDto.Response getOwner(Image image) {
        return new UserDto.Response(image.getUser());
    }
}
