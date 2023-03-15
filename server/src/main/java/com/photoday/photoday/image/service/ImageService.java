package com.photoday.photoday.image.service;

import com.photoday.photoday.excpetion.CustomException;
import com.photoday.photoday.excpetion.ExceptionCode;
import com.photoday.photoday.image.entity.*;
import com.photoday.photoday.image.repository.ImageRepository;
import com.photoday.photoday.image.repository.ReportRepository;
import com.photoday.photoday.tag.entity.Tag;
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
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class ImageService {
    private final ImageRepository imageRepository;
    private final TagService tagService;
    private final S3Service s3Service;
    private final UserService userService;

    public Image createImage(List<Tag> tagList, MultipartFile multipartFile) throws IOException {
        Long userId = userService.getLoginUserId();

        // S3에 이미지 저장하고 url을 받는다.
        String imageUrl = s3Service.saveImage(multipartFile);

        // Image 객체를 생성하는 중 >> mapper에서 만들어 오지 않았기 때문에
        Image image = makeImage(imageUrl, userId);

        // Tag를 id값이 있는 객체로 바꾸고 imageTag에 연관관계를 맺는다.
        List<ImageTag> imageTagList = tagListToImageTagList(tagList, image);
        image.setImageTagList(imageTagList);

        return imageRepository.save(image);
    }

    private Image makeImage(String imageUrl, Long userId) {
        User user = userService.findVerifiedUser(userId);

        Image image = new Image();
        image.setImageUrl(imageUrl);
        image.setUser(user);

        return image;
    }

    public Image modifyImageTags(long imageId, List<Tag> tagList) {
        Image image = findImage(imageId); // 이미지 존재하는지 검증

        Long userId = userService.getLoginUserId();
        if (image.getUser().getUserId() != userId) throw new CustomException(ExceptionCode.NOT_IMAGE_OWNER);

        image.getImageTagList().clear();

        //새로운 태그들을 tag -> imageTag로 변환해서 저장.
        List<ImageTag> imageTagList = tagListToImageTagList(tagList, image);

        image.getImageTagList().addAll(imageTagList);
        return imageRepository.save(image);
    }

    private List<ImageTag> tagListToImageTagList(List<Tag> tagList, Image image) {
        return tagList.stream()
                .map(tagService::verifyTag)
                .map(this::tagToImageTag)
                .map(tag -> {
                    tag.setImage(image);
                    return tag;
                })
                .collect(Collectors.toList());
    }

    private ImageTag tagToImageTag(Tag tag) {
        ImageTag imageTag = new ImageTag();
        imageTag.setTag(tag);
        return imageTag;
    }

    public Image getImage(long imageId) {
        Image image = findImage(imageId);
        image.setViewCount(image.getViewCount()+1);
        Image save = imageRepository.save(image);
        return save;
    }

    public void deleteImage(long imageId) {
        Image image = findImage(imageId); // 이미지 존재하는지 검증
        Long userId = userService.getLoginUserId();
        if (image.getUser().getUserId() != userId) throw new CustomException(ExceptionCode.NOT_IMAGE_OWNER);
        imageRepository.deleteById(imageId);
    }

    public Image updateBookmark(long imageId) {
        Image image = findImage(imageId); // 이미지 존재하는지 검증
        Long userId = userService.getLoginUserId();
        User user = userService.findVerifiedUser(userId);

        // 북마크 했으면, 리스트에서 제거 , 안 했으면 리스트에 추가
        Optional<Bookmark> bookmark = image.getBookmarkList().stream()
                .filter(b -> b.getUser().getUserId() == userId)
                .findFirst();

        if (bookmark.isPresent()) {
            image.getBookmarkList().remove(bookmark.get());
        } else {
            Bookmark newBookmark = new Bookmark();
            newBookmark.setUser(user);
            newBookmark.setImage(image);
            image.getBookmarkList().add(newBookmark);
        }

        Image save = imageRepository.save(image);
        return save;
    }

    public Page<Image> getBookmarkImages(Pageable pageable) {
        Long userId = userService.getLoginUserId();
        Pageable pageRequest = PageRequest.of(pageable.getPageNumber()-1, pageable.getPageSize(), pageable.getSort());
        Page<Image> page = imageRepository.findAllBookmarkImages(pageRequest, userId);
        return page;
    }

    public Image createReport(long imageId) {
        Image image = findImage(imageId); // 이미지 존재하는지 검증
        Long userId = userService.getLoginUserId();
        User user = userService.findVerifiedUser(userId);
        userService.checkUserReportCount(userId);
        //사용자가 이미 신고했으면 예외 터뜨리기.
        Optional<Report> optionalReport = image.getReportList().stream().filter(r -> r.getUser().getUserId() == userId).findFirst();

        if (optionalReport.isPresent()) {
            throw new RuntimeException("이미 신고한 게시물");
        } else {
            //아니면 신고 목록에 추가 및 저장
            Report report = new Report();
            report.setUser(user);
            report.setImage(image);
            image.getReportList().add(report);
        }

        Image save = imageRepository.save(image);

        return save;
    }

    public Image updateLike(long imageId) {
        Image image = findImage(imageId); // 이미지 존재하는지 검증
        Long userId = userService.getLoginUserId();
        User user = userService.findVerifiedUser(userId);

        //TODO 포스트맨에서는 1,1,0 으로 됨(등록,버그,취소). 프론트랑 연결해서 실험해봐야할 듯.
        Optional<Like> like = image.getLikeList().stream()
                .filter(l -> l.getUser().getUserId() == userId)
                .findFirst();

        if (like.isPresent()) {
            image.getLikeList().remove(like.get());
        } else {
            Like newLike = new Like();
            newLike.setUser(user);
            newLike.setImage(image);
        }

        Image save = imageRepository.save(image);
        return save;
    }

    private Image findImage(long imageId) {
        Optional<Image> optionalImage = imageRepository.findById(imageId);
        return optionalImage.orElseThrow(() -> new RuntimeException("이미지 없음"));
    }
}
