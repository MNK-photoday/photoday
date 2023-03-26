package com.photoday.photoday.security.service.impl;

import com.photoday.photoday.excpetion.CustomException;
import com.photoday.photoday.excpetion.ExceptionCode;
import com.photoday.photoday.mail.user.UserApplicationEvent;
import com.photoday.photoday.security.service.AuthUserService;
import com.photoday.photoday.user.entity.User;
import com.photoday.photoday.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthUserServiceImpl implements AuthUserService {
    private final UserRepository userRepository;
    private final ApplicationEventPublisher publisher;

    @Override
    public Long getLoginUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new CustomException(ExceptionCode.USER_NOT_FOUND));
        return user.getUserId();
    }

    @Override
    public Long checkLogin() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (userRepository.findByEmail(authentication.getName()).isPresent()) {
            return userRepository.findByEmail(authentication.getName()).get().getUserId();
        }
        return null;
    }

    @Override
    public String getLoginUserEmail() { //TODO 미사용 메서드 지우기
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }

    @Override
    public Optional<User> getLoginUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return userRepository.findByEmail(authentication.getName());
    }

    @Override
    public void setNewPassword(String email) { //TODO 익셉션 코드 임포트 바꾸기
        User user = userRepository.findByEmail(email).orElseThrow(() -> new CustomException(ExceptionCode.USER_NOT_FOUND));
        publisher.publishEvent(new UserApplicationEvent(this, user));
    }
}
