package com.photoday.photoday.security.utils;

import org.springframework.http.ResponseCookie;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.time.Duration;

public class CookieUtil {
//    static public Cookie createCookie(String cookieName, String value) {
//        Cookie cookie = new Cookie(cookieName, value);
//        cookie.setDomain("photoday.site");
//        cookie.setHttpOnly(true);
//        cookie.setMaxAge((int) (1000L * 3600 * 24 * 30));
//        cookie.setPath("/");
//        cookie.setSecure(true);
//
//        return cookie;
//    }

    static public void createCookie(HttpServletResponse response, String refreshToken) {
        ResponseCookie cookie = ResponseCookie.from("Refresh", refreshToken)
//                .domain(".photoday.site")
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
