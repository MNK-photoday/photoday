package com.photoday.photoday.security.handler;

import com.photoday.photoday.excpetion.CustomException;
import com.photoday.photoday.security.jwt.JwtProvider;
import com.photoday.photoday.security.utils.CookieUtil;
import com.photoday.photoday.user.entity.User;
import com.photoday.photoday.user.service.UserService;
import com.photoday.photoday.util.TempPassword;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;

@RequiredArgsConstructor
@Slf4j
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtProvider jwtProvider;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final TempPassword tempPassword;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        var oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = String.valueOf(oAuth2User.getAttributes().get("email"));
        User user = saveUser(email);

        checkUserStatus(user);

        redirect(request, response, user);
    }

    private User saveUser(String email) {
        User user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(tempPassword.getTempPassword()));
        return userService.registerUserOAuth2(user);
    }

    private void redirect(HttpServletRequest request, HttpServletResponse response, User user)
            throws IOException {
        String accessToken = jwtProvider.delegateAccessToken(user);
        String refreshToken = jwtProvider.delegateRefreshToken(user);

        Cookie refreshTokenCookie = CookieUtil.createCookie("Refresh", refreshToken);
        response.addCookie(refreshTokenCookie);
        response.addHeader("Authorization", accessToken); //TODO 파라미터 전달로 바꾸기

        String uri = createURI(user).toString();
        log.info("OAuth 인증 성공");
        getRedirectStrategy().sendRedirect(request, response, uri);
    }

    private URI createURI(User user) {
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("userId", user.getUserId().toString());
        queryParams.add("userEmail", user.getEmail());
        queryParams.add("userProfileImage", user.getProfileImageUrl());

        return UriComponentsBuilder
                .newInstance()
                .scheme("http")
                .host("localhost") //TODO 프론트 배포 후에 바꾸기
                .port(3000)
                .queryParams(queryParams)
                .build()
                .toUri();
    }

    private void checkUserStatus(User user) {
        try {
            userService.checkBanTime(user);
            if (user.getStatus().equals(User.UserStatus.USER_BANED)) {
                throw new DisabledException("유저가 밴 상태입니다." + user.getBanTime() + " 이후에 서비스 이용이 가능합니다.");
            }
        } catch (CustomException e) {
            throw new UsernameNotFoundException("회원 정보를 찾을 수 없습니다.");
        }
    }
}
