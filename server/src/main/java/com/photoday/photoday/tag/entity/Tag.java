package com.photoday.photoday.tag.entity;

import com.photoday.photoday.image.entity.ImageTag;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long tagId;

    @Column(nullable = false)
    private String name;

    @OneToMany(mappedBy = "tag")
    private List<ImageTag> imageTags = new ArrayList<>();
}
