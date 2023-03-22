package com.photoday.photoday.image.service;

import com.photoday.photoday.dto.MultiResponseDto;
import com.photoday.photoday.image.dto.ImageDto;
import com.photoday.photoday.image.entity.Image;
import com.photoday.photoday.tag.dto.TagDto;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;

public interface ImageService {
    ImageDto.Response createImage(TagDto post, MultipartFile multipartFile) throws IOException, NoSuchAlgorithmException;

    ImageDto.Response updateImageTags(long imageId, TagDto patch);

    ImageDto.Response getImage(long imageId);

    void deleteImage(long imageId);

    ImageDto.Response updateBookmark(long imageId);

    MultiResponseDto getBookmarkImages(Pageable pageable);

    ImageDto.Response createReport(long imageId);

    ImageDto.Response updateLike(long imageId);

    MultiResponseDto getUserImages(long userId, Pageable pageable);

    Image findVerifiedImage(long imageId);
}
