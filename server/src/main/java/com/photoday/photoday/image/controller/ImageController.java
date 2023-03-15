package com.photoday.photoday.image.controller;

import com.photoday.photoday.dto.MultiResponseDto;
import com.photoday.photoday.dto.SingleResponseDto;
import com.photoday.photoday.image.dto.ImageDto;
import com.photoday.photoday.image.entity.Image;
import com.photoday.photoday.image.mapper.ImageMapper;
import com.photoday.photoday.image.service.ImageService;
import com.photoday.photoday.tag.dto.TagDto;
import com.photoday.photoday.tag.entity.Tag;
import com.photoday.photoday.tag.mapper.TagMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/images")
@RequiredArgsConstructor
@Validated
public class ImageController {
    private final ImageService imageService;
    private final ImageMapper imageMapper;
    private final TagMapper tagMapper;

    @PostMapping
    public ResponseEntity createImage(@RequestPart TagDto post,
                                      @RequestPart(value = "file") MultipartFile multipartFile) throws IOException {
        Image image = imageService.createImage(tagMapper.dtoToTag(post), multipartFile);
        ImageDto.Response response = imageMapper.imageToResponse(image);
        return new ResponseEntity(new SingleResponseDto(response), HttpStatus.OK);
    }

    @PatchMapping("/{imageId}")
    public ResponseEntity update(@PathVariable Long imageId, @RequestBody @Valid TagDto patch) {
        List<Tag> tagList = tagMapper.dtoToTag(patch);
        Image image = imageService.modifyImageTags(imageId, tagList);
        ImageDto.Response response = imageMapper.imageToResponse(image);
        return new ResponseEntity(new SingleResponseDto(response), HttpStatus.OK);
    }

    @GetMapping("/{imageId}")
    public ResponseEntity getImage(@PathVariable Long imageId) {
        Image image = imageService.getImage(imageId);
        ImageDto.Response response = imageMapper.imageToResponse(image);
        return new ResponseEntity(new SingleResponseDto(response), HttpStatus.OK);
    }

    @DeleteMapping("/{imageId}")
    public ResponseEntity delete(@PathVariable Long imageId) {
        imageService.deleteImage(imageId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/{imageId}/bookmarks")
    public ResponseEntity updateBookmark(@PathVariable Long imageId) {
        Image image = imageService.updateBookmark(imageId);
        ImageDto.Response response = imageMapper.imageToResponse(image);
        return new ResponseEntity(new SingleResponseDto(response), HttpStatus.OK);
    }

    @GetMapping("/bookmarks")
    public ResponseEntity getBookmarkImages(Pageable pageable) {
        Page<Image> page = imageService.getBookmarkImages(pageable);
        List<Image> imageList = page.getContent();
        List<ImageDto.BookmarkAndSearchResponse> responses
                = imageList.stream().map(i -> imageMapper.imageToBookmarkAndSearchResponse(i)).collect(Collectors.toList());
        return new ResponseEntity<>(new MultiResponseDto(responses, page), HttpStatus.OK);
    }

    @PostMapping("/{imageId}/reports")
    public ResponseEntity createReport(@PathVariable Long imageId) {
        Image image = imageService.createReport(imageId);
        ImageDto.Response response = imageMapper.imageToResponse(image);
        return new ResponseEntity(new SingleResponseDto(response), HttpStatus.OK);
    }

    @PatchMapping("/{imageId}/likes")
    public ResponseEntity updateLike(@PathVariable Long imageId) {
        Image image = imageService.updateLike(imageId);
        ImageDto.Response response = imageMapper.imageToResponse(image);
        return new ResponseEntity(new SingleResponseDto(response), HttpStatus.OK);
    }
}
