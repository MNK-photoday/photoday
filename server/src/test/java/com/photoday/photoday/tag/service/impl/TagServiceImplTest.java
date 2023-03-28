package com.photoday.photoday.tag.service.impl;

import com.photoday.photoday.image.dto.ImageDto;
import com.photoday.photoday.image.entity.Image;
import com.photoday.photoday.image.mapper.ImageMapper;
import com.photoday.photoday.image.repository.ImageRepository;
import com.photoday.photoday.tag.repository.TagRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static com.photoday.photoday.helper.snippets.RestDocsSnippets.getImageDtoPageResponse;
import static com.photoday.photoday.helper.snippets.RestDocsSnippets.getMockPageImage;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.BDDMockito.given;

@ExtendWith(SpringExtension.class)
class TagServiceImplTest {
    @Mock
    ImageRepository imageRepository;
    @Mock
    TagRepository tagRepository;
    @Mock
    ImageMapper imageMapper;
    @InjectMocks
    TagServiceImpl tagService;

    @Test
    @DisplayName("searchByTags: 정상 입력")
    void searchByTags() {
        // given
        String tags = "background, blue";
        Pageable pageable = PageRequest.of(1, 5);
        Page<Image> page = getMockPageImage(pageable);
        ImageDto.PageResponse response = getImageDtoPageResponse();

        given(imageRepository.findAllByTag(anyList(), any(Pageable.class))).willReturn(page);
        given(imageMapper.imageToPageResponse(any(Image.class))).willReturn(response);

        // when
        tagService.searchByTags(tags, pageable);
    }

}