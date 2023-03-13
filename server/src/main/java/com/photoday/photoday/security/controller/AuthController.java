package com.photoday.photoday.security.controller;

import com.photoday.photoday.security.jwt.JwtProvider;
import com.photoday.photoday.security.redis.service.RedisService;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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
    private final JwtProvider jwtTokenizer;
    private final RedisService redisService;

    @GetMapping("/reissue")
    public ResponseEntity reissue(HttpServletRequest request, HttpServletResponse response) {
        String refreshToken = jwtTokenizer.getRefreshTokenToRequest(request);
        jwtTokenizer.verifyRefreshToken(refreshToken);
        jwtTokenizer.setNewAccessToken(refreshToken, response);
        String redisRefreshToken = redisService.getValues(jwtTokenizer.getSubject(refreshToken));
        if (Objects.isNull(redisRefreshToken)) {
            throw new JwtException("인증 정보 만료");
        }
        return ResponseEntity.ok().build();
    }

    @GetMapping("/logout")
    public ResponseEntity logout(HttpServletRequest request, HttpServletResponse response) {
        String refreshToken = jwtTokenizer.getRefreshTokenToRequest(request);
        redisService.deleteValues(jwtTokenizer.getSubject(refreshToken));
        Cookie cookie = new Cookie("Refresh", null);
        cookie.setMaxAge(0);
        response.addCookie(cookie);
        return ResponseEntity.ok().build();
    }
}
