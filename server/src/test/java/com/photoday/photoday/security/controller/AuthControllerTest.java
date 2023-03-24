package com.photoday.photoday.security.controller;

import com.photoday.photoday.helper.security.SecurityTestHelper;
import com.photoday.photoday.security.redis.service.RedisService;
import com.photoday.photoday.user.entity.User;
import com.photoday.photoday.user.repository.UserRepository;
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

import javax.servlet.http.Cookie;
import java.util.List;
import java.util.Optional;

import static com.photoday.photoday.helper.snippets.RestDocsSnippets.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
@AutoConfigureMockMvc
class AuthControllerTest {

    @Autowired
    private MockMvc mvc;
    @Autowired
    private SecurityTestHelper securityTestHelper;
    @MockBean
    private RedisService redisService;
    @MockBean
    private UserRepository userRepository;

    @Test
    @DisplayName("reissue: 정상 입력")
    void reissue() throws Exception {
        // given
        String refreshToken = securityTestHelper.getRefreshToken("user@email.com");
        User user = User.builder()
                .email("user@email.com")
                .roles(List.of("USER"))
                .build();
        Cookie cookie = new Cookie("Refresh", refreshToken);

        given(redisService.getValues(anyString())).willReturn(refreshToken);
        given(userRepository.findByEmail(anyString())).willReturn(Optional.of(user));


        // when
        ResultActions actions = mvc.perform(
                get("/api/auth/reissue")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .cookie(cookie));

        // then
        actions
                .andExpect(status().isOk())
                .andDo(document("reissue",
                        getRequestPreprocessor(),
                        getResponsePreprocessor(),
                        getResponseHeadersAccessToken()));
    }

    @Test
    void logout() {
    }

    @Test
    void setNewPassword() {
    }
}