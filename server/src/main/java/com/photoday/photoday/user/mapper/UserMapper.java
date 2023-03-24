package com.photoday.photoday.user.mapper;

import com.photoday.photoday.user.dto.UserDto;
import com.photoday.photoday.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
@RequiredArgsConstructor
public class UserMapper {
    public User userPostToUser(UserDto.Post userPostDto) {
        if (userPostDto == null) {
            return null;
        }

        User user = new User();

        user.setEmail(userPostDto.getEmail());
        user.setPassword(userPostDto.getPassword());

        return user;
    }

    public User userUpdateToUser(UserDto.Update userUpdateDto) {
        User user = new User();
        String description = userUpdateDto != null ? userUpdateDto.getDescription() : null;
        user.setDescription(description);
        return user;
    }

    public UserDto.Response userToUserResponse(User targetUser, Long userId, boolean checkAdmin) { //TODO 팔로우 확인
        boolean checkFollow = userId != null && targetUser.getFollower().stream().anyMatch(fw -> Objects.equals(fw.getFollowing().getUserId(), userId));

        UserDto.Response response = new UserDto.Response();

        response.setUserId(targetUser.getUserId());
        response.setName(targetUser.getName());
        response.setProfileImageUrl(targetUser.getProfileImageUrl());
        response.setDescription(targetUser.getDescription());
        response.setCheckFollow(checkFollow);
        response.setLikeCount(targetUser.getLikes() != null ? targetUser.getLikes().size() : 0);
        response.setReportCount(targetUser.getReports() != null ? targetUser.getReports().size() : 0);
        response.setFollowerCount(targetUser.getFollower() != null ? targetUser.getFollower().size() : 0);
        response.setFollowingCount(targetUser.getFollowing() != null ? targetUser.getFollowing().size() : 0);
        response.setMyPage(userId != null && userId.equals(targetUser.getUserId()));
        response.setCheckAdmin(checkAdmin);

        response.setMyPage(userId != null && userId.equals(targetUser.getUserId()));

        return response;
    }
}
