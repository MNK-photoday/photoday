package com.photoday.photoday.image.entity;

import com.photoday.photoday.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@Table(name = "Likes")
@Getter
@Setter
@NoArgsConstructor
public class Like {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long likeId;

    @ManyToOne
    @JoinColumn(name = "image_id")
    private Image image;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public void setImage(Image image) {
        this.image = image;
        if (!image.getLikeList().contains(this)) {
            image.getLikeList().add(this);
        }
    }

    public void setUser(User user) {
        this.user = user;
        if (!user.getLikes().contains(this)) {
            user.getLikes().add(this);
        }
    }
}
