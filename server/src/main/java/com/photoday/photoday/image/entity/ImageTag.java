package com.photoday.photoday.image.entity;

import com.photoday.photoday.tag.entity.Tag;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class ImageTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long imageTagId;

    @ManyToOne
    @JoinColumn(name = "tag_id")
    private Tag tag;

    @ManyToOne
    @JoinColumn(name = "image_id")
    private Image image;

    public void setTag(Tag tag) {
        this.tag = tag;
        if(tag.getImageTagList().contains(this)){
            tag.getImageTagList().add(this);
        }
    }

    public void setImage(Image image) {
        this.image = image;
        if(image.getImageTagList().contains(this)){
            image.getImageTagList().add(this);
        }
    }
}
