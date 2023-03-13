package com.photoday.photoday.tag.entity;

import com.photoday.photoday.image.entity.ImageTag;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long tagId;

    @Column(nullable = false, unique = true)
    private String name;

    @OneToMany(mappedBy = "tag")
    private List<ImageTag> imageTags = new ArrayList<>();

    public void setImageTag(ImageTag imageTag) {
        this.getImageTags().add(imageTag);
        if(imageTag.getTag()!=this){
            imageTag.setTag(this);
        }
    }
}
