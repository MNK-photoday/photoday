package com.photoday.photoday.user.service;

import com.photoday.photoday.excpetion.CustomException;
import com.photoday.photoday.excpetion.ExceptionCode;
import com.photoday.photoday.image.service.S3Service;
import com.photoday.photoday.security.utils.CustomAuthorityUtils;
import com.photoday.photoday.user.entity.User;
import com.photoday.photoday.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils customAuthorityUtils;
    private final S3Service s3Service;

    public User createUser(User user) {
        verifyExistsEmail(user.getEmail());

        String encryptedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encryptedPassword);

        List<String> roles = customAuthorityUtils.createRoles(user.getEmail());
        user.setRoles(roles);

        String name = getNameFromUser(user);
        user.setName(name);

        User createdUser = userRepository.save(user);

        return createdUser;
    }

    @Transactional(readOnly = true)
    public User getUser(long userId) {
        Long loginUserId = getLoginUserId();
        User targetUser = findVerifiedUser(userId);
        //TODO 본인 조회할 때는 response의 checkFollow 정보 확인하기?
        return targetUser;
    }

    public User updateUser(User user, MultipartFile multipartFile) throws IOException {
        User verifiedUser = findVerifiedUser(user.getUserId());

        Optional.ofNullable(multipartFile).ifPresent(file -> {
            String url = null;
            try {
                url = s3Service.saveImage(multipartFile);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            verifiedUser.setProfileImageUrl(url);
        });

        Optional.ofNullable(user.getPassword()).ifPresent(password -> verifiedUser.setPassword(passwordEncoder.encode(password)));
        Optional.ofNullable(user.getDescription()).ifPresent(description -> verifiedUser.setDescription(description));

        return verifiedUser;
    }

    public void deleteUser() {
        Long loginUserId = getLoginUserId();
        userRepository.deleteById(loginUserId);
    }

    public User findVerifiedUser(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        User verifiedUser = user.orElseThrow(() -> new CustomException(ExceptionCode.USER_NOT_FOUND));
        return verifiedUser;
    }

    private void verifyExistsEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);

        if (user.isPresent()) {
            throw new CustomException(ExceptionCode.USER_ALREADY_EXISTS);
        }
    }

    private String getNameFromUser(User user) {
        String name = user.getEmail().substring(0, user.getEmail().indexOf("@"));
        return name;
    }

    public Long getLoginUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new CustomException(ExceptionCode.USER_NOT_FOUND));
        return user.getUserId();
    }
}
