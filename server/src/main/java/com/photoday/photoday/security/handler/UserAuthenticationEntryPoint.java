package com.photoday.photoday.security.handler;

import com.google.gson.Gson;
import com.photoday.photoday.excpetion.CustomException;
import com.photoday.photoday.excpetion.ErrorResponse;
import com.photoday.photoday.security.utils.ErrorResponder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
public class UserAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {
        Exception exception = (Exception) request.getAttribute("exception");
        if (exception instanceof DisabledException) {
            Gson gson = new Gson();
            ErrorResponse errorResponse;
            errorResponse = ErrorResponse.of(HttpStatus.UNAUTHORIZED, exception.getMessage());
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            response.setCharacterEncoding("UTF-8");
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.getWriter().write(gson.toJson(errorResponse, ErrorResponse.class));
        } else {
            ErrorResponder.sendErrorResponse(response, HttpStatus.UNAUTHORIZED);
        }

        logExceptionMessage(authException, exception);
    }

    private void logExceptionMessage(AuthenticationException authenticationException, Exception exception) {
        String message = exception != null ? exception.getMessage() : authenticationException.getMessage();
        log.warn("인증 오류: {}", message);
    }
}
