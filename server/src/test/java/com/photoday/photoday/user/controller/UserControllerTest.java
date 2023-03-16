package com.photoday.photoday.user.controller;

import com.photoday.photoday.helper.security.SecurityTestHelper;
import com.photoday.photoday.user.dto.UserDto;
import com.photoday.photoday.user.entity.User;
import com.photoday.photoday.user.mapper.UserMapper;
import com.photoday.photoday.user.service.UserService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

import static com.photoday.photoday.helper.snippets.RestDocsSnippets.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
@AutoConfigureMockMvc
class UserControllerTest {
    @Autowired
    private MockMvc mvc;
    @Autowired
    private SecurityTestHelper helper;
    @MockBean
    private UserService userService;
    @MockBean
    private UserMapper userMapper;

    @Test
    @DisplayName("postUser: 정상 입력")
    void postUser() throws Exception {
        // given
        String content = getPostUserJsonBody("test@test.com", "123456a!");
        UserDto.Response response = getUserDtoResponse();

        given(userMapper.userPostToUser(any(UserDto.Post.class))).willReturn(new User());
        given(userService.createUser(any(UserDto.Post.class))).willReturn(response);

        // when
        ResultActions actions = mvc.perform(
                post("/api/users")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content));

        // then
        actions
                .andExpect(status().isCreated())
                .andDo(document("post-user",
                        getRequestPreprocessor(),
                        getResponsePreprocessor(),
                        getResponseHeadersLocation(),
                        getRequestFieldsUserDtoPost()));
    }


    @Test
    @DisplayName("postUser: 잘못된 이메일")
    void postUserBadEmail() throws Exception {
        // given
        String content = getPostUserJsonBody("1234", "123456a!");

        // when
        ResultActions actions = mvc.perform(
                post("/api/users")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content));

        // then
        actions
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("postUser: 잘못된 비밀번호")
    void postUserBadPassword() throws Exception {
        // given
        String content = getPostUserJsonBody("test@test.com", "123456");

        // when
        ResultActions actions = mvc.perform(
                post("/api/users")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content));

        // then
        actions
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("postUser: 입력 없음")
    void postUserInputNothing() throws Exception {
        // given
        String content = getPostUserJsonBody(null, null);

        // when
        ResultActions actions = mvc.perform(
                post("/api/users")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content));

        // then
        actions
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("updateUser: 정상 입력")
    void updateUser() throws Exception {
        // given
        String userUpdateDto = getUpdateUserJsonBody("짱구");
        MockMultipartFile content = getMockMultipartFile("userUpdateDto", userUpdateDto);
        UserDto.Response response = getUserDtoResponse();

        given(userService.updateUser(any(UserDto.Update.class), any(MultipartFile.class))).willReturn(response);

        // when
        ResultActions actions = mvc.perform(
                multipart("/api/users/update")
                        .file("file", "example".getBytes())
                        .file(content)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType("multipart/form-data")
                        .characterEncoding("UTF-8"));

        // then
        actions
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(document("update-user",
                        getRequestPreprocessor(),
                        getResponsePreprocessor(),
                        getResponsePartUpdateUser(),
                        getRequestPartFieldUpdateUser(),
                        getResponseFieldsUserDtoResponse()));
    }

    @Test
    @DisplayName("updateUser: description만 수정")
    void updateUserUpdateOnlyDescription() throws Exception {
        // given
        String userPatchDto = getUpdateUserJsonBody("짱구입니다.");
        MockMultipartFile content = getMockMultipartFile("userUpdateDto", userPatchDto);
        UserDto.Response response = getUserDtoResponse();

        given(userService.updateUser(any(UserDto.Update.class), any(MultipartFile.class))).willReturn(response);

        // when
        ResultActions actions = mvc.perform(
                multipart("/api/users/update")
                        .file(content)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType("multipart/form-data")
                        .characterEncoding("UTF-8"));

        // then
        actions
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("updateUser: file만 수정")
    void updateUserUpdateOnlyFile() throws Exception {
        // given
        UserDto.Response response = getUserDtoResponse();

        given(userService.updateUser(any(UserDto.Update.class), any(MultipartFile.class))).willReturn(response);

        // when
        ResultActions actions = mvc.perform(
                multipart("/api/users/update")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType("multipart/form-data")
                        .characterEncoding("UTF-8"));

        // then
        actions
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("getUser: 정상 입력")
    void getUser() throws Exception {
        // given
        long userId = 1L;
        UserDto.Response response = getUserDtoResponse();
        String accessToken = helper.getAccessToken("test@email.com", List.of("USER"));

        given(userService.getUser(anyLong())).willReturn(response);

        // when
        ResultActions actions = mvc.perform(
                get("/api/users/{userId}", userId)
                        .header("Authorization", "Bearer " + accessToken)
                        .accept(MediaType.APPLICATION_JSON));

        // then
        actions
                .andExpect(status().isOk())
                .andDo(document("get-user",
                        getRequestPreprocessor(),
                        getResponsePreprocessor(),
                        getPathParametersUserId(),
                        getResponseFieldsUserDtoResponse()));

    }

    @Test
    @DisplayName("deleteUser: 정상 입력")
    void deleteUser() throws Exception {
        // given
        doNothing().when(userService).deleteUser();

        // when
        ResultActions actions = mvc.perform(
                delete("/api/users"));

        // then
        actions
                .andExpect(status().isNoContent())
                .andDo(document("delete-User"));
    }
}