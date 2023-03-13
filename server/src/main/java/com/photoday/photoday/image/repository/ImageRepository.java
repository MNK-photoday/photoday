package com.photoday.photoday.image.repository;

import com.photoday.photoday.image.entity.Image;
import com.photoday.photoday.tag.dto.TagDto;
import com.photoday.photoday.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ImageRepository extends JpaRepository<Image, Long> {

//    @Query(value = "SELECT i FROM Image i " +
//            "JOIN ImageTag it ON i.imageId=it.image.imageId " +
//            "JOIN Tag t ON (t.name IN :tags AND t.tagId=it.tag.tagId)")
    @Query(value = "SELECT * FROM image WHERE image_id IN " +
            "(SELECT image_id FROM imageTag WHERE imageTag.tag_id IN " +
            "( SELECT tag_id FROM tag WHERE name IN :tags)", nativeQuery = true)
    Page<Image> findAllByTag(TagDto tags, Pageable pageable);

    @Query(value = "SELECT i FROM Image i JOIN Bookmark b ON b.user.userId = :userId")
    Page<Image> findAllByBookmark(Pageable pageable, Long userId);

}
