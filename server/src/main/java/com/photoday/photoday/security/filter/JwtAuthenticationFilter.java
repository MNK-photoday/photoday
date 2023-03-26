package com.photoday.photoday.security.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.photoday.photoday.excpetion.CustomException;
import com.photoday.photoday.security.dto.LoginDto;
import com.photoday.photoday.security.jwt.JwtProvider;
import com.photoday.photoday.security.redis.service.RedisService;
import com.photoday.photoday.security.utils.CookieUtil;
import com.photoday.photoday.security.utils.UserDataResponder;
import com.photoday.photoday.user.entity.User;
import com.photoday.photoday.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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
    private final UserService userService;
    private final JwtProvider jwtProvider;
    private final RedisService redisService;
    private final UserDataResponder userDataResponder;

    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        ObjectMapper objectMapper = new ObjectMapper();
        LoginDto loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class);

        checkUserStatus(loginDto.getEmail());

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword());

        return authenticationManager.authenticate(authenticationToken);
    }

    protected void successfulAuthentication(HttpServletRequest request,
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
        userDataResponder.sendUserDataResponse(user.getUserId(), response);

        this.getSuccessHandler().onAuthenticationSuccess(request, response, authResult);
    }

    private void checkUserStatus(String email) {
        try {
            User user = userService.findUserByEmail(email);
            userService.checkBanTime(user);
            if (user.getStatus().equals(User.UserStatus.USER_BANED)) {
                throw new DisabledException("유저가 밴 상태입니다." + user.getBanTime() + " 이후에 서비스 이용이 가능합니다.");
            }
        } catch (CustomException e) {
            throw new UsernameNotFoundException("회원 정보를 찾을 수 없습니다.");
        }
    }
}