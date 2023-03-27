package com.photoday.photoday.image.service;

import com.photoday.photoday.image.mapper.ImageMapper;
import com.photoday.photoday.image.repository.ImageRepository;
import com.photoday.photoday.image.repository.LikeRepository;
import com.photoday.photoday.image.service.impl.ImageServiceImpl;
import com.photoday.photoday.security.service.AuthUserService;
import com.photoday.photoday.tag.mapper.TagMapper;
import com.photoday.photoday.tag.service.TagService;
import com.photoday.photoday.user.service.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
public class ImageServiceImplV2Test {
    @InjectMocks
    ImageServiceImpl imageService;
    @Mock
    ImageRepository imageRepository;
    @Mock
    TagService tagService;
    @Mock
    S3Service s3Service;
    @Mock
    UserService userService;
    @InjectMocks
    ImageMapper imageMapper;
    @Spy
    TagMapper tagMapper;
    @Mock
    AuthUserService authUserService;
    @Mock
    LikeRepository repository;

    @Test
    void init() {
        
    }
}
