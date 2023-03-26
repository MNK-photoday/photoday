package com.photoday.photoday.helper.snippets;

import com.google.gson.Gson;
import com.photoday.photoday.dto.MultiResponseDto;
import com.photoday.photoday.follow.dto.FollowDto;
import com.photoday.photoday.image.dto.ImageDto;
import com.photoday.photoday.tag.dto.TagDto;
import com.photoday.photoday.user.dto.UserDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.restdocs.headers.RequestHeadersSnippet;
import org.springframework.restdocs.headers.ResponseHeadersSnippet;
import org.springframework.restdocs.operation.preprocess.OperationRequestPreprocessor;
import org.springframework.restdocs.operation.preprocess.OperationResponsePreprocessor;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.restdocs.payload.RequestFieldsSnippet;
import org.springframework.restdocs.payload.RequestPartFieldsSnippet;
import org.springframework.restdocs.payload.ResponseFieldsSnippet;
import org.springframework.restdocs.request.PathParametersSnippet;
import org.springframework.restdocs.request.RequestParametersSnippet;
import org.springframework.restdocs.request.RequestPartsSnippet;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.springframework.restdocs.headers.HeaderDocumentation.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;

public class RestDocsSnippets {

    private static final Gson gson = new Gson();

    public static OperationRequestPreprocessor getRequestPreprocessor() {
        return preprocessRequest(prettyPrint());
    }

    public static OperationResponsePreprocessor getResponsePreprocessor() {
        return preprocessResponse(prettyPrint());
    }

    public static String getPostUserJsonBody(String email, String password) {
        UserDto.Post post = new UserDto.Post(email, password);
        return gson.toJson(post);
    }

    public static String getUpdateUserJsonBody(String description) {
        UserDto.Update patch = new UserDto.Update(description);
        return gson.toJson(patch);
    }

    public static UserDto.Response getUserDtoResponse() {
        return new UserDto.Response(1L, "짱구", "http://profile-url.jpg", "짱구입니다.",
                0, 0, 0, 0, false, false, false);
    }

    public static String getTagDto() {
        List<String> names = new ArrayList<>(List.of("background", "blue"));
        TagDto tags = new TagDto(names);
        return gson.toJson(tags);
    }

    public static ImageDto.Response getImageDtoResponse() {
        return ImageDto.Response.builder()
                .imageId(1L)
                .owner(getUserDtoResponse())
                .imageUrl("http://image-url.jpg")
                .tags(List.of("background", "blue"))
                .createdAt(LocalDateTime.now())
                .build();
    }

    public static MockMultipartFile getMockMultipartFile(String name, String userUpdateDto) {
        return new MockMultipartFile(name, "", "application/json", userUpdateDto.getBytes());
    }

    public static MultiValueMap<String, String> getParams(String sort) {
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("page", "1");
        params.add("size", "12");
        params.add("sort", sort);
        return params;
    }

    public static RequestFieldsSnippet getRequestFieldsUserDtoPost() {
        return requestFields(
                fieldWithPath("email").type(JsonFieldType.STRING).description("이메일"),
                fieldWithPath("password").type(JsonFieldType.STRING).description("비밀번호")
        );
    }

    public static RequestFieldsSnippet getRequestFieldsLoginDto() {
        return requestFields(
                fieldWithPath("email").type(JsonFieldType.STRING).description("이메일"),
                fieldWithPath("password").type(JsonFieldType.STRING).description("비밀번호")
        );
    }

    public static RequestFieldsSnippet getRequestFieldsTagDto() {
        return requestFields(
                fieldWithPath("tags").type(JsonFieldType.ARRAY).description("태그 데이터")
        );
    }

    public static PathParametersSnippet getPathParametersUserId() {
        return pathParameters(
                parameterWithName("userId").description("회원 식별자")
        );
    }

    public static PathParametersSnippet getPathParameterImageId() {
        return pathParameters(
                parameterWithName("imageId").description("이미지 식별자")
        );
    }

