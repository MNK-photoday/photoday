package com.photoday.photoday.security.controller;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;

@SpringBootTest
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
@AutoConfigureMockMvc
class AuthControllerTest {

    @Test
    void reissue()  {
    }

    @Test
    void logout() {
    }

    @Test
    void setNewPassword() {
    }
}