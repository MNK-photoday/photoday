package com.photoday.photoday.security.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.photoday.photoday.security.dto.LoginDto;
import com.photoday.photoday.security.jwt.JwtProvider;
import com.photoday.photoday.security.redis.service.RedisService;
import com.photoday.photoday.security.utils.CookieUtil;
import com.photoday.photoday.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final JwtProvider jwtProvider;
    private final RedisService redisService;

    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {
        ObjectMapper objectMapper = new ObjectMapper();
        LoginDto loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class);

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword());

        return authenticationManager.authenticate(authenticationToken);
    }

    protected  void successfulAuthentication(HttpServletRequest request,
                                             HttpServletResponse response,
                                             FilterChain chain,
                                             Authentication authResult) throws ServletException, IOException {
        User user = (User) authResult.getPrincipal();

        String accessToken = jwtProvider.delegateAccessToken(user);
        String refreshToken = jwtProvider.delegateRefreshToken(user);

        redisService.setValues(user.getEmail(), refreshToken);

        Cookie refreshTokenCookie = CookieUtil.createCookie("Refresh", refreshToken);

        response.setHeader("Authorization", "Bearer " + accessToken);
        response.addCookie(refreshTokenCookie);
        response.setHeader("userId", user.getUserId().toString());


        this.getSuccessHandler().onAuthenticationSuccess(request, response, authResult);
    }

}
