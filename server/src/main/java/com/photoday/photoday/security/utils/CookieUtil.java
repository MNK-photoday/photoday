package com.photoday.photoday.security.utils;

import org.springframework.http.ResponseCookie;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.time.Duration;

public class CookieUtil {
    static public void createCookie(HttpServletResponse response, String refreshToken) {
        ResponseCookie cookie = ResponseCookie.from("Refresh", refreshToken)
                .sameSite("None")
                .maxAge(Duration.ofDays(30))
                .httpOnly(true)
                .secure(true)
                .path("/")
                .build();

        response.addHeader("Set-Cookie", cookie.toString());
    }

    static public Cookie getTokenCookie(HttpServletRequest request, String cookieName) {
        Cookie[] cookies = request.getCookies();

        if(cookies != null) {
            for(Cookie cookie : cookies) {
                if(cookie.getName().equals(cookieName)) {
                    return cookie;
                }
            }
        }
        return null;
    }
}
