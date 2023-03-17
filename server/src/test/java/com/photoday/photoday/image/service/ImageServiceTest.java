package com.photoday.photoday.image.service;

import com.photoday.photoday.security.service.AuthUserService;
import com.photoday.photoday.user.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

@SpringBootTest
class ImageServiceTest {
    @Autowired
    ImageService imageService;
    @Autowired
    UserRepository userRepository;
    @MockBean
    AuthUserService authUserService;
    @MockBean
    S3Service s3Service;

    @Test
    void createImageTest() {
    }

    @Test
    void updateImageTagsTest() {
    }

    @Test
    void getImageTest() {
    }

    @Test
    void deleteImageTest() {
    }

    @Test
    void getBookmarkImagesTest() {
    }

    @Test
    void createReportTest() {
    }

    @Test
    void updateLikeTest() {
    }

    @Test
    void updateBookmarkTest() {
    }

    @Test
    void findVerifiedImageTest() {
    }
}