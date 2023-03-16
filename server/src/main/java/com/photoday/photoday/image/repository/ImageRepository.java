package com.photoday.photoday.image.repository;

import com.photoday.photoday.image.entity.Image;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ImageRepository extends JpaRepository<Image, Long> {
    @Query(value = "SELECT i FROM Image i WHERE i.imageId IN(SELECT it.image.imageId FROM ImageTag it JOIN Tag t ON it.tag.tagId=t.tagId WHERE t.name IN :tags)")
//    @Query(value = "SELECT i FROM Image i JOIN ImageTag it ON i.imageId=it.image.imageId JOIN Tag t ON it.tag.tagId=t.tagId WHERE t.name IN :tags")
//    @Query(value = "SELECT it FROM ImageTag it LEFT JOIN Tag t ON t.tagId = it.tag.tagId WHERE t.name IN :tags GROUP BY it HAVING COUNT(it.tag.tagId)>= :size")
//    @Query(value = "SELECT image.image_id FROM image JOIN image_tag ON image.image_id = image_tag.image_id JOIN tag ON image_tag.tag_id = tag.tag_id WHERE tag.name IN :tags GROUP BY image.image_id HAVING COUNT(distinct image_tag.image_tag_id) >= :size", nativeQuery = true)
//    @Query(value = "SELECT image_tag.image_id FROM image_tag LEFT JOIN tag ON tag.tag_id = image_tag.tag_id WHERE tag.name IN :tags GROUP BY image_tag.image_id HAVING COUNT(image_tag.tag_id) >= :size", nativeQuery = true)
//    @Query(value = "SELECT it.image.imageId FROM ImageTag it LEFT JOIN Tag t ON t.tagId = it.tag.tagId WHERE t.name IN :tags GROUP BY it.image.imageId HAVING COUNT(it.tag.tagId) >= :size")
    Page<Image> findAllByTag(List<String> tags, Pageable pageable);

    @Query(value = "SELECT i FROM Image i WHERE i.imageId IN(SELECT b.image.imageId FROM Bookmark b WHERE b.user.userId =:userId)")
    Page<Image> findAllBookmarkImages(Pageable pageable, Long userId);
}
