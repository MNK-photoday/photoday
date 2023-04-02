package com.photoday.photoday.image.service.impl;

import com.photoday.photoday.dto.MultiResponseDto;
import com.photoday.photoday.excpetion.CustomException;
import com.photoday.photoday.image.dto.ImageDto;
import com.photoday.photoday.image.entity.*;
import com.photoday.photoday.image.mapper.ImageMapper;
import com.photoday.photoday.image.repository.ImageRepository;
import com.photoday.photoday.image.repository.LikeRepository;
import com.photoday.photoday.image.service.ImageService;
import com.photoday.photoday.image.service.S3Service;
import com.photoday.photoday.mail.image.ImageDeleteEvent;
import com.photoday.photoday.security.service.AuthUserService;
import com.photoday.photoday.tag.dto.TagDto;
import com.photoday.photoday.tag.entity.Tag;
import com.photoday.photoday.tag.mapper.TagMapper;
import com.photoday.photoday.tag.service.TagService;
import com.photoday.photoday.user.entity.User;
import com.photoday.photoday.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.photoday.photoday.excpetion.ExceptionCode.*;

@Service(value = "imageService")
@Transactional
@RequiredArgsConstructor
@Slf4j
public class ImageServiceImpl implements ImageService {
    private final ImageRepository imageRepository;
    private final TagService tagService;
    private final S3Service s3Service;
    private final UserService userService;
    private final ImageMapper imageMapper;
    private final TagMapper tagMapper;
    private final AuthUserService authUserService;
    private final LikeRepository likeRepository;
    private final ApplicationEventPublisher publisher;

    @Override
    public ImageDto.Response createImage(TagDto post, MultipartFile multipartFile) throws IOException, NoSuchAlgorithmException {
        if (!List.of("image/jpeg", "image/pjpeg", "image/tiff", "image/png", "image/bmp", "image/x-windows-bmp")
                .contains(multipartFile.getContentType())) {
            throw new CustomException(IMAGE_FILE_ONLY);
        }

        String imageHashValue = s3Service.getMd5Hash(multipartFile);
        if (imageRepository.existsByImageHashValue(imageHashValue)) {
            throw new CustomException(DUPLICATE_IMAGE);
        }
        User user = authUserService.getLoginUser()
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));
//        Long userId = authUserService.getLoginUserId();

        String imageUrl = s3Service.saveImage(multipartFile);
        Image image = makeImage(imageUrl, user);
        image.setImageHashValue(imageHashValue);

        List<Tag> tagList = tagMapper.dtoToTag(post);
        List<ImageTag> imageTagList = tagListToImageTagList(tagList, image);
        image.setImageTagList(imageTagList);

        Image save = imageRepository.save(image);
        return imageMapper.imageToResponse(save, user);
    }

    @Override
    public ImageDto.Response updateImageTags(long imageId, TagDto patch) {
        Image image = findVerifiedImage(imageId); // 이미지 존재하는지 검증
        User user = authUserService.getLoginUser().orElseThrow(() -> new CustomException(USER_NOT_FOUND));
//        Long userId = authUserService.getLoginUserId();
        if (!Objects.equals(image.getUser().getUserId(), user.getUserId()))
            throw new CustomException(NOT_IMAGE_OWNER);

        List<Tag> tagList = tagMapper.dtoToTag(patch);
        image.getImageTagList().clear();
        tagListToImageTagList(tagList, image);

        return imageMapper.imageToResponse(image, user);
    }

    @Override
    public ImageDto.Response getImage(long imageId) {
        Image image = findVerifiedImage(imageId);
        image.setViewCount(image.getViewCount() + 1);
        Image save = imageRepository.save(image);
        User user = authUserService.getLoginUser().orElse(null);
        return imageMapper.imageToResponse(save, user);
    }

    @Override
    public void deleteImage(long imageId) {
        Image image = findVerifiedImage(imageId);
//        Long userId = authUserService.getLoginUserId();
        User user = authUserService.getLoginUser().orElseThrow(() -> new CustomException(USER_NOT_FOUND));
        if (!user.getRoles().contains("ADMIN") && !image.getUser().getUserId().equals(user.getUserId()))
            throw new CustomException(NOT_IMAGE_OWNER);
        if(user.getRoles().contains("ADMIN")) publisher.publishEvent(new ImageDeleteEvent(this, image));
        imageRepository.deleteById(imageId);
    }

    @Override
    public ImageDto.Response updateBookmark(long imageId) {
        Image image = findVerifiedImage(imageId);
        User user = authUserService.getLoginUser().orElseThrow(() -> new CustomException(USER_NOT_FOUND));
//        Long userId = authUserService.getLoginUserId();
//        User user = userService.findVerifiedUser(userId);

        Optional<Bookmark> optionalBookmark = image.getBookmarkList().stream()
                .filter(bookmark -> bookmark.getUser().getUserId().equals(user.getUserId()))
                .findFirst();

        if (optionalBookmark.isPresent()) {
            image.getBookmarkList().remove(optionalBookmark.get());

        } else {
            Bookmark newBookmark = new Bookmark();
            newBookmark.setUser(user);
            newBookmark.setImage(image);
        }

        return imageMapper.imageToResponse(image, user);
    }

    @Override
    public MultiResponseDto getBookmarkImages(Pageable pageable) {
        Long userId = authUserService.getLoginUserId();
        Pageable pageRequest = PageRequest.of(pageable.getPageNumber() - 1, pageable.getPageSize(), pageable.getSort());

        Page<Image> page = imageRepository.findAllBookmarkImages(pageRequest, userId);
        List<Image> imageList = page.getContent();
        List<ImageDto.PageResponse> responses
                = imageList.stream().map(imageMapper::imageToPageResponse).collect(Collectors.toList());

        return new MultiResponseDto(responses, page);
    }

    @Override
    public ImageDto.Response createReport(long imageId) {
        Image image = findVerifiedImage(imageId);

        User loginUser = authUserService.getLoginUser()
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));
//        Long userId = authUserService.getLoginUserId();
        if (image.getUser().getUserId().equals(loginUser.getUserId())) {
            throw new CustomException(CANNOT_REPORT_MYSELF);
        }

