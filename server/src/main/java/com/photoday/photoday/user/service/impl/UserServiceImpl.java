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

import static com.photoday.photoday.excpetion.ExceptionCode.*;

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
//        Long loginUserId = authUserService.checkLogin();
//        boolean checkAdmin = checkAdmin(loginUserId);
        User targetUser = findVerifiedUser(userId);
        User loginUser = authUserService.getLoginUser().orElse(null);

        return userMapper.userToUserResponse(targetUser, loginUser);
    }

    @Override
    public UserDto.Response updateUser(UserDto.Update userUpdateDto, MultipartFile multipartFile) {
        User user = userMapper.userUpdateToUser(userUpdateDto);
//        Long loginUserId = authUserService.getLoginUserId();
//        User verifiedUser = findVerifiedUser(loginUserId);
//        boolean checkAdmin = checkAdmin(loginUserId);
        User loginUser = authUserService.getLoginUser().orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        Optional.ofNullable(multipartFile).ifPresent(file -> {
            String url = null;
            try {
                url = s3Service.saveImage(multipartFile);
            } catch (IOException e) {
                throw new RuntimeException(e);
            } catch (NoSuchAlgorithmException e) {
                throw new RuntimeException(e);
            }
            loginUser.setProfileImageUrl(url);
        });
        Optional.ofNullable(user.getDescription()).ifPresent(loginUser::setDescription);
        return userMapper.userToUserResponse(loginUser, loginUser);
    }

    @Override
    public UserDto.Response updateUserPassword(UserDto.UpdateUserPassword updateUserPasswordDto) {
        if (updateUserPasswordDto.getCheckPassword().equals(updateUserPasswordDto.getPassword())) {
//            Long loginUserId = authUserService.getLoginUserId();
//            User loginUser = findVerifiedUser(loginUserId);
//            boolean checkAdmin = checkAdmin(verifiedUser.get);
            User loginUser = authUserService.getLoginUser().orElseThrow(() -> new CustomException(USER_NOT_FOUND));
            loginUser.setPassword(passwordEncoder.encode(updateUserPasswordDto.getPassword()));
            return userMapper.userToUserResponse(loginUser, loginUser);
        } else {
            throw new CustomException(PASSWORD_NOT_MATCH);
        }
    }

    @Override
    public void deleteUser(Long userId) {
        Long loginUserId = authUserService.getLoginUserId();

        List<String> roles = findVerifiedUser(loginUserId).getRoles();
        if (roles.contains("ADMIN") || userId.equals(loginUserId)) {
            userRepository.deleteById(userId);
        } else {
            throw new CustomException(ExceptionCode.USER_INFO_NOT_MATCH);
        }
    }

    @Override
    public UserDto.Response deleteProfileImage() {
//        Long loginUserId = authUserService.getLoginUserId();
//        User loginUser = findVerifiedUser(loginUserId);
//        boolean checkAdmin = checkAdmin(loginUserId);
        User loginUser = authUserService.getLoginUser().orElseThrow(() -> new CustomException(USER_NOT_FOUND));
        loginUser.setProfileImageUrl("https://ifh.cc/g/zPrPfv.png");

        return userMapper.userToUserResponse(loginUser, loginUser);
    }

    @Override
    public User findVerifiedUser(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        return user.orElseThrow(() -> new CustomException(ExceptionCode.USER_NOT_FOUND));
    }

    @Override
    public void checkUserReportCount(User user) {
        List<Report> reportByUser = user.getReports();
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

    @Override
    public boolean checkAdmin(Long loginUserId) {
        boolean checkAdmin = loginUserId != null && findVerifiedUser(loginUserId).getRoles().contains("ADMIN");

        return checkAdmin;
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
