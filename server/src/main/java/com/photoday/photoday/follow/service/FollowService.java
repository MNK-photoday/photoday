package com.photoday.photoday.follow.service;

import com.photoday.photoday.follow.dto.FollowDto;

public interface FollowService {
    FollowDto.ResponseFollowUsers findFollowUser();

    FollowDto.ResponseFollowUsers registerFollowUser(Long followingId);

}
