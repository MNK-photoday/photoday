package com.photoday.photoday.user.mapper;

import com.photoday.photoday.user.dto.UserDto;
import com.photoday.photoday.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

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

    public UserDto.Response userToUserResponse(User targetUser, User loginUser) {
        UserDto.Response response = new UserDto.Response();

        response.setUserId(targetUser.getUserId());
        response.setName(targetUser.getName());
        response.setProfileImageUrl(targetUser.getProfileImageUrl());
        response.setDescription(targetUser.getDescription());
        response.setCheckFollow(checkFollow(targetUser, loginUser));
        response.setLikeCount(targetUser.getLikes() != null ? targetUser.getLikes().size() : 0);
        response.setReportCount(targetUser.getReports() != null ? targetUser.getReports().size() : 0);
        response.setFollowerCount(targetUser.getFollower() != null ? targetUser.getFollower().size() : 0);
        response.setFollowingCount(targetUser.getFollowing() != null ? targetUser.getFollowing().size() : 0);
        response.setCheckAdmin(checkAdmin(loginUser));
        response.setMyPage(myPage(targetUser, loginUser));

        return response;
    }

    private boolean checkFollow(User targetUser, User loginUser) {
        if (loginUser == null) return false;

        Long userId = loginUser.getUserId();
        return userId != null && targetUser.getFollower().stream()
                .anyMatch(fw -> fw.getFollowing().getUserId().equals(userId));
    }

    private boolean checkAdmin(User loginUser) {
        if (loginUser == null) return false;

        List<String> roles = loginUser.getRoles();
        return roles.contains("ADMIN");
    }

    private boolean myPage(User targetUser, User loginUser) {
        if (loginUser == null) return false;

        Long userId = loginUser.getUserId();
        return userId != null && userId.equals(targetUser.getUserId());
    }
}
