package com.photoday.photoday.tag.controller;

import com.photoday.photoday.dto.MultiResponseDto;
import com.photoday.photoday.dto.PageInfo;
import com.photoday.photoday.image.dto.ImageDto;
import com.photoday.photoday.image.entity.Image;
import com.photoday.photoday.tag.dto.TagDto;
import com.photoday.photoday.user.dto.UserDto;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/tags")
public class TagController {
    private String imageUrl = "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTAzMjJfOTQg%2FMDAxNjE2NDA2MDcyNzY3.nb3pBLtRRcORiPmEk52fFSXHoAdIsBwcE76XfXUdZi4g.w9jHhZMztKRvq8FEAqKbLoPxUnpwmYMHFwNKrmOpftQg.JPEG.yomian%2F1616406049173.jpg&type=a340";
    private String profileUrl = "https://i.pinimg.com/236x/56/cc/80/56cc80ea80aff65bc09c7967b993821c.jpg";
    private List<String> getTags() {
        List<String> tags = new ArrayList<>();
        tags.add("선생님");
        tags.add("안녕하세요");
        return tags;
    }
    LocalDateTime now = LocalDateTime.now();

    UserDto.Response owner = new UserDto.Response(1L, "박진영", profileUrl, "잘 부탁드립니다.", 0, 0,10,40);

    ImageDto.Response response = ImageDto.Response.builder()
            .imageId(1L)
            .imageUrl(imageUrl)
            .tags(getTags())
            .viewCount(10)
            .likeCount(300)
            .owner(owner)
            .reportCount(0)
            .createdAt(now)
            .build();
    List<ImageDto.Response> responses = new ArrayList<>();

    PageImpl page = new PageImpl(List.of(new Image()));
    PageInfo pageInfo = new PageInfo(page);

    @GetMapping
    public ResponseEntity getTags(@RequestBody @Valid TagDto.Get tags,
                                  Pageable pageable) {
        responses.add(response);
        return new ResponseEntity(new MultiResponseDto(responses, pageInfo), HttpStatus.OK);
    }
}
