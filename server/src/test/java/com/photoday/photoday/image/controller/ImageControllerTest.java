package com.photoday.photoday.image.controller;

import com.photoday.photoday.dto.MultiResponseDto;
import com.photoday.photoday.image.dto.ImageDto;
import com.photoday.photoday.image.mapper.ImageMapper;
import com.photoday.photoday.image.service.ImageService;
import com.photoday.photoday.tag.dto.TagDto;
import com.photoday.photoday.tag.mapper.TagMapper;
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
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.util.MultiValueMap;
import org.springframework.web.multipart.MultipartFile;

import static com.photoday.photoday.snippets.RestDocsSnippets.*;
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
class ImageControllerTest {
    @Autowired
    private MockMvc mvc;
    @MockBean
    ImageService imageService;
    @MockBean
    ImageMapper imageMapper;
    @MockBean
    TagMapper tagMapper;

    @Test
    @DisplayName("postImage: 정상 입력")
    void createImage() throws Exception {
        // given
        String post = getTagDto();
        ImageDto.Response response = getImageDtoResponse();
        MockMultipartFile content = getMockMultipartFile("post", post);

        given(imageService.createImage(any(TagDto.class), any(MultipartFile.class))).willReturn(response);

        // when
        ResultActions actions =
                mvc.perform(multipart("/api/images")
                        .file("file", "example".getBytes())
                        .file(content)
                        .contentType("multipart/form-data")
                        .characterEncoding("UTF-8"));

        // then
        actions
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(document("create-Image",
                        getRequestPreprocessor(),
                        getResponsePreprocessor(),
                        getRequestPartPostImage(),
                        getResponseFieldsImageDtoResponse()));
    }

    @Test
    @DisplayName("patchImage: 정상 입력")
    void update() throws Exception {
        // given
        long imageId = 1L;
        String content = getTagDto();
        ImageDto.Response response = getImageDtoResponse();

        given(imageService.updateImageTags(anyLong(), any(TagDto.class))).willReturn(response);

        // when
        ResultActions actions = mvc.perform(
                patch("/api/images/{imageId}", imageId)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content));

        // then
        actions
                .andExpect(status().isOk())
                .andDo(document("update-image",
                        getRequestPreprocessor(),
                        getResponsePreprocessor(),
                        getPathParameterImageId(),
                        getRequestFieldsTagDto(),
                        getResponseFieldsImageDtoResponse()));
    }

    @Test
    @DisplayName("getImage: 정상입력")
    void getImage() throws Exception {
        // given
        long imageId = 1L;
        ImageDto.Response response = getImageDtoResponse();

        given(imageService.getImage(anyLong())).willReturn(response);

        // when
        ResultActions actions = mvc.perform(
                get("/api/images/{imageId}", imageId)
                        .contentType(MediaType.APPLICATION_JSON));


        // then
        actions
                .andExpect(status().isOk())
                .andDo(document("get-image",
                        getRequestPreprocessor(),
                        getResponsePreprocessor(),
                        getPathParameterImageId(),
                        getResponseFieldsImageDtoResponse()));
    }

    @Test
    @DisplayName("deleteImage: 정상 입력")
    void deleteImage() throws Exception {
        // given
        long imageId = 1L;
        doNothing().when(imageService).deleteImage(anyLong());

        // when
        ResultActions actions = mvc.perform(
                delete("/api/images/{imageId}", imageId));

        // then
        actions
                .andExpect(status().isNoContent())
                .andDo(document("delete-Image",
                        getPathParameterImageId()));

    }

    @Test
    @DisplayName("updateBookmark: 정상 입력")
    void updateBookmark() throws Exception {
        // given
        long imageId = 1L;
        ImageDto.Response response = getImageDtoResponse();

        given(imageService.updateBookmark(anyLong())).willReturn(response);

        // when
        ResultActions actions = mvc.perform(
                patch("/api/images/{imageId}/bookmarks", imageId)
                        .contentType(MediaType.APPLICATION_JSON));


        // then
        actions
                .andExpect(status().isOk())
                .andDo(document("update-bookmark",
                        getRequestPreprocessor(),
                        getResponsePreprocessor(),
                        getPathParameterImageId(),
                        getResponseFieldsImageDtoResponse()));
    }

    @Test
    @DisplayName("getBookmarkImages: 정상 입력")
    void getBookmarkImages() throws Exception {
        // given
        MultiValueMap<String, String> params = getParams("createAt,desc");
        MultiResponseDto<?> response = getMultiResponseDtoBookMarkAndSearchResponse();

        given(imageService.getBookmarkImages(any(Pageable.class))).willReturn(response);

        // when
        ResultActions actions = mvc.perform(
                get("/api/images/bookmarks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .queryParams(params));

        // then
        actions
                .andExpect(status().isOk())
                .andDo(document("get-bookmark-images",
                        getRequestPreprocessor(),
                        getResponsePreprocessor(),
                        getRequestParameterImageDtoBookmarkAndSearchResponse(),
                        getResponseFieldsImageDtoBookmarkAndSearchResponse()));
    }

    @Test
    @DisplayName("createReport: 정상 입력")
    void createReport() throws Exception {
        // given
        long imageId = 1L;
        ImageDto.Response response = getImageDtoResponse();

        given(imageService.createReport(anyLong())).willReturn(response);

        // when
        ResultActions actions = mvc.perform(
                post("/api/images/{imageId}/reports", imageId)
                        .contentType(MediaType.APPLICATION_JSON));

        // then
        actions
                .andExpect(status().isOk())
                .andDo(document("report-post",
                        getRequestPreprocessor(),
                        getResponsePreprocessor(),
                        getPathParameterImageId(),
                        getResponseFieldsImageDtoResponse()));
    }

    @Test
    @DisplayName("updateLike: 정상 입력")
    void updateLike() throws Exception {
        // given
        long imageId = 1L;
        ImageDto.Response response = getImageDtoResponse();

        given(imageService.updateLike(anyLong())).willReturn(response);

        // when
        ResultActions actions = mvc.perform(
                patch("/api/images/{imageId}/likes", imageId)
                        .contentType(MediaType.APPLICATION_JSON));

        // then
        actions
                .andExpect(status().isOk())
                .andDo(document("patch-likes",
                        getRequestPreprocessor(),
                        getResponsePreprocessor(),
                        getPathParameterImageId(),
                        getResponseFieldsImageDtoResponse()));
    }

}