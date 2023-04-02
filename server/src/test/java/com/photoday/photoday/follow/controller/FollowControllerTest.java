package com.photoday.photoday.follow.controller;

import com.photoday.photoday.follow.dto.FollowDto;
import com.photoday.photoday.follow.mapper.FollowMapper;
import com.photoday.photoday.follow.service.FollowService;
import com.photoday.photoday.helper.security.SecurityTestHelper;
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
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.List;

import static com.photoday.photoday.helper.snippets.RestDocsSnippets.*;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.patch;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
@AutoConfigureMockMvc
class FollowControllerTest {
    @Autowired
    private MockMvc mvc;
    @Autowired
    private SecurityTestHelper helper;
    @MockBean
    FollowService followService;
    @MockBean
    FollowMapper followMapper;
    @MockBean
    UserService userService;

    @Test
    @DisplayName("getFollowUsers: 정상 입력")
    void getFollowUsers() throws Exception {
        // given
        long userId = 1L;
        FollowDto.ResponseFollowUsers response = getFollowDtoResponseFollowUsers();

        given(followService.findFollowUser(anyLong())).willReturn(response);

        // when
        ResultActions actions = mvc.perform(
                get("/api/follows/{userId}", userId)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON));

        // then
        actions
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(document("get-follow-users",
                        getRequestPreprocessor(),
                        getResponsePreprocessor(),
                        getResponseFieldsFollowDtoResponseFollowUsers()));
    }


    @Test
    @DisplayName("patch-followingUser: 정상 입력")
    void followingUser() throws Exception {
        // given
        long followingId = 1L;
        FollowDto.ResponseFollowUsers response = getFollowDtoResponseFollowUsers();
        String accessToken = helper.getAccessToken("test@email.com", List.of("USER"));

        given(followService.registerFollowUser(anyLong())).willReturn(response);

        // when
        ResultActions actions = mvc.perform(
                patch("/api/follows/{followingId}", followingId)
                        .header("Authorization", "Bearer " + accessToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON));

        // then
        actions
                .andExpect(status().isOk())
                .andDo(document("patch-following-user",
                        getRequestPreprocessor(),
                        getResponsePreprocessor(),
                        getPathParametersFollowingId(),
                        getResponseFieldsFollowDtoResponseFollowUsers()));
    }

}