package com.photoday.photoday.security.handler;

import com.google.gson.Gson;
import com.photoday.photoday.excpetion.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class UserAuthenticationFailureHandler implements AuthenticationFailureHandler {
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException {
        log.error("인증 실패: {}", exception.getMessage());

        sendErrorResponse(response, exception);
    }

    private void sendErrorResponse(HttpServletResponse response, AuthenticationException exception) throws IOException {
        Gson gson = new Gson();
        ErrorResponse errorResponse;
        if (exception instanceof DisabledException) {
            errorResponse = ErrorResponse.of(HttpStatus.UNAUTHORIZED, exception.getMessage());
        } else if (exception instanceof UsernameNotFoundException) {
            errorResponse = ErrorResponse.of(HttpStatus.UNAUTHORIZED, exception.getMessage());
        } else {
            errorResponse = ErrorResponse.of(HttpStatus.UNAUTHORIZED, exception.getMessage());
        }
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("UTF-8");
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.getWriter().write(gson.toJson(errorResponse, ErrorResponse.class));
    }
}
