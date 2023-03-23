package com.photoday.photoday.image.service.impl;

import com.photoday.photoday.dto.MultiResponseDto;
import com.photoday.photoday.excpetion.CustomException;
import com.photoday.photoday.excpetion.ExceptionCode;
import com.photoday.photoday.image.dto.ImageDto;
import com.photoday.photoday.image.entity.*;
import com.photoday.photoday.image.mapper.ImageMapper;
import com.photoday.photoday.image.repository.ImageRepository;
import com.photoday.photoday.image.repository.LikeRepository;
import com.photoday.photoday.image.service.ImageService;
import com.photoday.photoday.image.service.S3Service;
import com.photoday.photoday.security.service.AuthUserService;
import com.photoday.photoday.tag.dto.TagDto;
import com.photoday.photoday.tag.entity.Tag;
import com.photoday.photoday.tag.mapper.TagMapper;
import com.photoday.photoday.tag.service.TagService;
import com.photoday.photoday.user.entity.User;
import com.photoday.photoday.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.photoday.photoday.excpetion.ExceptionCode.ALREADY_REPORTED;
import static com.photoday.photoday.excpetion.ExceptionCode.IMAGE_NOT_FOUND;

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

    @Override
    public ImageDto.Response createImage(TagDto post, MultipartFile multipartFile) throws IOException, NoSuchAlgorithmException {
        if (!List.of("image/jpeg", "image/pjpeg", "image/tiff", "image/png", "image/bmp", "image/x-windows-bmp")
                .contains(multipartFile.getContentType())) {
            throw new CustomException(ExceptionCode.IMAGE_FILE_ONLY);
        }

        String imageHashValue = s3Service.getMd5Hash(multipartFile);
        if (imageRepository.existsByImageHashValue(imageHashValue)) {
            throw new CustomException(ExceptionCode.DUPLICATE_IMAGE);
        }

        Long userId = authUserService.getLoginUserId();

        String imageUrl = s3Service.saveImage(multipartFile);
        Image image = makeImage(imageUrl, userId);
        image.setImageHashValue(imageHashValue);

        List<Tag> tagList = tagMapper.dtoToTag(post);
        List<ImageTag> imageTagList = tagListToImageTagList(tagList, image);
        image.setImageTagList(imageTagList);

        Image save = imageRepository.save(image);
        return imageMapper.imageToResponse(save);
    }

    @Override
    public ImageDto.Response updateImageTags(long imageId, TagDto patch) {
        Image image = findVerifiedImage(imageId); // 이미지 존재하는지 검증

        Long userId = authUserService.getLoginUserId();
        if (image.getUser().getUserId() != userId) throw new CustomException(ExceptionCode.NOT_IMAGE_OWNER);

        List<Tag> tagList = tagMapper.dtoToTag(patch);
        image.getImageTagList().clear();
        tagListToImageTagList(tagList, image);

        return imageMapper.imageToResponse(image);
    }

    @Override
    public ImageDto.Response getImage(long imageId) {
        Image image = findVerifiedImage(imageId);
        image.setViewCount(image.getViewCount() + 1);
        Image save = imageRepository.save(image);
        return imageMapper.imageToResponse(save);
    }

    @Override
    public void deleteImage(long imageId) {
        Image image = findVerifiedImage(imageId);
        Long userId = authUserService.getLoginUserId();
        if (image.getUser().getUserId() != userId) throw new CustomException(ExceptionCode.NOT_IMAGE_OWNER);
        imageRepository.deleteById(imageId);
    }

    @Override
    public ImageDto.Response updateBookmark(long imageId) {
        Image image = findVerifiedImage(imageId);
        Long userId = authUserService.getLoginUserId();
        User user = userService.findVerifiedUser(userId);

        Optional<Bookmark> bookmark = image.getBookmarkList().stream()
                .filter(b -> b.getUser().getUserId() == userId)
                .findFirst();

        if (bookmark.isPresent()) {
            image.getBookmarkList().remove(bookmark.get());

        } else {
            Bookmark newBookmark = new Bookmark();
            newBookmark.setUser(user);
            newBookmark.setImage(image);
        }

        return imageMapper.imageToResponse(image);
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

        Long userId = authUserService.getLoginUserId();
        if (image.getUser().getUserId() == userId)
            throw new CustomException(ExceptionCode.CANNOT_REPORT_MYSELF);

        User user = userService.findVerifiedUser(userId);
        userService.checkUserReportCount(userId);

        Optional<Report> optionalReport = image.getReportList().stream()
                .filter(r -> r.getUser().getUserId() == userId).findFirst();

        if (optionalReport.isPresent()) {
            throw new CustomException(ALREADY_REPORTED);
        } else {
            //아니면 신고 목록에 추가 및 저장
            Report report = new Report();
            report.setUser(user);
            report.setImage(image);

            //회원 정지 기능 //TODO 회원 서비스로 빼기
            image.getUser().setReportedCount(image.getUser().getReportedCount() + 1);
            if (image.getUser().getReportedCount() == 10) {
                image.getUser().setStatus(User.UserStatus.USER_BANED);
                image.getUser().setBanTime(LocalDateTime.now().plusWeeks(1));
            }

            //TODO 게시물 삭제 기능 -- 삭제 후 리턴 추후 확인 필요
            if (image.getReportList().size() >= 5) {
                imageRepository.deleteById(imageId);
            }
        }

        return imageMapper.imageToResponse(image);
    }

    @Override
    public ImageDto.Response updateLike(long imageId) {
        Image image = findVerifiedImage(imageId);
        Long userId = authUserService.getLoginUserId(); //TODO 리팩토링 필요
        User user = userService.findVerifiedUser(userId);

        Optional<Like> like = image.getLikeList().stream()
                .filter(l -> l.getUser().getUserId() == userId)
                .findFirst();

        if (like.isPresent()) {
            image.getLikeList().remove(like.get());
            likeRepository.deleteAllByIdInBatch(Collections.singleton(like.get().getLikeId()));
        } else {
            Like newLike = new Like();
            newLike.setUser(user);
            newLike.setImage(image);
        }

        return imageMapper.imageToResponse(image);
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
    public Image findVerifiedImage(long imageId) {
        Optional<Image> optionalImage = imageRepository.findById(imageId);
        return optionalImage.orElseThrow(() -> new CustomException(IMAGE_NOT_FOUND));
    }

    private Image makeImage(String imageUrl, Long userId) {
        User user = userService.findVerifiedUser(userId);

        Image image = new Image();
        image.setImageUrl(imageUrl);
        image.setUser(user);

        return image;
    }

    private List<ImageTag> tagListToImageTagList(List<Tag> tagList, Image image) {
        return tagList.stream()
                .map(tagService::verifyTag)
                .map(this::tagToImageTag)
                .peek(tag -> tag.setImage(image))
                .collect(Collectors.toList());
    }

    private ImageTag tagToImageTag(Tag tag) {
        ImageTag imageTag = new ImageTag();
        imageTag.setTag(tag);
        return imageTag;
    }
}