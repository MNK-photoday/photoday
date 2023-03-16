package com.photoday.photoday.security.handler;

import com.photoday.photoday.security.jwt.JwtProvider;
import com.photoday.photoday.security.utils.CookieUtil;
import com.photoday.photoday.user.entity.User;
import com.photoday.photoday.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
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
import java.util.Random;

@RequiredArgsConstructor
@Slf4j
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtProvider jwtProvider;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        var oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = String.valueOf(oAuth2User.getAttributes().get("email"));
        User user = saveUser(email);
        redirect(request, response, user); //TODO 밴처리 후 에러 처리
    }

    private User saveUser(String email) {
        User user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(generateRandomString(20)));
        return userService.registerUserOAuth2(user);
    }

    private String generateRandomString(int length) { //TODO 이메일 발송 로직에 있긴한디
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
        Random random = new Random();
        char[] text = new char[length];
        for (int i = 0; i < length; i++) {
            text[i] = characters.charAt(random.nextInt(characters.length()));
        }
        return new String(text);
    }

    private void redirect(HttpServletRequest request, HttpServletResponse response, User user)
            throws IOException {
        String accessToken = jwtProvider.delegateAccessToken(user);
        String refreshToken = jwtProvider.delegateRefreshToken(user);

        Cookie refreshTokenCookie = CookieUtil.createCookie("Refresh", refreshToken);
        response.addCookie(refreshTokenCookie);

        String uri = createURI(accessToken).toString();
        log.info("OAuth 인증 성공");
        getRedirectStrategy().sendRedirect(request, response, uri);
    }

    private URI createURI(String accessToken) {
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("access_token", accessToken);
//        queryParams.add("refresh_token", refreshToken);

        return UriComponentsBuilder
                .newInstance()
                .scheme("http")
                .host("localhost")
                .port(3000)
                .queryParams(queryParams)
                .build()
                .toUri();
    }
}
