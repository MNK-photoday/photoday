package com.photoday.photoday.user.service;

import com.photoday.photoday.user.dto.UserDto;
import com.photoday.photoday.user.entity.User;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {
    UserDto.Response createUser(UserDto.Post userPostDto);

    User registerUserOAuth2(User user);

    UserDto.Response getUser(long userId);
    UserDto.Response updateUser(UserDto.Update userUpdateDto, MultipartFile multipartFile);

    UserDto.Response updateUserPassword(UserDto.UpdateUserPassword updateUserPasswordDto);

    void deleteUser(Long userId);

    User findVerifiedUser(Long userId);

    void checkUserReportCount(User user);

    User findUserByEmail(String email);

    UserDto.Response deleteProfileImage();

    void checkBanTime(User user);

    boolean checkAdmin(Long loginUserId);
}