    public static PathParametersSnippet getPathParametersFollowingId() {
        return pathParameters(
                parameterWithName("followingId").description("팔로우 대상 식별자")
        );
    }

    public static RequestParametersSnippet getRequestParametersEmail() {
        return requestParameters(
                parameterWithName("email").description("재발급 받을 아이디, 재발급 받을 이메일")
        );
    }

    public static RequestPartFieldsSnippet getRequestPartFieldUpdateUser() {
        return requestPartFields(
                "userUpdateDto",
                fieldWithPath("password").type(JsonFieldType.STRING).description("비밀번호").optional(),
                fieldWithPath("description").type(JsonFieldType.STRING).description("자기소개").optional()
        );
    }

    public static RequestPartsSnippet getRequestPartPostImage() {
        return requestParts(
                partWithName("file").description("등록할 이미지 파일"),
                partWithName("post").description("태그 입력 폼 / JSON 형식")
        );
    }

    public static RequestPartsSnippet getResponsePartUpdateUser() {
        return requestParts(
                partWithName("file").description("변경할 프로필 이미지").optional(),
                partWithName("userUpdateDto").description("유저 업데이트 내용 폼 / JSON 형식").optional()
        );
    }

    public static FollowDto.ResponseFollowUsers getFollowDtoResponseFollowUsers() {
        FollowDto.ResponseFollowingUserData followingUserData = new FollowDto.ResponseFollowingUserData(3L, "흰둥이", "http://흰둥이이미지.jpg", false);
        FollowDto.ResponseFollowerUserData followerUserData = new FollowDto.ResponseFollowerUserData(2L, "신형만", "http://신형만이미지.jpg", false);
        return new FollowDto.ResponseFollowUsers(List.of(followingUserData), List.of(followerUserData), 1, 1);
    }

    public static MultiResponseDto getMultiResponseDtoPageResponse() {
        ImageDto.PageResponse responseDto = new ImageDto.PageResponse(1L, "http://image.jpg", false, false);
        Page<ImageDto.PageResponse> page = new PageImpl<>(List.of(responseDto), PageRequest.of(0, 12), 1324);
        List<ImageDto.PageResponse> content = page.getContent();
        return new MultiResponseDto<>(content, page);
    }

    public static RequestHeadersSnippet getRequestHeadersAccessToken() {
        return requestHeaders(
                headerWithName(HttpHeaders.AUTHORIZATION).description("access-token. jwt 액세스 토큰")
        );
    }

    public static RequestParametersSnippet getRequestParameterImageDtoBookmarkAndSearchResponse() {
        return requestParameters(
                parameterWithName("page").description("페이지 번호"),
                parameterWithName("size").description("페이지 별 이미지 수"),
                parameterWithName("sort").description("정렬 기준: ")
        );
    }

    public static RequestParametersSnippet getRequestParametersSearchByTags() {
        return requestParameters(
                parameterWithName("tags").description("검색할 태그 목록"),
                parameterWithName("page").description("페이지 번호"),
                parameterWithName("size").description("페이지 별 이미지 수"),
                parameterWithName("sort").description("정렬 기준: ")
        );
    }

    public static ResponseHeadersSnippet getResponseHeadersLocation() {
        return responseHeaders(
                headerWithName(HttpHeaders.LOCATION).description("Location header. 등록된 리소스의 URI")
        );
    }

    public static ResponseHeadersSnippet getResponseHeadersAccessToken() {
        return responseHeaders(
                headerWithName(HttpHeaders.AUTHORIZATION).description("access-token. jwt 액세스 토큰")
        );
    }

