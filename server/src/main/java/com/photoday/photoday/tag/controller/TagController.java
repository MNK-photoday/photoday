package com.photoday.photoday.tag.controller;

import com.photoday.photoday.dto.MultiResponseDto;
import com.photoday.photoday.image.entity.Image;
import com.photoday.photoday.tag.dto.TagDto;
import com.photoday.photoday.tag.service.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/tags")
@RequiredArgsConstructor
public class TagController {
    private final TagService tagService;
    @GetMapping
    public ResponseEntity searchByTags(@RequestBody @Valid TagDto tags, Pageable pageable) {
        Page<Image> imagePage = tagService.searchByTags(tags, pageable);
        List<Image> imageList = imagePage.getContent();
        return new ResponseEntity(new MultiResponseDto(imageList, imagePage), HttpStatus.OK);
    }
}
