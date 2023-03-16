package com.photoday.photoday.image.repository;

import com.photoday.photoday.image.entity.Image;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ImageRepository extends JpaRepository<Image, Long> {
//    @Query(value = "SELECT i FROM Image i WHERE i.imageId IN(SELECT it.image.imageId FROM ImageTag it JOIN Tag t ON it.tag.tagId=t.tagId WHERE t.name IN :tags)")
    @Query(value = "SELECT i FROM Image i JOIN ImageTag it ON i.imageId=it.image.imageId JOIN Tag t ON it.tag.tagId=t.tagId WHERE t.name IN :tags")
    Page<Image> findAllByTag(List<String> tags, Pageable pageable);

    @Query(value = "SELECT i FROM Image i WHERE i.imageId IN(SELECT b.image.imageId FROM Bookmark b WHERE b.user.userId =:userId)")
    Page<Image> findAllBookmarkImages(Pageable pageable, Long userId);

    boolean existsByImageHashValue(String imageHashValue);
}
