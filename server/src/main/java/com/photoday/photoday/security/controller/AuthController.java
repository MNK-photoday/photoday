package com.photoday.photoday.security.controller;

import com.photoday.photoday.security.jwt.JwtProvider;
import com.photoday.photoday.security.redis.service.RedisService;
import com.photoday.photoday.security.service.AuthUserServiceImpl;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Objects;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final JwtProvider jwtProvider;
    private final RedisService redisService;
    private final AuthUserServiceImpl authUserServiceImpl;

    @GetMapping("/reissue")
    public ResponseEntity<?> reissue(HttpServletRequest request, HttpServletResponse response) {
        String refreshToken = jwtProvider.getRefreshTokenFromRequest(request);

        String redisRefreshToken = redisService.getValues(jwtProvider.getSubject(refreshToken));
        if (Objects.isNull(redisRefreshToken)) {
            throw new JwtException("로그아웃 상태");
        }

        jwtProvider.verifyRefreshToken(refreshToken);
        jwtProvider.setNewAccessToken(refreshToken, response);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        String refreshToken = jwtProvider.getRefreshTokenFromRequest(request);
        redisService.deleteValues(jwtProvider.getSubject(refreshToken));
        Cookie cookie = new Cookie("Refresh", null);
        cookie.setMaxAge(0);
        response.addCookie(cookie);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/password")
    public ResponseEntity<?> setNewPassword(String email){
        authUserServiceImpl.setNewPassword(email);
        return ResponseEntity.ok().build();
    }
}
