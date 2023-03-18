package com.photoday.photoday.image.repository;

import com.photoday.photoday.image.entity.Like;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeRepository extends JpaRepository<Like, Long> {
}
