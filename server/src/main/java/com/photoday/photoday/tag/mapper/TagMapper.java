package com.photoday.photoday.tag.mapper;

import com.photoday.photoday.image.entity.ImageTag;
import com.photoday.photoday.tag.dto.TagDto;
import com.photoday.photoday.tag.entity.Tag;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface TagMapper {

    default List<Tag> dtoToTag(TagDto post) {
        return post.getNames().stream()
                .map(this::getTag)
                .collect(Collectors.toList());
    }

    default Tag getTag(String name) {
        Tag tag = new Tag();
        tag.setName(name);
        return tag;
    }
}
