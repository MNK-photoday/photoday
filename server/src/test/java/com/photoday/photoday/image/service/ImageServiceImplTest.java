package com.photoday.photoday.image.service;

import com.photoday.photoday.excpetion.CustomException;
import com.photoday.photoday.image.dto.ImageDto;
import com.photoday.photoday.image.entity.Image;
import com.photoday.photoday.image.entity.Report;
import com.photoday.photoday.image.repository.ImageRepository;
import com.photoday.photoday.security.service.AuthUserService;
import com.photoday.photoday.tag.dto.TagDto;
import com.photoday.photoday.user.entity.User;
import com.photoday.photoday.user.repository.UserRepository;
import com.photoday.photoday.user.service.UserService;
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
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
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
    @MockBean
    UserService userService;

    @BeforeEach
    void dropRepository() {
        userRepository.deleteAll();
        imageRepository.deleteAll();
    }

    @Test
    @WithMockUser(username = "loginUser@email.com")
    @DisplayName("createImage: 정상 입력")
    void createImageTest() throws IOException, NoSuchAlgorithmException {
        // given
        User loginUser = getUser("loginUser@email.com", "loginUser");
        given(authUserService.getLoginUser()).willReturn(Optional.of(loginUser));

        TagDto tagDto = new TagDto(List.of("background", "blue"));
        MultipartFile multipartFile = getMultipartFile("image/jpeg");

        given(s3Service.getMd5Hash(any(MultipartFile.class))).willReturn("imageHashValue");
        given(s3Service.saveImage(any(MultipartFile.class))).willReturn("http://createdImageUrl.jpg");
        given(authUserService.getLoginUser()).willReturn(Optional.of(loginUser));
        given(userService.checkAdmin(anyLong())).willReturn(false);

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
        MultipartFile multipartFile = getMultipartFile("application/pdf");

        // when & then
        CustomException exception = assertThrows(CustomException.class, () -> imageService.createImage(tagDto, multipartFile));
        assertEquals(HttpStatus.BAD_REQUEST, exception.getExceptionCode().getHttpStatus());
        assertEquals("이미지 타입의 파일이 아닙니다.", exception.getExceptionCode().getMessage());
    }

    @Test
    @WithMockUser(username = "loginUser@email.com")
    @DisplayName("updateImageTags: 정상 입력")
    void updateImageTagsTest() throws IOException, NoSuchAlgorithmException {
        // given
        User loginUser = getUser("loginUser@email.com", "loginUser");
        given(authUserService.getLoginUser()).willReturn(Optional.of(loginUser));

        TagDto post = new TagDto(List.of("background", "blue"));
        MultipartFile multipartFile = getMultipartFile("image/jpeg");

        given(s3Service.getMd5Hash(any(MultipartFile.class))).willReturn("imageHashValue");
        given(s3Service.saveImage(any(MultipartFile.class))).willReturn("http://createdImageUrl.jpg");

        ImageDto.Response image = imageService.createImage(post, multipartFile);

        TagDto patch = new TagDto(List.of("tags", "will", "be", "change!"));

        // when
        ImageDto.Response response = imageService.updateImageTags(image.getImageId(), patch);

        // then
        assertTrue(response.getTags().contains("tags"));
        assertTrue(response.getTags().contains("will"));
        assertTrue(response.getTags().contains("be"));
        assertTrue(response.getTags().contains("change!"));
        assertFalse(response.getTags().contains("background"));
        assertFalse(response.getTags().contains("blue"));
    }

    @Test
    @WithMockUser(username = "loginUser@email.com")
    @DisplayName("getImage: 정상 입력")
    void getImageTest() throws IOException, NoSuchAlgorithmException {
        // given
        User loginUser = getUser("loginUser@email.com", "loginUser");
        given(authUserService.getLoginUser()).willReturn(Optional.of(loginUser));

        TagDto postTagDto = new TagDto(List.of("background", "blue"));
        MultipartFile multipartFile = getMultipartFile("image/jpeg");

        given(s3Service.getMd5Hash(any(MultipartFile.class))).willReturn("imageHashValue");
        given(s3Service.saveImage(any(MultipartFile.class))).willReturn("http://createdImageUrl.jpg");

        ImageDto.Response image = imageService.createImage(postTagDto, multipartFile);

        // when
        ImageDto.Response response = imageService.getImage(image.getImageId());

        // then
        assertEquals(image.getViewCount() + 1, response.getViewCount());
    }

    @Test
    @DisplayName("deleteImage: 잘못된 유저")
    void deleteImageTest() {
        // given
        User loginUser = getUser("loginUser@email.com", "loginUser");
        given(authUserService.getLoginUser()).willReturn(Optional.of(loginUser));

        User owner = getUser("owner@email.com", "owner");
        Image image = getImage(owner);

        // when & then
        CustomException exception = assertThrows(CustomException.class, () -> imageService.deleteImage(image.getImageId()));
        assertEquals(HttpStatus.UNAUTHORIZED, exception.getExceptionCode().getHttpStatus());
        assertEquals("게시물 작성자가 아닙니다.", exception.getExceptionCode().getMessage());
    }

    @Test
    @WithMockUser("loginUser@email.com")
    @DisplayName("updateBookmark: 한 번 눌렀을 때 북마크 추가")
    void updateBookmarkTest() throws IOException, NoSuchAlgorithmException {
        // given
        User loginUser = getUser("loginUser@email.com", "loginUser");
        given(authUserService.getLoginUser()).willReturn(Optional.of(loginUser));

        TagDto postTagDto = new TagDto(List.of("background", "blue"));
        MultipartFile multipartFile = getMultipartFile("image/jpeg");

        given(s3Service.getMd5Hash(any(MultipartFile.class))).willReturn("imageHashValue");
        given(s3Service.saveImage(any(MultipartFile.class))).willReturn("http://createdImageUrl.jpg");

        ImageDto.Response image = imageService.createImage(postTagDto, multipartFile);

        // when
        ImageDto.Response response = imageService.updateBookmark(image.getImageId());

        // then
        assertTrue(response.isBookmark());
    }

    @Test
    @WithMockUser("loginUser@email.com")
    @DisplayName("updateBookmark: 두 번 눌렀을 때 북마크 취소")
    void updateBookmarkCancelTest() throws IOException, NoSuchAlgorithmException {
        // given
        User loginUser = getUser("loginUser@mail.com", "loginUser");
        given(authUserService.getLoginUser()).willReturn(Optional.of(loginUser));

        TagDto postTagDto = new TagDto(List.of("background", "blue"));
        MultipartFile multipartFile = getMultipartFile("image/jpeg");

        given(s3Service.getMd5Hash(any(MultipartFile.class))).willReturn("imageHashValue");
        given(s3Service.saveImage(any(MultipartFile.class))).willReturn("http://createdImageUrl.jpg");

        ImageDto.Response image = imageService.createImage(postTagDto, multipartFile);

        // when
        imageService.updateBookmark(image.getImageId());
        ImageDto.Response response = imageService.updateBookmark(image.getImageId());

        // then
        assertFalse(response.isBookmark());
    }

    @Test
    @WithMockUser("loginUser@email.com")
    @DisplayName("createReport: 한 번 눌렀을 때 신고 성공")
    void createReportTest() {
        // given
        User loginUser = getUser("loginUser@email.com", "loginUser");
        given(authUserService.getLoginUser()).willReturn(Optional.of(loginUser));

        User owner = getUser("owner@email.com", "owner");
        Image image = getImage(owner);

        // when
        ImageDto.Response response = imageService.createReport(image.getImageId());

        // then
        assertTrue(response.isReport());
    }

    @Test
    @WithMockUser("loginUser@mail.com")
    @DisplayName("createReport: 두 번 눌렀을 때 신고 불가")
    void createReportFailTest() {
        // given
        User loginUser = getUser("loginUser@email.com", "loginUser");
        given(authUserService.getLoginUser()).willReturn(Optional.of(loginUser));

        User owner = getUser("owner@email.com", "owner");
        Image image = getImage(owner);

        imageService.createReport(image.getImageId());

        // when & then
        CustomException exception = assertThrows(CustomException.class, () -> imageService.createReport(image.getImageId()));
        assertEquals(HttpStatus.CONFLICT, exception.getExceptionCode().getHttpStatus());
        assertEquals("이미 신고한 게시물입니다.", exception.getExceptionCode().getMessage());
    }

    @Test
    @WithMockUser("owner@email.com")
    @DisplayName("createReport: 게시글 작성자가 신고 불가")
    void createReportCannotReportMyselfTest() {
        // given
        User owner = getUser("owner@email.com", "owner");
        given(authUserService.getLoginUser()).willReturn(Optional.of(owner));

        Image image = getImage(owner);

        // when & then
        CustomException exception = assertThrows(CustomException.class, () -> imageService.createReport(image.getImageId()));
        assertEquals(HttpStatus.UNAUTHORIZED, exception.getExceptionCode().getHttpStatus());
        assertEquals("본인 게시물을 신고할 수 없습니다.", exception.getExceptionCode().getMessage());
    }

    @Test
    @WithMockUser("loginUser@mail.com")
    @DisplayName("createReport: 신고 5회시 게시물 삭제")
    void createReportImageDeleteTest() {
        // given
        User owner = getUser("owner@email.com", "owner");
        Image savedImage = getImage(owner);

        User user1 = getUser("user1@email.com", "user1");
        User user2 = getUser("user2@email.com", "user2");
        User user3 = getUser("user3@email.com", "user3");
        User user4 = getUser("user4@email.com", "user4");

        getReport(savedImage, user1);
        getReport(savedImage, user2);
        getReport(savedImage, user3);
        getReport(savedImage, user4);

        Image image = imageRepository.save(savedImage);

        User loginUser = getUser("loginUser@email.com", "loginUser");
        given(authUserService.getLoginUser()).willReturn(Optional.of(loginUser));

        // when
        ImageDto.Response response = imageService.createReport(image.getImageId());

        // then
        assertNull(response);
    }

    @Test
    @WithMockUser("loginUser@mail.com")
    @DisplayName("createReport: 신고 10회 시 유저 밴")
    void createReportImageOwnerBanTest() {
        // given
        User owner = getUser("owner@email.com", "owner");
        owner.setReportedCount(9);
        User save = userRepository.save(owner);
        Image image = getImage(save);

        User loginUser = getUser("loginUser@email.com", "loginUser");
        given(authUserService.getLoginUser()).willReturn(Optional.of(loginUser));

        // when
        imageService.createReport(image.getImageId());

        // then
    }

    @Test
    @WithMockUser("loginUser@email.com")
    @DisplayName("updateList: 한 번 눌렀을 때 좋아요 추가")
    void updateLikeTest() {
        // given
        User owner = getUser("owner@email.com", "owner");
        Image image = getImage(owner);

        User loginUser = getUser("loginUser@email.com", "loginUser");
        given(authUserService.getLoginUser()).willReturn(Optional.of(loginUser));

        // when
        ImageDto.Response response = imageService.updateLike(image.getImageId());

        // then
        assertTrue(response.isLike());
    }

    @Test
    @WithMockUser("loginUser@email.com")
    @DisplayName("updateList: 두 번 눌렀을 때 좋아요 취소")
    void updateLikeCancelTest() {
        // given
        User owner = getUser("owner@email.com", "owner");
        Image image = getImage(owner);

        User loginUser = getUser("loginUser@email.com", "loginUser");
        given(authUserService.getLoginUser()).willReturn(Optional.of(loginUser));
        imageService.updateLike(image.getImageId());

        // when
        ImageDto.Response response = imageService.updateLike(image.getImageId());

        // then
        assertFalse(response.isLike());
    }

    @Test
    @DisplayName("findVerifiedImage: 존재하는 이미지 찾기")
    void findVerifiedImageTest() {
        // given
        User owner = getUser("owner@email.com", "owner");
        Image image = getImage(owner);
        Image save = imageRepository.save(image);

        // when
        Image verifiedImage = imageService.findVerifiedImage(save.getImageId());

        // then
        assertEquals(verifiedImage.getImageId(), save.getImageId());
    }

    @Test
    @DisplayName("findVerifiedImage: 존재하지 않는 이미지 찾기")
    void findVerifiedImageFailTest() {
        // given
        User owner = getUser("owner@email.com", "owner");
        Image image = getImage(owner);
        Image save = imageRepository.save(image);

        // when & then
        CustomException exception = assertThrows(CustomException.class, () -> imageService.findVerifiedImage(save.getImageId() + 1));
        assertEquals(HttpStatus.NOT_FOUND, exception.getExceptionCode().getHttpStatus());
        assertEquals("이미지가 없습니다.", exception.getExceptionCode().getMessage());
    }

    private static void getReport(Image savedImage, User user1) {
        Report report = new Report();
        report.setImage(savedImage);
        report.setUser(user1);
    }

    private Image getImage(User user) {
        Image image = Image.builder()
                .imageUrl("http://imageUrl.jpg")
                .createdAt(LocalDateTime.now())
                .user(user)
                .imageHashValue("imageHashValue")
                .build();
        return imageRepository.save(image);
    }

    private User getUser(String email, String owner) {
        User user = User.builder()
                .email(email)
                .name(owner)
                .password("123456a!")
                .build();
        return userRepository.save(user);
    }

    private static MockMultipartFile getMultipartFile(String contentType) {
        return new MockMultipartFile("multipartFile", "originalFileName", contentType, "multipartFile".getBytes());
    }
}