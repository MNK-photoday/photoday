package com.photoday.photoday.exception;

import com.photoday.photoday.helper.security.SecurityTestHelper;
import com.photoday.photoday.user.service.UserService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.List;

import static com.photoday.photoday.helper.snippets.RestDocsSnippets.*;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class ExceptionTest {
    @Autowired
    SecurityTestHelper helper;
    @Autowired
    MockMvc mvc;
    @MockBean
    UserService userService;

    @Test
    @DisplayName("CustomException")
    void customException() throws Exception {
        // given
        String content = getTagDto();
        String accessToken = helper.getAccessToken("test@email.com", List.of("USER"));
        // when
        ResultActions actions = mvc.perform(
                patch("/api/images/10")
                        .header("Authorization", "Bearer " + accessToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content));

        // then
        actions.andDo(print())
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("MethodArgumentNotValidException")
    void methodArgumentNotValidException() throws Exception {
        // given
        String content = getWrongTagDto();
        String accessToken = helper.getAccessToken("test@email.com", List.of("USER"));
        // when
        ResultActions actions = mvc.perform(
                patch("/api/images/10")
                        .header("Authorization", "Bearer " + accessToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content));

        // then
        actions.andDo(print())
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("HttpRequestMethodNotSupportedException")
    void httpRequestMethodNotSupportedException() throws Exception {
        // given
        String content = getTagDto();
        String accessToken = helper.getAccessToken("test@email.com", List.of("USER"));
        // when
        ResultActions actions = mvc.perform(
                patch("/api/images")
                        .header("Authorization", "Bearer " + accessToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content));

        // then
        actions.andDo(print())
                .andExpect(status().isMethodNotAllowed());
    }

    @Test
    @DisplayName("MethodArgumentTypeMismatchException")
    void methodArgumentTypeMismatchException() throws Exception {
        // given
        String content = getTagDto();
        String accessToken = helper.getAccessToken("test@email.com", List.of("USER"));
        // when
        ResultActions actions = mvc.perform(
                patch("/api/images/s")
                        .header("Authorization", "Bearer " + accessToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content));

        // then
        actions.andDo(print())
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("MissingServletRequestPartException")
    void missingServletRequestPartException() throws Exception {
        // given
        String post = getTagDto();
        MockMultipartFile content = getMockMultipartFile("post", post);
        String accessToken = helper.getAccessToken("test@email.com", List.of("USER"));

        // when
        ResultActions actions =
                mvc.perform(multipart("/api/images")
                        .file(content)
                        .header("Authorization", "Bearer " + accessToken)
                        .contentType("multipart/form-data")
                        .characterEncoding("UTF-8"));

        // then
        actions.andDo(print())
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("MissingServletRequestParameterException")
    void missingServletRequestParameterException() throws Exception {
        // given
        String accessToken = helper.getAccessToken("test@email.com", List.of("USER"));

        // when
        ResultActions actions = mvc.perform(
                get("/api/images/bookmarks")
                        .header("Authorization", "Bearer " + accessToken)
                        .contentType(MediaType.APPLICATION_JSON));

        // then
        actions.andDo(print())
                .andExpect(status().isNotFound());
    }
    @Test
    @DisplayName("ConstraintViolationException")
    void constraintViolationException() throws Exception {
        // given
        String content = getTagDto();
        String accessToken = helper.getAccessToken("test@email.com", List.of("USER"));
        // when
        ResultActions actions = mvc.perform(
                patch("/api/images/0")
                        .header("Authorization", "Bearer " + accessToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content));

        // then
        actions.andDo(print())
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("Exception: body missing")
    void exception() throws Exception {
        // given
        String accessToken = helper.getAccessToken("test@email.com", List.of("USER"));
        // when
        ResultActions actions = mvc.perform(
                patch("/api/images/0")
                        .header("Authorization", "Bearer " + accessToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON));

        // then
        actions.andDo(print())
                .andExpect(status().isBadRequest());
    }

}
