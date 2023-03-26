package com.photoday.photoday.tag.mapper;

import com.photoday.photoday.tag.dto.TagDto;
import com.photoday.photoday.tag.entity.Tag;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class TagMapper {
    public List<Tag> dtoToTag(TagDto post) {
        return post.getTags().stream()
                .map(this::getTag)
                .collect(Collectors.toList());
    }

    public Tag getTag(String name) {
        Tag tag = new Tag(); //TODO 빌더로 통일
        tag.setName(name);
        return tag;
    }
}
