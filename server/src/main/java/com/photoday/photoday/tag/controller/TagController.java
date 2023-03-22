package com.photoday.photoday.tag.controller;

import com.photoday.photoday.dto.MultiResponseDto;
import com.photoday.photoday.tag.dto.TagDto;
import com.photoday.photoday.tag.service.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/tags")
@RequiredArgsConstructor
public class TagController {
    private final TagService tagService;

    @PostMapping("/search")
    public ResponseEntity<?> searchByTags(@RequestBody @Valid TagDto tags, Pageable pageable) {
        MultiResponseDto<?> responseDto = tagService.searchByTags(tags, pageable);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }
}
