package com.photoday.photoday.follow.mapper;

import com.photoday.photoday.follow.dto.FollowDto;
import com.photoday.photoday.user.entity.User;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface FollowMapper {
    default FollowDto.ResponseFollowUsers followUserListToResponseFollowUsers(List<List<User>> followUsers) {
        List<List<FollowDto.ResponseFollowUserData>> followUserDataList = followUsers.stream()
                        .map(users -> users.stream()
                            .map(userData -> new FollowDto.ResponseFollowUserData(userData.getUserId(), userData.getName()))
                            .collect(Collectors.toList()))
                        .collect(Collectors.toList());

        FollowDto.ResponseFollowUsers responseFollowUserDataList =
                new FollowDto.ResponseFollowUsers(followUserDataList.get(0), followUserDataList.get(1), followUserDataList.get(0).size(), followUserDataList.get(1).size());

        return responseFollowUserDataList;
    }
}
