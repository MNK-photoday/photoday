package com.photoday.photoday.user.service.impl;

import com.photoday.photoday.excpetion.CustomException;
import com.photoday.photoday.excpetion.ExceptionCode;
import com.photoday.photoday.image.entity.Report;
import com.photoday.photoday.image.repository.ReportRepository;
import com.photoday.photoday.image.service.S3Service;
import com.photoday.photoday.security.service.AuthUserService;
import com.photoday.photoday.security.utils.CustomAuthorityUtils;
import com.photoday.photoday.user.dto.UserDto;
import com.photoday.photoday.user.entity.User;
import com.photoday.photoday.user.mapper.UserMapper;
import com.photoday.photoday.user.repository.UserRepository;
import com.photoday.photoday.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static com.photoday.photoday.excpetion.ExceptionCode.PASSWORD_NOT_MATCH;
import static com.photoday.photoday.excpetion.ExceptionCode.REPORT_COUNT_EXCEEDS_LIMIT;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final ReportRepository reportRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils customAuthorityUtils;
    private final S3Service s3Service;
    private final UserMapper userMapper;
    private final AuthUserService authUserService;

    @Override
    public UserDto.Response createUser(UserDto.Post userPostDto) {
        User user = userMapper.userPostToUser(userPostDto);
        verifyExistsEmail(user.getEmail());

        String encryptedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encryptedPassword);

        List<String> roles = customAuthorityUtils.createRoles(user.getEmail());
        user.setRoles(roles);

        String name = getNameFromUser(user);
        user.setName(name);
        User createdUser = userRepository.save(user);
        return userMapper.userToUserResponse(createdUser, null);
    }

    @Override
    public User registerUserOAuth2(User user) {
        Optional<User> findUser = userRepository.findByEmail(user.getEmail());
        if (findUser.isPresent()) {
            return findUser.get();
        }
        List<String> roles = customAuthorityUtils.createRoles(user.getEmail());
        user.setRoles(roles);
        user.setName(getNameFromUser(user));

        return userRepository.save(user);
    }

    @Override
    @Transactional(readOnly = true)
    public UserDto.Response getUser(long userId) {
        Long loginUserId = authUserService.getLoginUserId();
        User targetUser = findVerifiedUser(userId);
        return userMapper.userToUserResponse(targetUser, loginUserId);
    }

    @Override
    public UserDto.Response updateUser(UserDto.Update userUpdateDto, MultipartFile multipartFile) {
        User user = userMapper.userUpdateToUser(userUpdateDto);
        Long loginUserId = authUserService.getLoginUserId();
        User verifiedUser = findVerifiedUser(loginUserId);

        Optional.ofNullable(multipartFile).ifPresent(file -> {
            String url = null;
            try {
                url = s3Service.saveImage(multipartFile);
            } catch (IOException e) {
                throw new RuntimeException(e);
            } catch (NoSuchAlgorithmException e) {
                throw new RuntimeException(e);
            }
            verifiedUser.setProfileImageUrl(url);
        });
        Optional.ofNullable(user.getDescription()).ifPresent(verifiedUser::setDescription);
        return userMapper.userToUserResponse(verifiedUser, loginUserId);
    }

    @Override
    public UserDto.Response updateUserPassword(UserDto.UpdateUserPassword updateUserPasswordDto) {
        if (updateUserPasswordDto.getCheckPassword().equals(updateUserPasswordDto.getPassword())) {
            Long loginUserId = authUserService.getLoginUserId();
            User verifiedUser = findVerifiedUser(loginUserId);
            verifiedUser.setPassword(passwordEncoder.encode(updateUserPasswordDto.getPassword()));
            return userMapper.userToUserResponse(verifiedUser, loginUserId);
        } else {
            throw new CustomException(PASSWORD_NOT_MATCH);
        }
    }

    @Override
    public void deleteUser() {
        Long loginUserId = authUserService.getLoginUserId();
        userRepository.deleteById(loginUserId);
    }

    @Override
    public User findVerifiedUser(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        return user.orElseThrow(() -> new CustomException(ExceptionCode.USER_NOT_FOUND));
    }

    @Override
    public void checkUserReportCount(Long userId) {
        List<Report> reportByUser = reportRepository.findReportByUser_UserId(userId);
        if (reportByUser.size() >= 5) {
            throw new CustomException(REPORT_COUNT_EXCEEDS_LIMIT);
        }
    }

    @Override
    public User findUserByEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            return user.get();
        } else {
            throw new CustomException(ExceptionCode.USER_NOT_FOUND);
        }
    }

    @Override
    public void checkBanTime(User user) {
        if (user.getBanTime() != null && LocalDateTime.now().isAfter(user.getBanTime())) {
            user.setBanTime(null);
            user.setStatus(User.UserStatus.USER_ACTIVE);
            userRepository.save(user);
        }
    }

    @Scheduled(cron = "0 0 0 * * *", zone = "Asia/Seoul")
    protected void resetTodayUserReportCount() {
        log.info(String.valueOf(LocalDateTime.now()));
        userRepository.resetTodayReportCount();
    }

    private void verifyExistsEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);

        if (user.isPresent()) {
            throw new CustomException(ExceptionCode.USER_ALREADY_EXISTS);
        }
    }

    private String getNameFromUser(User user) {
        return user.getEmail().substring(0, user.getEmail().indexOf("@"));
    }

}
