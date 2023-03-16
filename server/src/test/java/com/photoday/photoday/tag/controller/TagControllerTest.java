package com.photoday.photoday.tag.controller;

import com.photoday.photoday.dto.MultiResponseDto;
import com.photoday.photoday.tag.dto.TagDto;
import com.photoday.photoday.tag.service.TagService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.util.MultiValueMap;

import static com.photoday.photoday.snippets.RestDocsSnippets.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
@AutoConfigureMockMvc
class TagControllerTest {
    @Autowired
    private MockMvc mvc;
    @MockBean
    private TagService tagService;

    @Test
    @DisplayName("searchByTags: 정상 입력")
    void searchByTags() throws Exception {
        // given
        String content = getTagDto();
        MultiValueMap<String, String> params = getParams("createdAt,desc");
        MultiResponseDto<?> response = getMultiResponseDtoBookMarkAndSearchResponse();

        given(tagService.searchByTags(any(TagDto.class), any(Pageable.class))).willReturn(response);

        // when
        ResultActions actions = mvc.perform(
                get("/api/tags")
                        .params(params)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content));

        // then
        actions.andDo(print())
                .andExpect(status().isOk())
                .andDo(document("get-search-tags",
                        getRequestPreprocessor(),
                        getResponsePreprocessor(),
                        getRequestFieldsTagDto(),
                        getRequestParameterImageDtoBookmarkAndSearchResponse(),
                        getResponseFieldsImageDtoBookmarkAndSearchResponse()));
    }
}