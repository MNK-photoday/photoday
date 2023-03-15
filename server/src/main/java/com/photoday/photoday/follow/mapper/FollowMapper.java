package com.photoday.photoday.follow.mapper;

import com.photoday.photoday.follow.dto.FollowDto;
import com.photoday.photoday.user.entity.User;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface FollowMapper {
    default FollowDto.ResponseFollowUsers followUserListToResponseFollowUsers(Map<String, List<User>> followUsers) {
        List<User> following = followUsers.get("following");
        List<User> follower = followUsers.get("follower");

        List<FollowDto.ResponseFollowUserData> followingData = following.stream().map(user -> new FollowDto.ResponseFollowUserData(user.getUserId(), user.getName())).collect(Collectors.toList());
        List<FollowDto.ResponseFollowUserData> followerData = follower.stream().map(user -> new FollowDto.ResponseFollowUserData(user.getUserId(), user.getName())).collect(Collectors.toList());


        FollowDto.ResponseFollowUsers responseFollowUserDataList =
                new FollowDto.ResponseFollowUsers(followingData, followerData, following.size(), follower.size());

        return responseFollowUserDataList;
    }


}
