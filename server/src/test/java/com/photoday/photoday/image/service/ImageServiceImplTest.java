package com.photoday.photoday.image.service;

import com.photoday.photoday.excpetion.CustomException;
import com.photoday.photoday.image.dto.ImageDto;
import com.photoday.photoday.image.repository.ImageRepository;
import com.photoday.photoday.security.service.AuthUserService;
import com.photoday.photoday.tag.dto.TagDto;
import com.photoday.photoday.user.entity.User;
import com.photoday.photoday.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

@ExtendWith(SpringExtension.class)
@SpringBootTest
class ImageServiceImplTest {
    @Autowired
    ImageService imageService;
    @Autowired
    UserRepository userRepository;
    @Autowired
    ImageRepository imageRepository;
    @MockBean
    AuthUserService authUserService;
    @MockBean
    S3Service s3Service;

    @BeforeEach
    void dropRepository() {
        userRepository.deleteAll();
        imageRepository.deleteAll();
    }

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
    @DisplayName("createImage: 다른 형식의 파일 입력")
    void createImageTestWrongContentType() {
        // given
        TagDto tagDto = new TagDto(List.of("background", "blue"));
        MultipartFile multipartFile = new MockMultipartFile("multipartFile", "originalFileName", "application/pdf", "multipartFile".getBytes());

        // when & then
        CustomException exception = assertThrows(CustomException.class, () -> imageService.createImage(tagDto, multipartFile));
        assertEquals(HttpStatus.BAD_REQUEST, exception.getExceptionCode().getHttpStatus());
        assertEquals("이미지 타입의 파일이 아닙니다.", exception.getExceptionCode().getMessage());
    }

    @Test
    @WithMockUser(username = "default@mail.com")
    @DisplayName("updateImageTags: 정상 입력")
    void updateImageTagsTest() throws IOException, NoSuchAlgorithmException {
        // given
        User user = User.builder()
                .email("default@mail.com")
                .name("default")
                .password("123456a!")
                .build();
        User loginUser = userRepository.save(user);
        given(authUserService.getLoginUserId()).willReturn(loginUser.getUserId());

        TagDto postTagDto = new TagDto(List.of("background", "blue"));
        MultipartFile multipartFile = new MockMultipartFile("multipartFile", "originalFileName", "image/jpeg", "multipartFile".getBytes());
        given(s3Service.getMd5Hash(any(MultipartFile.class))).willReturn("imageHashValue");

        String createdImageUrl = "http://createdImageUrl.jpg";
        given(s3Service.saveImage(any(MultipartFile.class))).willReturn(createdImageUrl);

        ImageDto.Response image = imageService.createImage(postTagDto, multipartFile);

        TagDto patchTagDto = new TagDto(List.of("tag", "will", "be", "change!"));

        // when
        ImageDto.Response response = imageService.updateImageTags(image.getImageId(), patchTagDto);

        // then
        assertTrue(response.getTags().contains("tag"));
        assertTrue(response.getTags().contains("will"));
        assertTrue(response.getTags().contains("be"));
        assertTrue(response.getTags().contains("change!"));
        assertFalse(response.getTags().contains("background"));
        assertFalse(response.getTags().contains("blue"));
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