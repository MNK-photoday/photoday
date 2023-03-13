package com.photoday.photoday.tag.service;

import com.photoday.photoday.image.entity.Image;
import com.photoday.photoday.image.repository.ImageRepository;
import com.photoday.photoday.tag.dto.TagDto;
import com.photoday.photoday.tag.entity.Tag;
import com.photoday.photoday.tag.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class TagService {
    private final ImageRepository imageRepository;
    private final TagRepository tagRepository;

    public Page<Image> searchByTags(TagDto tags, Pageable pageable){
        Pageable pageRequest = PageRequest.of(pageable.getPageNumber()-1, pageable.getPageSize(), pageable.getSort());
        return imageRepository.findAllByTag(tags, pageRequest);
    }

    public Tag verifyTag(Tag tag) {
        Optional<Tag> optionalTag = tagRepository.findByName(tag.getName());
        Tag verifiedTag;
        if (optionalTag.isEmpty()) {
            verifiedTag = tagRepository.save(tag);
        } else {
            verifiedTag = optionalTag.get();
        }
        return verifiedTag;
    }
}
