package com.photoday.photoday.user.mapper;

import com.photoday.photoday.user.dto.UserDto;
import com.photoday.photoday.user.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User userPostToUser(UserDto.Post userPostDto);
    User userPatchToUser(UserDto.Patch userPatchDto);
    @Mapping(target = "likeCount", expression = "java(user.getLikes() != null ? user.getLikes().size() : 0)")
    @Mapping(target = "reportCount", expression = "java(user.getReports() != null ? user.getReports().size() : 0)")
    UserDto.Response userToUserResponse(User user);
}
