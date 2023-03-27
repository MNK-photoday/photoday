package com.photoday.photoday.follow.service.impl;

import com.photoday.photoday.excpetion.CustomException;
import com.photoday.photoday.follow.dto.FollowDto;
import com.photoday.photoday.follow.entity.Follow;
import com.photoday.photoday.follow.mapper.FollowMapper;
import com.photoday.photoday.follow.repository.FollowRepository;
import com.photoday.photoday.follow.service.FollowService;
import com.photoday.photoday.security.service.AuthUserService;
import com.photoday.photoday.user.entity.User;
import com.photoday.photoday.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static com.photoday.photoday.excpetion.ExceptionCode.CANNOT_FOLLOW_MYSELF;
import static com.photoday.photoday.excpetion.ExceptionCode.USER_NOT_FOUND;

@Service
@RequiredArgsConstructor
@Transactional
public class FollowServiceImpl implements FollowService {
    private final UserService userService;
    private final FollowRepository followRepository;
    private final FollowMapper followMapper;
    private final AuthUserService authUserService;

    @Override
    public FollowDto.ResponseFollowUsers findFollowUser(Long userId) {
        Long loginUserId = authUserService.getLoginUserId();
        User verifiedUser = userService.findVerifiedUser(userId);

        return followMapper.followUserListToResponseFollowUsers(verifiedUser, loginUserId);
    }

    @Override
    public FollowDto.ResponseFollowUsers registerFollowUser(Long followingId) {
        User loginUser = authUserService.getLoginUser()
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));
        if (followingId.equals(loginUser.getUserId())) {
            throw new CustomException(CANNOT_FOLLOW_MYSELF);
        }
        User targetUser = userService.findVerifiedUser(followingId);

        Optional<Follow> check = followRepository.findByFollowerAndFollowing(targetUser, loginUser);

        if (check.isPresent()) {
            loginUser.getFollowing().remove(check.get());
            targetUser.getFollower().remove(check.get());

            followRepository.delete(check.get());
        } else {
            Follow follow = new Follow();
            follow.setFollower(targetUser);
            follow.setFollowing(loginUser);

            followRepository.save(follow);
        }

        return followMapper.followUserListToResponseFollowUsers(targetUser, loginUser.getUserId());
    }
}
