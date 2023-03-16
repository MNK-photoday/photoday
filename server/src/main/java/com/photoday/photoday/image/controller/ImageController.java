package com.photoday.photoday.image.controller;

import com.drew.imaging.ImageProcessingException;
import com.photoday.photoday.dto.MultiResponseDto;
import com.photoday.photoday.dto.SingleResponseDto;
import com.photoday.photoday.image.dto.ImageDto;
import com.photoday.photoday.image.service.ImageService;
import com.photoday.photoday.tag.dto.TagDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.security.NoSuchAlgorithmException;

@RestController
@RequestMapping("/api/images")
@RequiredArgsConstructor
@Validated
public class ImageController {
    private final ImageService imageService;

    @PostMapping
    public ResponseEntity createImage(@RequestPart TagDto post,
                                      @RequestPart(value = "file") MultipartFile multipartFile) throws IOException, ImageProcessingException, NoSuchAlgorithmException {
        ImageDto.Response response = imageService.createImage(post, multipartFile);
        return new ResponseEntity(new SingleResponseDto(response), HttpStatus.OK);
    }

    @PatchMapping("/{imageId}")
    public ResponseEntity updateImageTags(@PathVariable Long imageId, @RequestBody @Valid TagDto patch) {
        ImageDto.Response response = imageService.updateImageTags(imageId, patch);
        return new ResponseEntity(new SingleResponseDto(response), HttpStatus.OK);
    }

    @GetMapping("/{imageId}")
    public ResponseEntity getImage(@PathVariable Long imageId) {
        ImageDto.Response response = imageService.getImage(imageId);
        return new ResponseEntity(new SingleResponseDto(response), HttpStatus.OK);
    }

    @DeleteMapping("/{imageId}")
    public ResponseEntity deleteImage(@PathVariable Long imageId) {
        imageService.deleteImage(imageId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/{imageId}/bookmarks")
    public ResponseEntity updateBookmark(@PathVariable Long imageId) {
        ImageDto.Response response = imageService.updateBookmark(imageId);
        return new ResponseEntity(new SingleResponseDto(response), HttpStatus.OK);
    }

    @GetMapping("/bookmarks")
    public ResponseEntity getBookmarkImages(Pageable pageable) {
        MultiResponseDto bookmarkImages = imageService.getBookmarkImages(pageable);
        return new ResponseEntity<>(bookmarkImages, HttpStatus.OK);
    }

    @PostMapping("/{imageId}/reports")
    public ResponseEntity createReport(@PathVariable Long imageId) {
        ImageDto.Response response = imageService.createReport(imageId);
        return new ResponseEntity(new SingleResponseDto(response), HttpStatus.OK);
    }

    @PatchMapping("/{imageId}/likes")
    public ResponseEntity updateLike(@PathVariable Long imageId) {
        ImageDto.Response response = imageService.updateLike(imageId);
        return new ResponseEntity(new SingleResponseDto(response), HttpStatus.OK);
    }
}
