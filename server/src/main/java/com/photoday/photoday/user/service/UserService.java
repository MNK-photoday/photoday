package com.photoday.photoday.user.service;

import com.photoday.photoday.excpetion.CustomException;
import com.photoday.photoday.excpetion.ExceptionCode;
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

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils customAuthorityUtils;
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
    public User getUser() {
        Long loginUserId = getLoginUserId();
        User verifiedUser = findVerifiedUser(loginUserId);

        return verifiedUser;
    }

    public User updateUser(User user, MultipartFile multipartFile) {
        User verifiedUser = findVerifiedUser(user.getUserId());
//        String url = imageService.getImageUrl(multipartFile);
        Optional.ofNullable(user.getPassword()).ifPresent(password -> verifiedUser.setPassword(password));
        Optional.ofNullable(user.getDescription()).ifPresent(aboutMe -> verifiedUser.setDescription(aboutMe));

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
            throw new CustomException(ExceptionCode.USER_EXISTS);
        }
    }

    private String getNameFromUser(User user) {
        String name = user.getEmail().substring(0, user.getEmail().indexOf("@"));

        return name;
    }

    public Long getLoginUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(authentication.getName()).get();

        return user.getUserId();
    }
}
