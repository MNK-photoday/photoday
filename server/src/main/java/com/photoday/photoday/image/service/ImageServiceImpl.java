package com.photoday.photoday.image.service;

import com.photoday.photoday.dto.MultiResponseDto;
import com.photoday.photoday.excpetion.CustomException;
import com.photoday.photoday.excpetion.ExceptionCode;
import com.photoday.photoday.image.dto.ImageDto;
import com.photoday.photoday.image.entity.*;
import com.photoday.photoday.image.mapper.ImageMapper;
import com.photoday.photoday.image.repository.ImageRepository;
import com.photoday.photoday.image.repository.LikeRepository;
import com.photoday.photoday.security.service.AuthUserServiceImpl;
import com.photoday.photoday.tag.dto.TagDto;
import com.photoday.photoday.tag.entity.Tag;
import com.photoday.photoday.tag.mapper.TagMapper;
import com.photoday.photoday.tag.service.TagServiceImpl;
import com.photoday.photoday.user.entity.User;
import com.photoday.photoday.user.service.UserServiceImpl;
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

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class ImageServiceImpl {
    private final ImageRepository imageRepository;
    private final TagServiceImpl tagServiceImpl;
    private final S3ServiceImpl s3ServiceImpl;
    private final UserServiceImpl userServiceImpl;
    private final ImageMapper imageMapper;
    private final TagMapper tagMapper;
    private final AuthUserServiceImpl authUserServiceImpl;
    private final LikeRepository likeRepository;

    public ImageDto.Response createImage(TagDto post, MultipartFile multipartFile) throws IOException, NoSuchAlgorithmException {
        if (!List.of("image/jpeg", "image/pjpeg", "image/tiff" ,"image/png", "image/bmp", "image/x-windows-bmp")
                .contains(multipartFile.getContentType())) {
            throw new CustomException(ExceptionCode.IMAGE_FILE_ONLY);
        }

        String imageHashValue = s3ServiceImpl.getMd5Hash(multipartFile);
        if(imageRepository.existsByImageHashValue(imageHashValue)) {
            throw new CustomException(ExceptionCode.DUPLICATE_IMAGE);
        }

        List<Tag> tagList = tagMapper.dtoToTag(post);

        Long userId = authUserServiceImpl.getLoginUserId();

        // S3에 이미지 저장하고 url을 받는다.
        String imageUrl = s3ServiceImpl.saveImage(multipartFile);

        // Image 객체를 생성하는 중 >> mapper에서 만들어 오지 않았기 때문에
        Image image = makeImage(imageUrl, userId);
        image.setImageHashValue(imageHashValue);

        // Tag를 id값이 있는 객체로 바꾸고 imageTag에 연관관계를 맺는다.
        List<ImageTag> imageTagList = tagListToImageTagList(tagList, image);
        image.setImageTagList(imageTagList);

        Image save = imageRepository.save(image);
        return imageMapper.imageToResponse(save);
    }

    private Image makeImage(String imageUrl, Long userId) {
        User user = userServiceImpl.findVerifiedUser(userId);

        Image image = new Image();
        image.setImageUrl(imageUrl);
        image.setUser(user);

        return image;
    }

    public ImageDto.Response updateImageTags(long imageId, TagDto patch) {
        List<Tag> tagList = tagMapper.dtoToTag(patch);

        Image image = findVerifiedImage(imageId); // 이미지 존재하는지 검증

        Long userId = authUserServiceImpl.getLoginUserId();
        if (image.getUser().getUserId() != userId) throw new CustomException(ExceptionCode.NOT_IMAGE_OWNER);

        image.getImageTagList().clear();

        //새로운 태그들을 tag -> imageTag로 변환해서 저장.
        tagListToImageTagList(tagList, image);

        return imageMapper.imageToResponse(image);
    }

    private List<ImageTag> tagListToImageTagList(List<Tag> tagList, Image image) {
        return tagList.stream()
                .map(tagServiceImpl::verifyTag)
                .map(this::tagToImageTag)
                .peek(tag -> tag.setImage(image))
                .collect(Collectors.toList());
    }

    private ImageTag tagToImageTag(Tag tag) {
        ImageTag imageTag = new ImageTag();
        imageTag.setTag(tag);
        return imageTag;
    }

    public ImageDto.Response getImage(long imageId) {
        Image image = findVerifiedImage(imageId);
        image.setViewCount(image.getViewCount()+1);
        Image save = imageRepository.save(image);
        return imageMapper.imageToResponse(save);
    }

    public void deleteImage(long imageId) {
        Image image = findVerifiedImage(imageId); // 이미지 존재하는지 검증
        Long userId = authUserServiceImpl.getLoginUserId();
        if (image.getUser().getUserId() != userId) throw new CustomException(ExceptionCode.NOT_IMAGE_OWNER);
        imageRepository.deleteById(imageId);
    }

    public ImageDto.Response updateBookmark(long imageId) {
        Image image = findVerifiedImage(imageId); // 이미지 존재하는지 검증
        Long userId = authUserServiceImpl.getLoginUserId();
        User user = userServiceImpl.findVerifiedUser(userId);

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
        }

        return imageMapper.imageToResponse(image);
    }

    public MultiResponseDto getBookmarkImages(Pageable pageable) {
        Long userId = authUserServiceImpl.getLoginUserId();
        Pageable pageRequest = PageRequest.of(pageable.getPageNumber()-1, pageable.getPageSize(), pageable.getSort());

        Page<Image> page = imageRepository.findAllBookmarkImages(pageRequest, userId);
        List<Image> imageList = page.getContent();
        List<ImageDto.PageResponse> responses
                = imageList.stream().map(imageMapper::imageToPageResponse).collect(Collectors.toList());

        return new MultiResponseDto(responses, page);
    }

    public ImageDto.Response createReport(long imageId) {
        Image image = findVerifiedImage(imageId); // 이미지 존재하는지 검증
        Long userId = authUserServiceImpl.getLoginUserId();

        if(image.getUser().getUserId()==userId) throw new CustomException(ExceptionCode.CANNOT_REPORT_MYSELF); // 본인 신고 불가

        User user = userServiceImpl.findVerifiedUser(userId);
        userServiceImpl.checkUserReportCount(userId);
        //사용자가 이미 신고했으면 예외 터뜨리기.
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
            if(image.getUser().getReportedCount() == 10) {
                image.getUser().setStatus(User.UserStatus.USER_BANED);
                image.getUser().setBanTime(LocalDateTime.now().plusWeeks(1));
            }

            //TODO 게시물 삭제 기능 -- 삭제 후 리턴 추후 확인 필요
            if(image.getReportList().size() >= 5 ) {
                imageRepository.deleteById(imageId);
            }
        }

        return imageMapper.imageToResponse(image);
    }

    public ImageDto.Response updateLike(long imageId) {
        Image image = findVerifiedImage(imageId); // 이미지 존재하는지 검증
        Long userId = authUserServiceImpl.getLoginUserId(); //TODO 리팩토링 필요
        User user = userServiceImpl.findVerifiedUser(userId);

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

    public MultiResponseDto getUserImages(long userId, Pageable pageable) {
        Pageable pageRequest = PageRequest.of(pageable.getPageNumber()-1, pageable.getPageSize(), pageable.getSort());

        Page<Image> page = imageRepository.findAllUserImages(pageRequest, userId);
        List<Image> imageList = page.getContent();
        List<ImageDto.PageResponse> responses
                = imageList.stream().map(imageMapper::imageToPageResponse).collect(Collectors.toList());

        return new MultiResponseDto(responses, page);
    }

    public Image findVerifiedImage(long imageId) {
        Optional<Image> optionalImage = imageRepository.findById(imageId);
        return optionalImage.orElseThrow(() -> new CustomException(IMAGE_NOT_FOUND));
    }
}
