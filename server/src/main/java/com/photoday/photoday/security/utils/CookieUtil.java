package com.photoday.photoday.security.utils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

public class CookieUtil {
    static public Cookie createCookie(String cookieName, String value) {
        Cookie cookie = new Cookie(cookieName, value);
        cookie.setDomain("localhost"); //TODO 프론트 기준으로 추후 변경
        cookie.setHttpOnly(true);
        cookie.setMaxAge((int) (1000L * 3600 * 24 * 30));
        cookie.setPath("/");
//        cookie.setSecure(true); TODO 프론트 HTTPS 적용시 해제

        return cookie;
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
