package com.photoday.photoday.user.utils;

import com.google.gson.Gson;
import com.photoday.photoday.excpetion.ErrorResponse;
import com.photoday.photoday.user.entity.User;
import com.photoday.photoday.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RequiredArgsConstructor
@Component
public class UserDataResponder {
    private final UserService userService;

    public void sendUserDataResponse(Long userId, HttpServletResponse response) throws IOException {
        Gson gson = new Gson();
        User verifiedUser = userService.findVerifiedUser(userId);
        UserDataResponse userData = new UserDataResponse(verifiedUser.getUserId(), verifiedUser.getProfileImageUrl(), verifiedUser.getName());

        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.getWriter().write(gson.toJson(userData, UserDataResponse.class));
    }
}
