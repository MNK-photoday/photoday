package com.photoday.photoday.security.controller;

import com.google.gson.Gson;
import com.photoday.photoday.security.dto.LoginDto;
import com.photoday.photoday.user.entity.User;
import com.photoday.photoday.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.List;

import static com.photoday.photoday.helper.snippets.RestDocsSnippets.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
@AutoConfigureMockMvc
public class LoginTest {
    @Autowired
    private MockMvc mvc;
    @Autowired
    private Gson gson;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @BeforeEach
    void clear() {
        userRepository.deleteAll();
    }

    @Test
    @DisplayName("login: 정상 작동")
    void login() throws Exception {
        // given
        String email = "user@email.com";
        String password = "123456!a";
        LoginDto loginDto = LoginDto.builder().email(email).password(password).build();
        String content = gson.toJson(loginDto);

        User user = User.builder().email(email).name("user").password(passwordEncoder.encode(password)).roles(List.of("USER")).build();
        userRepository.save(user);

        // when
        ResultActions actions = mvc.perform(
                post("/api/auth/login")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content));

        // then
        actions
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(document("login",
                        getRequestPreprocessor(),
                        getResponsePreprocessor(),
                        getRequestFieldsLoginDto(),
                        getResponseHeadersAccessToken()));
    }
}
