package com.photoday.photoday.image.controller;

import com.photoday.photoday.dto.MultiResponseDto;
import com.photoday.photoday.dto.SingleResponseDto;
import com.photoday.photoday.image.dto.ImageDto;
import com.photoday.photoday.image.service.ImageService;
import com.photoday.photoday.image.service.S3Service;
import com.photoday.photoday.tag.dto.TagDto;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.List;

@RestController
@RequestMapping("/api/images")
@RequiredArgsConstructor
@Validated
public class ImageController {
    private final ImageService imageService;
    private final S3Service s3Service;

    @PostMapping
    public ResponseEntity<?> createImage(@RequestPart @Valid TagDto post,
                                         @RequestPart(value = "file") MultipartFile multipartFile) throws IOException, NoSuchAlgorithmException {
        ImageDto.Response response = imageService.createImage(post, multipartFile);
        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @PatchMapping("/{imageId}")
    public ResponseEntity<?> updateImageTags(@PathVariable @Positive Long imageId, @RequestBody @Valid TagDto patch) {
        ImageDto.Response response = imageService.updateImageTags(imageId, patch);
        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @GetMapping("/{imageId}")
    public ResponseEntity<?> getImage(@PathVariable @Positive Long imageId) {
        ImageDto.Response response = imageService.getImage(imageId);
        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @DeleteMapping("/{imageId}")
    public ResponseEntity<?> deleteImage(@PathVariable @Positive Long imageId) {
        imageService.deleteImage(imageId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/{imageId}/bookmarks")
    public ResponseEntity<?> updateBookmark(@PathVariable @Positive Long imageId) {
        ImageDto.Response response = imageService.updateBookmark(imageId);
        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @GetMapping("/bookmarks")
    public ResponseEntity<?> getBookmarkImages(Pageable pageable) {
        MultiResponseDto<?> bookmarkImages = imageService.getBookmarkImages(pageable);
        return new ResponseEntity<>(bookmarkImages, HttpStatus.OK);
    }

    @PostMapping("/{imageId}/reports")
    public ResponseEntity<?> createReport(@PathVariable @Positive Long imageId) {
        ImageDto.Response response = imageService.createReport(imageId);
        if (response == null) {
            return ResponseEntity.noContent().build();
        }
        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @PatchMapping("/{imageId}/likes")
    public ResponseEntity<?> updateLike(@PathVariable @Positive Long imageId) {
        ImageDto.Response response = imageService.updateLike(imageId);
        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserImages(@PathVariable @Positive Long userId, Pageable pageable) {
        MultiResponseDto userImages = imageService.getUserImages(userId, pageable);
        return new ResponseEntity<>(userImages, HttpStatus.OK);
    }

    @GetMapping("/main")
    public ResponseEntity<?> getMainImages() {
        List<ImageDto.PageResponse> mainImages = imageService.getMainImages();
        return new ResponseEntity<>(mainImages, HttpStatus.OK);
    }

    @GetMapping("/download")
    public ResponseEntity<ByteArrayResource> downloadFile(@RequestParam("imagePath") String imagePath) throws IOException {
        byte[] data = s3Service.downloadImage(imagePath);
        ByteArrayResource resource = new ByteArrayResource(data);
        HttpHeaders headers = s3Service.buildHeaders(imagePath, data);

        return ResponseEntity.ok().headers(headers).body(resource);
    }
}
