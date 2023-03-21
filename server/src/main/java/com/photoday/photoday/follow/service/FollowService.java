package com.photoday.photoday.follow.service;

import com.photoday.photoday.excpetion.CustomException;
import com.photoday.photoday.excpetion.ExceptionCode;
import com.photoday.photoday.follow.dto.FollowDto;
import com.photoday.photoday.follow.entity.Follow;
import com.photoday.photoday.follow.mapper.FollowMapper;
import com.photoday.photoday.follow.repository.FollowRepository;
import com.photoday.photoday.security.service.AuthUserService;
import com.photoday.photoday.user.entity.User;
import com.photoday.photoday.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class FollowService {
    private final UserService userService;
    private final FollowRepository followRepository;
    private final FollowMapper followMapper;
    private final AuthUserService authUserService;

    public FollowDto.ResponseFollowUsers findFollowUser() {
        Long loginUserId = authUserService.getLoginUserId();

        List<Follow> follower = followRepository.findFollowByFollower_UserId(loginUserId);
        List<Follow> following = followRepository.findFollowByFollowing_UserId(loginUserId);

        //사용자가 팔로우한 사람
        List<User> userFollowing = following.stream().map(Follow::getFollower).collect(Collectors.toList());
        //사용자를 팔로우한 사람
        List<User> userFollower = follower.stream().map(Follow::getFollowing).collect(Collectors.toList());

        Map<String, List<User>> follow = new HashMap<>();
        follow.put("following", userFollowing);
        follow.put("follower", userFollower);

        return followMapper.followUserListToResponseFollowUsers(follow, loginUserId);
    }

    public FollowDto.ResponseFollowUsers registerFollowUser(Long followingId) {
        Long loginUserId = authUserService.getLoginUserId();
        if(followingId.equals(loginUserId)) {
            throw new CustomException(ExceptionCode.CANNOT_FOLLOW_MYSELF);
        }
        User user = userService.findVerifiedUser(loginUserId);
        User targetUser = userService.findVerifiedUser(followingId);

        Optional<Follow> check = followRepository.findByFollowerAndFollowing(targetUser, user);

        if(check.isPresent()) {
            user.getFollowing().remove(check.get());
            targetUser.getFollower().remove(check.get());

            followRepository.delete(check.get());
        } else {
            Follow follow = new Follow();
            follow.setFollower(targetUser);
            follow.setFollowing(user);

            followRepository.save(follow);
        }

        return findFollowUser();
    }

}
