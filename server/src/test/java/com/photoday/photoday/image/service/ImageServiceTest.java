package com.photoday.photoday.image.service;

import com.photoday.photoday.image.dto.ImageDto;
import com.photoday.photoday.security.service.AuthUserService;
import com.photoday.photoday.tag.dto.TagDto;
import com.photoday.photoday.user.entity.User;
import com.photoday.photoday.user.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

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
    @WithMockUser(username = "default@mail.com")
    @DisplayName("createImage: 정상 입력")
    void createImageTest() throws IOException, NoSuchAlgorithmException {
        // given
        User user = User.builder()
                .email("default@mail.com")
                .name("default")
                .password("123456a!")
                .build();
        User loginUser = userRepository.save(user);
        given(authUserService.getLoginUserId()).willReturn(loginUser.getUserId());

        TagDto tagDto = new TagDto(List.of("background", "blue"));
        MultipartFile multipartFile = new MockMultipartFile("multipartFile", "originalFileName", "image/jpeg", "multipartFile".getBytes());
        given(s3Service.getMd5Hash(any(MultipartFile.class))).willReturn("imageHashValue");

        String createdImageUrl = "http://createdImageUrl.jpg";
        given(s3Service.saveImage(any(MultipartFile.class))).willReturn(createdImageUrl);

        // when
        ImageDto.Response image = imageService.createImage(tagDto, multipartFile);

        // then
        assertNotNull(image.getImageId());
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