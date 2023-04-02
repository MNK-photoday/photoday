package com.photoday.photoday.image.mapper;

import com.photoday.photoday.image.dto.ImageDto;
import com.photoday.photoday.image.entity.Image;
import com.photoday.photoday.security.service.impl.AuthUserServiceImpl;
import com.photoday.photoday.user.dto.UserDto;
import com.photoday.photoday.user.entity.User;
import com.photoday.photoday.user.mapper.UserMapper;
import com.photoday.photoday.user.service.UserService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.given;


@ExtendWith(SpringExtension.class)
@SpringBootTest
class ImageMapperTest {
    @Autowired
    ImageMapper imageMapper;
    @MockBean
    UserMapper userMapper;
    @MockBean
    AuthUserServiceImpl authUserServiceImpl;
    @MockBean
    UserService userService;

    @Test
    @WithMockUser // default value로 username = “user”, password = “password”, role = “USER”
    @DisplayName("imageToBookmarkAndSearchResponse: 북마크 안 한 경우의 정상 작동")
    void imageToBookmarkAndSearchResponse() {
        // given
        Image image = Image.builder()
                .imageId(1L)
                .imageUrl("imageUrl")
                .user(new User())
                .viewCount(3)
                .build();

//        private method test 접근
//        Method method = imageMapper.getClass().getDeclaredMethod("hasLiked", Image.class);
//        method.setAccessible(true);
//        assertThrows(NullPointerException.class, ()->method.invoke(imageMapper, image));

        given(userMapper.userToUserResponse(Mockito.any(User.class), any(User.class))).willReturn(new UserDto.Response());

        // when
        ImageDto.PageResponse pageResponse = imageMapper.imageToPageResponse(image);

        // then
        assertEquals(pageResponse.getImageId(), image.getImageId());
        assertFalse(pageResponse.isLike());
        assertEquals(pageResponse.getImageUrl(), image.getImageUrl());
        assertFalse(pageResponse.isBookmark());
    }

    @Test
    @WithMockUser
    @DisplayName("imageToResponse: 정상 작동")
    void imageToResponse() {
        // given
        Image image = Image.builder()
                .imageId(1L)
                .imageUrl("imageUrl")
                .user(User.builder().userId(1L).build())
                .viewCount(3)
                .imageTagList(new ArrayList<>())
                .bookmarkList(new ArrayList<>())
                .likeList(new ArrayList<>())
                .reportList(new ArrayList<>())
                .build();

        UserDto.Response responseUser = new UserDto.Response(1L, "홍길동", "profileImageUrl", "hi", 1, 1,
                1, 1, false, false, false);

        given(userMapper.userToUserResponse(Mockito.any(User.class), any(User.class))).willReturn(responseUser);
        given(userService.checkAdmin(anyLong())).willReturn(false);

        //when
        ImageDto.Response response = imageMapper.imageToResponse(image, null);

        //then
        assertEquals(response.getImageId(), image.getImageId());
        assertEquals(response.getImageUrl(), image.getImageUrl());
        assertFalse(response.isLike());
        assertEquals(response.getLikeCount(), image.getLikeList().size());
        assertFalse(response.isReport());
        assertEquals(response.getReportCount(), image.getReportList().size());
        assertFalse(response.isBookmark());
        assertEquals(response.getViewCount(), image.getViewCount());
        assertEquals(response.getTags().size(), 0);
        assertEquals(response.getCreatedAt(), image.getCreatedAt());
    }
}