package com.photoday.photoday.util;

import org.springframework.stereotype.Component;

import java.security.SecureRandom;
import java.util.Date;

@Component
public class TempPassword {
    public String getTempPassword() {
        String str = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&";

        StringBuffer sb = new StringBuffer();
        SecureRandom sr = new SecureRandom();
        sr.setSeed(new Date().getTime());

        int size = (int) Math.floor(Math.random() * (17 - 8 + 1)) + 8;

        for (int i = 0; i < size; i++) {
            int idx = sr.nextInt(str.length());    // 강력한 난수를 발생시키기 위해 SecureRandom을 사용한다.
            sb.append(str.charAt(idx));
        }

        //유효성 검사에 충족하기 위한 로직 추가
        sb.append(str.charAt((int) (Math.random() * 10)));
        sb.append(str.charAt((int) (Math.random() * (str.indexOf("z") - str.indexOf("A"))) + str.indexOf("A")));
        sb.append(str.charAt((int) (Math.random() * (str.indexOf("&") - str.indexOf("!"))) + str.indexOf("!")));

        return sb.toString();
    }
}
