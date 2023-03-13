package com.photoday.photoday.image.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.photoday.photoday.image.entity.*;
import com.photoday.photoday.image.repository.ImageRepository;
import com.photoday.photoday.tag.entity.Tag;
import com.photoday.photoday.tag.service.TagService;
import com.photoday.photoday.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
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
    private final AmazonS3Client amazonS3Client;
    @Value("${cloud.aws.s3.bucket}")
    private String s3Bucket;

    public Image createImage(List<Tag> tagList, MultipartFile multipartFile) throws IOException {
        // TODO: Authentication 에서 UserId 꺼내서 사용할 것

        // S3에 이미지 저장하고 url을 받는다.
        String imageUrl = saveImage(multipartFile);

        // Image 객체를 생성하는 중 >> mapper에서 만들어 오지 않았기 때문에
        Long userId = 1L;
        Image image = makeImage(imageUrl, userId);

        // Tag를 id값이 있는 객체로 바꾸고 imageTag에 연관관계를 맺는다.
        List<ImageTag> imageTagList = tagListToImageTagList(tagList);
        image.setImageTagList(imageTagList);

        return imageRepository.save(image);
    }

    private Image makeImage(String imageUrl, Long userId) {
        User user = new User();
        user.setUserId(userId);

        Image image = new Image();
        image.setImageUrl(imageUrl);
//        image.setCreatedAt(LocalDateTime.now());
        image.setUser(user);

        return image;
    }

    public String saveImage(MultipartFile multipartFile) throws IOException {
        String originalFilename = multipartFile.getOriginalFilename();
        long size = multipartFile.getSize();

        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentType(multipartFile.getContentType());
        objectMetadata.setContentLength(size);

        //메타데이터 저장

        amazonS3Client.putObject(
                new PutObjectRequest(s3Bucket, originalFilename, multipartFile.getInputStream(), objectMetadata)
        );

        return amazonS3Client.getUrl(s3Bucket, originalFilename).toString();
    }

    public Image modifyImageTags(long imageId, List<Tag> tagList) {
        Image image = findImage(imageId); // 이미지 존재하는지 검증
        //TODO 시큐리티로 '로그인 유저 == 이미지업로드한 유저' 검증

        //기존 imageTag는 삭제해야함 -> 아마 여기서 제대로 안 지워져서 아래 로직에서 duplicate 에러 날 것으로 예상됨.
        //duplicate 에러날 시, orphan or on delete 고려.
        image.getImageTagList().clear();

        //새로운 태그들을 tag -> imageTag로 변환해서 저장해야함.
        List<ImageTag> imageTagList = tagListToImageTagList(tagList);

        image.setImageTagList(imageTagList);
        return imageRepository.save(image);
    }

    private List<ImageTag> tagListToImageTagList(List<Tag> tagList) {
        return tagList.stream()
                .map(tagService::verifyTag)
                .map(this::tagToImageTag)
                .collect(Collectors.toList());
    }

    private ImageTag tagToImageTag(Tag tag) {
        ImageTag imageTag = new ImageTag();
        imageTag.setTag(tag);
        return imageTag;
    }

    public Image getImage(long imageId) {
        return findImage(imageId);
    }

    public void deleteImage(long imageId) {
        Image image = findImage(imageId); // 이미지 존재하는지 검증
        //TODO 시큐리티로 '로그인 유저 == 이미지업로드한 유저' 검증
        imageRepository.deleteById(imageId);
    }

    public Image updateBookmark(long imageId) {
        Image image = findImage(imageId); // 이미지 존재하는지 검증
        //TODO 시큐리티로 사용자 검증
        // 비로그인 회원이면 항상 bookmark = false

        // dummy(원래는 로그인한 사용자)
        User user = new User(1L, "sssss");

        // 북마크 했으면, 리스트에서 제거 , 안 했으면 리스트에 추가
        Optional<Bookmark> bookmark = image.getBookmarkList().stream()
                .filter(b -> b.getUser().getUserId() == user.getUserId())
                .findFirst();

        if (bookmark.isPresent()) {
            image.getBookmarkList().remove(bookmark);
        } else {
            Bookmark newBookmark = new Bookmark();
            newBookmark.setUser(user);
            image.getBookmarkList().add(newBookmark);
        }

        return imageRepository.save(image);
    }

    public Page<Image> getBookmarkImages(Pageable pageable) {
        //TODO 시큐리티로 사용자 검증

        // dummy(원래는 로그인한 사용자)
        User user = new User(1L, "sssss");

        return imageRepository.findAllByBookmark(pageable, user.getUserId());
    }

    public Image createReport(long imageId) {
        Image image = findImage(imageId); // 이미지 존재하는지 검증
        //TODO 시큐리티로 사용자 검증

        // dummy(원래는 로그인한 사용자)
        User user = new User(1L, "sssss");

        //사용자가 이미 신고했으면 예외 터뜨리기.
        image.getReportList().stream().filter(r -> r.getUser().getUserId() == user.getUserId())
                .findFirst().ifPresent(u -> new RuntimeException("이미 신고한 게시물입니다."));

        //아니면 신고 목록에 추가 및 저장
        Report report = new Report();
        report.setUser(user);
        image.getReportList().add(report);

        return imageRepository.save(image);
    }

    public Image updateLike(long imageId) {
        Image image = findImage(imageId); // 이미지 존재하는지 검증
        //TODO 시큐리티로 사용자 검증

        // dummy(원래는 로그인한 사용자)
        User user = new User(1L, "sssss");

        // 좋아요 했으면, 리스트에서 제거 , 안 했으면 리스트에 추가
        Optional<Like> optionalLike = image.getLikeList().stream()
                .filter(l -> l.getUser().getUserId() == user.getUserId())
                .findFirst();

        if (optionalLike.isPresent()) {
            image.getBookmarkList().remove(optionalLike);
        } else {
            Like like = new Like();
            like.setUser(user);
            image.getLikeList().add(like);
        }

        return imageRepository.save(image);
    }

    private Image findImage(long imageId) {
        Optional<Image> optionalImage = imageRepository.findById(imageId);
        return optionalImage.orElseThrow(() -> new RuntimeException("이미지 없음"));
    }
}
