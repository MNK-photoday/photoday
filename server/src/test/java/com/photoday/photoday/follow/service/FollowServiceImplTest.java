package com.photoday.photoday.follow.service;

import com.photoday.photoday.excpetion.CustomException;
import com.photoday.photoday.follow.entity.Follow;
import com.photoday.photoday.follow.mapper.FollowMapper;
import com.photoday.photoday.follow.repository.FollowRepository;
import com.photoday.photoday.follow.service.impl.FollowServiceImpl;
import com.photoday.photoday.security.service.AuthUserService;
import com.photoday.photoday.user.entity.User;
import com.photoday.photoday.user.service.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;

@ExtendWith(SpringExtension.class)
class FollowServiceImplTest {
    @Mock
    UserService userService;
    @Mock
    FollowRepository followRepository;
    @Spy
    FollowMapper followMapper;
    @Mock
    AuthUserService authUserService;
    @InjectMocks
    FollowServiceImpl followService;

    private Long userId = 0L;

    @Test
    void findFollowUser() {
        // given
        User following = getUser("following@email.com", "following");
        User follower = getUser("follower@email.com", "follower");
        given(authUserService.getLoginUserId()).willReturn(following.getUserId());
        given(userService.findVerifiedUser(anyLong())).willReturn(follower);

        // when
        followService.findFollowUser(follower.getUserId());
    }

    @Test
    void registerFollowUserSave() {
        // given
        User following = getUser("following@email.com", "following");
        User follower = getUser("follower@email.com", "follower");
        Follow follow = new Follow();
        follow.setFollowId(1L);
        follow.setFollowing(following);
        follow.setFollower(follower);
        given(authUserService.getLoginUser()).willReturn(Optional.of(following));
        given(userService.findVerifiedUser(anyLong())).willReturn(follower);
        given(followRepository.findByFollowerAndFollowing(any(User.class), any(User.class))).willReturn(Optional.empty());
        given(followRepository.save(any(Follow.class))).willReturn(follow);

        // when
        followService.registerFollowUser(follower.getUserId());
    }

    @Test
    void registerFollowUserCannotFollowMyself() {
        // given
        User following = getUser("following@email.com", "following");
        given(authUserService.getLoginUser()).willReturn(Optional.of(following));

        // when
        assertThrows(CustomException.class, () -> followService.registerFollowUser(following.getUserId()));
    }

    @Test
    void registerFollowUserRemove() {
        // given
        User following = getUser("following@email.com", "following");
        User follower = getUser("follower@email.com", "follower");
        Follow follow = new Follow();
        follow.setFollowId(1L);
        follow.setFollowing(following);
        follow.setFollower(follower);
        given(authUserService.getLoginUser()).willReturn(Optional.of(following));
        given(userService.findVerifiedUser(anyLong())).willReturn(follower);
        given(followRepository.findByFollowerAndFollowing(any(User.class), any(User.class))).willReturn(Optional.of(follow));

        // when
        followService.registerFollowUser(follower.getUserId());
    }

    private User getUser(String email, String owner) {
        return User.builder()
                .userId(getId())
                .email(email)
                .name(owner)
                .password("123456a!")
                .build();
    }

    private Long getId() {
        userId += 1L;
        return userId;
    }
}