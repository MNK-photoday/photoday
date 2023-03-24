package com.photoday.photoday.follow.mapper;

import com.photoday.photoday.follow.dto.FollowDto;
import com.photoday.photoday.follow.entity.Follow;
import com.photoday.photoday.user.entity.User;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class FollowMapper {
    public FollowDto.ResponseFollowUsers followUserListToResponseFollowUsers(User user, Long loginUserId) {
        List<FollowDto.ResponseFollowingUserData> followingUserList = getFollowingUserList(user, loginUserId);
        List<FollowDto.ResponseFollowerUserData> followerUserList = getFollowerUserList(user, loginUserId);
        return FollowDto.ResponseFollowUsers.builder()
                .userFollowing(followingUserList)
                .userFollower(followerUserList)
                .userFollowingCount(followingUserList.size())
                .userFollowerCount(followerUserList.size())
                .build();
    }

    private List<FollowDto.ResponseFollowingUserData> getFollowingUserList(User user, Long loginUserId) {
        return user.getFollowing().stream()
                .map(Follow::getFollower)
                .map(follower -> getFollowingUser(follower, loginUserId))
                .collect(Collectors.toList());
    }

    private FollowDto.ResponseFollowingUserData getFollowingUser(User user, Long loginUserId) {
        return FollowDto.ResponseFollowingUserData.builder()
                .userId(user.getUserId())
                .name(user.getName())
                .userProfileImage(user.getProfileImageUrl())
                .checkFollow(isCheckFollow(user, loginUserId))
                .build();
    }

    private List<FollowDto.ResponseFollowerUserData> getFollowerUserList(User user, Long loginUserId) {
        return user.getFollower().stream()
                .map(Follow::getFollowing)
                .map(following -> getFollowerUser(following, loginUserId))
                .collect(Collectors.toList());
    }

    private FollowDto.ResponseFollowerUserData getFollowerUser(User user, Long loginUserId) {
        return FollowDto.ResponseFollowerUserData.builder()
                .userId(user.getUserId())
                .name(user.getName())
                .userProfileImage(user.getProfileImageUrl())
                .checkFollow(isCheckFollow(user, loginUserId))
                .build();
    }

    private boolean isCheckFollow(User user, Long loginUserId) {
        return loginUserId != null &&
                user.getFollower().stream()
                        .anyMatch(follow -> follow.getFollowing().getUserId().equals(loginUserId));
    }
}
