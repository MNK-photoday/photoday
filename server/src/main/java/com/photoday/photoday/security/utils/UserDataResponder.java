package com.photoday.photoday.security.utils;

import com.google.gson.Gson;
import com.photoday.photoday.user.entity.User;
import com.photoday.photoday.user.service.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RequiredArgsConstructor
@Component
public class UserDataResponder {
    private final UserServiceImpl userServiceImpl;

    public void sendUserDataResponse(Long userId, HttpServletResponse response) throws IOException {
        Gson gson = new Gson();
        User verifiedUser = userServiceImpl.findVerifiedUser(userId);
        UserDataResponse userData = new UserDataResponse(verifiedUser.getUserId(), verifiedUser.getProfileImageUrl(), verifiedUser.getName());

        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.getWriter().write(gson.toJson(userData, UserDataResponse.class));
    }
}
