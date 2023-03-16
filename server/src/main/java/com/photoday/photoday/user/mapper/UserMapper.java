package com.photoday.photoday.user.mapper;

import com.photoday.photoday.follow.entity.Follow;
import com.photoday.photoday.follow.repository.FollowRepository;
import com.photoday.photoday.security.service.AuthUserService;
import com.photoday.photoday.user.dto.UserDto;
import com.photoday.photoday.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Objects;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class UserMapper {
    private final AuthUserService authUserService;

    public User userPostToUser(UserDto.Post userPostDto) {
        if (userPostDto == null) {
            return null;
        }

        User user = new User();

        user.setEmail(userPostDto.getEmail());
        user.setPassword(userPostDto.getPassword());

        return user;
    }

    public User userPatchToUser(UserDto.Update userPatchDto) {
        if (userPatchDto == null) {
            return null;
        }

        User user = new User();

        user.setDescription(userPatchDto.getDescription());

        return user;
    }

    public UserDto.Response userToUserResponse(User targetUser) {
        if (targetUser == null) {
            return null;
        }

        Long userId = authUserService.checkLogin();

        boolean checkFollow = userId != null && targetUser.getFollowing().stream().anyMatch(fw -> Objects.equals(fw.getFollower().getUserId(), userId));

        UserDto.Response response = new UserDto.Response();

        response.setUserId(targetUser.getUserId());
        response.setName(targetUser.getName());
        response.setProfileImageUrl(targetUser.getProfileImageUrl());
        response.setDescription(targetUser.getDescription());
        response.setCheckFollow(checkFollow);
        response.setLikeCount(targetUser.getLikes() != null ? targetUser.getLikes().size() : 0);
        response.setReportCount(targetUser.getReports() != null ? targetUser.getReports().size() : 0);

        return response;
    }
}
