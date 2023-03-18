package com.photoday.photoday.follow.mapper;

import com.photoday.photoday.follow.dto.FollowDto;
import com.photoday.photoday.user.entity.User;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Component
public class FollowMapper {
    public FollowDto.ResponseFollowUsers followUserListToResponseFollowUsers(Map<String, List<User>> followUsers, Long loginUserId) {
        List<User> following = followUsers.get("following");
        List<User> follower = followUsers.get("follower");
        List<FollowDto.ResponseFollowingUserData> followingData = following.stream().map(user -> new FollowDto.ResponseFollowingUserData(user.getUserId(), user.getName(), user.getProfileImageUrl())).collect(Collectors.toList());
        List<FollowDto.ResponseFollowerUserData> followerData = follower.stream()
                .map(user -> new FollowDto.ResponseFollowerUserData(user.getUserId(), user.getName(), user.getProfileImageUrl(),loginUserId != null && following.stream().anyMatch(fw -> Objects.equals(fw.getUserId(), user.getUserId()))))
                .collect(Collectors.toList());

        FollowDto.ResponseFollowUsers responseFollowUserDataList =
                new FollowDto.ResponseFollowUsers(followingData, followerData, following.size(), follower.size());

        return responseFollowUserDataList;
    }
}
