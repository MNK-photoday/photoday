package com.photoday.photoday.tag.service;

import com.photoday.photoday.dto.MultiResponseDto;
import com.photoday.photoday.tag.entity.Tag;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestParam;

public interface TagService {
    MultiResponseDto searchByTags(@RequestParam String tags, Pageable pageable);

    Tag verifyTag(Tag tag);
}