    public static ResponseFieldsSnippet getResponseFieldsUserDtoResponse() {
        return responseFields(
                fieldWithPath("data").type(JsonFieldType.OBJECT).description("결과 데이터"),
                fieldWithPath("data.userId").type(JsonFieldType.NUMBER).description("유저 식별자"),
                fieldWithPath("data.name").type(JsonFieldType.STRING).description("유저 닉네임"),
                fieldWithPath("data.profileImageUrl").type(JsonFieldType.STRING).description("유저 프로필 이미지"),
                fieldWithPath("data.description").type(JsonFieldType.STRING).description("유저 짧은 소개"),
                fieldWithPath("data.likeCount").type(JsonFieldType.NUMBER).description("받은 좋아요 수"),
                fieldWithPath("data.reportCount").type(JsonFieldType.NUMBER).description("받은 신고 수"),
                fieldWithPath("data.followerCount").type(JsonFieldType.NUMBER).description("좋아요 받은 수"),
                fieldWithPath("data.followingCount").type(JsonFieldType.NUMBER).description("좋아요 누른 수"),
                fieldWithPath("data.checkFollow").type(JsonFieldType.BOOLEAN).description("follow 누른 유저인지 여부"),
                fieldWithPath("data.myPage").type(JsonFieldType.BOOLEAN).description("본인 페이지 인지 여부"),
                fieldWithPath("data.checkAdmin").type(JsonFieldType.BOOLEAN).description("로그인 유저가 관리자인지 여부")
        );
    }

    public static ResponseFieldsSnippet getResponseFieldsImageDtoResponse() {
        return responseFields(
                fieldWithPath("data").type(JsonFieldType.OBJECT).description("결과 데이터"),
                fieldWithPath("data.imageId").type(JsonFieldType.NUMBER).description("이미지 식별자"),
                fieldWithPath("data.owner").type(JsonFieldType.OBJECT).description("이미지 등록한 유저 데이터"),
                fieldWithPath("data.owner.userId").type(JsonFieldType.NUMBER).description("이미지 등록한 유저 식별자"),
                fieldWithPath("data.owner.name").type(JsonFieldType.STRING).description("이미지 등록한 유저 닉네임"),
                fieldWithPath("data.owner.profileImageUrl").type(JsonFieldType.STRING).description("이미지 등록한 유저 프로필 이미지"),
                fieldWithPath("data.owner.description").type(JsonFieldType.STRING).description("이미지 등록한 유저 자기 소개"),
                fieldWithPath("data.owner.likeCount").type(JsonFieldType.NUMBER).description("이미지 등록한 유저 좋아요 받은 수"),
                fieldWithPath("data.owner.reportCount").type(JsonFieldType.NUMBER).description("이미지 등록한 유저 신고 받은 수"),
                fieldWithPath("data.owner.followerCount").type(JsonFieldType.NUMBER).description("이미지 등록한 유저 팔로우 받은 수"),
                fieldWithPath("data.owner.followingCount").type(JsonFieldType.NUMBER).description("이미지 등록한 유저 팔로우 하는 수"),
                fieldWithPath("data.owner.checkFollow").type(JsonFieldType.BOOLEAN).description("이미지 등록한 유저 팔로우헀는지 여부(본인인 경우 false)"),
                fieldWithPath("data.owner.myPage").type(JsonFieldType.BOOLEAN).description("ㅇㅇ"),
                fieldWithPath("data.owner.checkAdmin").type(JsonFieldType.BOOLEAN).description("이미지 등록한 유저 팔로우헀는지 여부(본인인 경우 false)"),
                fieldWithPath("data.imageUrl").type(JsonFieldType.STRING).description("이미지 Url"),
                fieldWithPath("data.like").type(JsonFieldType.BOOLEAN).description("현재 유저의 이미지 좋아요 여부"),
                fieldWithPath("data.likeCount").type(JsonFieldType.NUMBER).description("이미지 좋아요 받은 수"),
                fieldWithPath("data.report").type(JsonFieldType.BOOLEAN).description("현재 유저의 이미지 신고 여부"),
                fieldWithPath("data.reportCount").type(JsonFieldType.NUMBER).description("이미지 신고 받은 수"),
                fieldWithPath("data.bookmark").type(JsonFieldType.BOOLEAN).description("현재 유저의 이미지 북마크 여부"),
                fieldWithPath("data.viewCount").type(JsonFieldType.NUMBER).description("이미지 조회수"),
                fieldWithPath("data.tags").type(JsonFieldType.ARRAY).description("이미지 태그 목록"),
                fieldWithPath("data.createdAt").type(JsonFieldType.STRING).description("이미지 생성 날자")
        );
    }

