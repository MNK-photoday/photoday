package com.photoday.photoday.security.service;

public interface AuthUserService {
    Long getLoginUserId();

    Long checkLogin();

    String getLoginUserEmail();

    void setNewPassword(String email);
}
