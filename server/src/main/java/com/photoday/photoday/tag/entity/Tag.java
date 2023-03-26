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
public class Tag { //TODO 미사용 세터 정리
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long tagId;

    @Column(nullable = false, unique = true)
    private String name;

    @OneToMany(mappedBy = "tag")
    private List<ImageTag> imageTagList = new ArrayList<>();

    public void setImageTag(ImageTag imageTag) {
        this.getImageTagList().add(imageTag);
        if (imageTag.getTag() != this) {
            imageTag.setTag(this);
        }
    }
}
