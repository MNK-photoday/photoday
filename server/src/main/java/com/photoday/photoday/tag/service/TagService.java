package com.photoday.photoday.tag.service;

import com.photoday.photoday.dto.MultiResponseDto;
import com.photoday.photoday.tag.dto.TagDto;
import com.photoday.photoday.tag.entity.Tag;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;

public interface TagService {
    MultiResponseDto searchByTags(@RequestBody @Valid TagDto tags, Pageable pageable);

    Tag verifyTag(Tag tag);
}