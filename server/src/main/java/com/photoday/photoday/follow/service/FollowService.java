package com.photoday.photoday.follow.service;

import com.photoday.photoday.excpetion.CustomException;
import com.photoday.photoday.excpetion.ExceptionCode;
import com.photoday.photoday.follow.repository.FollowRepository;
import com.photoday.photoday.follow.entity.Follow;
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
    public Map<String, List<User>> findFollowUser() {
        Long loginUserId = userService.getLoginUserId();

        List<Follow> following = followRepository.findFollowByFollower_UserId(loginUserId);
        List<Follow> follower = followRepository.findFollowByFollowing_UserId(loginUserId);

        //사용자가 팔로우한 사람
        List<User> userFollowing = following.stream().map(follow -> follow.getFollowing()).collect(Collectors.toList());
        //사용자를 팔로우한 사람
        List<User> userFollower = follower.stream().map(follow -> follow.getFollower()).collect(Collectors.toList());

        Map<String, List<User>> follow = new HashMap<>();
        follow.put("following", userFollowing);
        follow.put("follower", userFollower);

        return follow;
    }

    public Map<String, List<User>> registerFollowUser(Long followingId) {
        Long loginUserId = userService.getLoginUserId();
        if(followingId.equals(loginUserId)) {
            throw new CustomException(ExceptionCode.CANNOT_FOLLOW_MYSELF);
        }
        User follower = userService.findVerifiedUser(loginUserId);
        User following = userService.findVerifiedUser(followingId);

        Optional<Follow> check = followRepository.findByFollowerAndFollowing(follower, following);

        if(check.isPresent()) {
            follower.getFollowing().remove(check.get());
            following.getFollower().remove(check.get());

            followRepository.delete(check.get());
        } else {
            Follow follow = new Follow();
            follow.setFollower(follower);
            follow.setFollowing(following);

            followRepository.save(follow);
        }

        return findFollowUser();
    }
}