//        User loginUser = userService.findVerifiedUser(userId);
        userService.checkUserReportCount(loginUser);

        Optional<Report> optionalReport = image.getReportList().stream()
                .filter(report -> report.getUser().getUserId().equals(loginUser.getUserId()))
                .findFirst();

        if (image.getReportList().size() >= 4) {
            imageRepository.delete(image);
            publisher.publishEvent(new ImageDeleteEvent(this, image));
            return null;
        }

        if (optionalReport.isPresent()) {
            throw new CustomException(ALREADY_REPORTED);
        } else {
            //아니면 신고 목록에 추가 및 저장
            Report report = new Report();
            report.setUser(loginUser);
            report.setImage(image);

            //회원 정지 기능
            image.getUser().setReportedCount(image.getUser().getReportedCount() + 1);

            userService.banUser(image);
        }

        return imageMapper.imageToResponse(image, loginUser);
    }

    @Override
    public ImageDto.Response updateLike(long imageId) {
        Image image = findVerifiedImage(imageId);
//        Long userId = authUserService.getLoginUserId();
//        User user = userService.findVerifiedUser(userId);
        User loginUser = authUserService.getLoginUser()
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        Optional<Like> optionalLike = image.getLikeList().stream()
                .filter(like -> Objects.equals(like.getUser().getUserId(), loginUser.getUserId()))
                .findFirst();

        if (optionalLike.isPresent()) {
            image.getLikeList().remove(optionalLike.get());
            likeRepository.deleteAllByIdInBatch(Collections.singleton(optionalLike.get().getLikeId()));
        } else {
            Like newLike = new Like();
            newLike.setUser(loginUser);
            newLike.setImage(image);
        }

        return imageMapper.imageToResponse(image, loginUser);
    }

    @Override
    public MultiResponseDto getUserImages(long userId, Pageable pageable) {
        Pageable pageRequest = PageRequest.of(pageable.getPageNumber() - 1, pageable.getPageSize(), pageable.getSort());

        Page<Image> page = imageRepository.findAllUserImages(pageRequest, userId);
        List<Image> imageList = page.getContent();
        List<ImageDto.PageResponse> responses
                = imageList.stream().map(imageMapper::imageToPageResponse).collect(Collectors.toList());

        return new MultiResponseDto(responses, page);
    }

    @Override
    public List<ImageDto.PageResponse> getMainImages() {
        Pageable pageRequest = PageRequest.of(0, 10);
        Page<Image> page = imageRepository.findMainImages(pageRequest);
        List<Image> mainImages = page.getContent();
        List<ImageDto.PageResponse> responses = mainImages.stream().map(imageMapper::imageToPageResponse).collect(Collectors.toList());
        return responses;
    }

    @Override
    public Image findVerifiedImage(long imageId) {
        Optional<Image> optionalImage = imageRepository.findById(imageId);
        return optionalImage.orElseThrow(() -> new CustomException(IMAGE_NOT_FOUND));
    }

    private Image makeImage(String imageUrl, User user) {
//        User user = userService.findVerifiedUser(userId);

        Image image = new Image();
        image.setImageUrl(imageUrl);
        image.setUser(user);

        return image;
    }

    private List<ImageTag> tagListToImageTagList(List<Tag> tagList, Image image) {
        return tagList.stream()
                .map(tagService::verifyTag)
                .distinct()
                .map(this::tagToImageTag)
                .peek(imageTag -> imageTag.setImage(image))
                .collect(Collectors.toList());
    }

    private ImageTag tagToImageTag(Tag tag) {
        ImageTag imageTag = new ImageTag();
        imageTag.setTag(tag);
        return imageTag;
    }
}