    public static ResponseFieldsSnippet getResponseFieldsFollowDtoResponseFollowUsers() {
        return responseFields(
                fieldWithPath("data").type(JsonFieldType.OBJECT).description("결과 데이터"),
                fieldWithPath("data.userFollowing").type(JsonFieldType.ARRAY).description("현재 유저가 팔로우 하는 유저 목록"),
                fieldWithPath("data.userFollowing[].userId").type(JsonFieldType.NUMBER).description("현재 유저가 팔로우 하는 유저의 식별자"),
                fieldWithPath("data.userFollowing[].name").type(JsonFieldType.STRING).description("현재 유저가 팔로우 하는 유저의 닉네임"),
                fieldWithPath("data.userFollowing[].userProfileImage").type(JsonFieldType.STRING).description("현재 유저가 팔로우 하는 유저의 프로필 이미지"),
                fieldWithPath("data.userFollowing[].checkFollow").type(JsonFieldType.BOOLEAN).description("현재 유저가 팔로우하는 유저를 팔로우 하는지 여부"),
                fieldWithPath("data.userFollower").type(JsonFieldType.ARRAY).description("현재 유저를 팔로우 하는 유저 목록"),
                fieldWithPath("data.userFollower[].userId").type(JsonFieldType.NUMBER).description("현재 유저를 팔로우 하는 유저의 식별자"),
                fieldWithPath("data.userFollower[].name").type(JsonFieldType.STRING).description("현재 유저를 팔로우 하는 유저의 이름"),
                fieldWithPath("data.userFollower[].userProfileImage").type(JsonFieldType.STRING).description("현재 유저를 팔로우 하는 유저의 프로필 이미지"),
                fieldWithPath("data.userFollower[].checkFollow").type(JsonFieldType.BOOLEAN).description("현재 유저의 팔로워를 팔로우 하는지 여부"),
                fieldWithPath("data.userFollowingCount").type(JsonFieldType.NUMBER).description("현재 유저가 팔로우 하는 유저의 수"),
                fieldWithPath("data.userFollowerCount").type(JsonFieldType.NUMBER).description("현재 유저를 팔로우 하는 유저의 수 ")
        );
    }

    public static ResponseFieldsSnippet getResponseFieldsImageDtoBookmarkAndSearchResponse() {
        return responseFields(
                fieldWithPath("data").type(JsonFieldType.ARRAY).description("결과 데이터"),
                fieldWithPath("data[].imageId").type(JsonFieldType.NUMBER).description("이미지 식별자"),
                fieldWithPath("data[].imageUrl").type(JsonFieldType.STRING).description("이미지 URL"),
                fieldWithPath("data[].like").type(JsonFieldType.BOOLEAN).description("현재 유저의 이미지 좋아요 여부"),
                fieldWithPath("data[].bookmark").type(JsonFieldType.BOOLEAN).description("현재 유저의 이미지 북마크 여부"),
                fieldWithPath("pageInfo").type(JsonFieldType.OBJECT).description("페이징 데이터"),
                fieldWithPath("pageInfo.pageNumber").type(JsonFieldType.NUMBER).description("페이지 번호"),
                fieldWithPath("pageInfo.size").type(JsonFieldType.NUMBER).description("페이지 별 이미지 수"),
                fieldWithPath("pageInfo.totalPages").type(JsonFieldType.NUMBER).description("검색된 페이지 수"),
                fieldWithPath("pageInfo.totalElements").type(JsonFieldType.NUMBER).description("검색된 이미지 수")
        );
    }

}
