package com.photoday.photoday.image.entity;

import com.photoday.photoday.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Image { // 메타데이터 필드 추가
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long imageId;

    @Column(nullable = false)
    private String imageUrl;

    @Column(nullable = false)
    private int viewCount;

    @CreatedDate
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "image", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ImageTag> imageTagList = new ArrayList<>();

    @OneToMany(mappedBy = "image", cascade = CascadeType.ALL)
    private List<Bookmark> bookmarkList = new ArrayList<>();

    @OneToMany(mappedBy = "image", cascade = CascadeType.ALL)
    private List<Like> likeList = new ArrayList<>();

    @OneToMany(mappedBy = "image", cascade = CascadeType.ALL)
    private List<Report> reportList = new ArrayList<>();

    public void setUser(User user) {
        this.user = user;
        if (!user.getImages().contains(this)) {
            user.getImages().add(this);
        }
    }

    public void setImageTag(ImageTag imageTag) {
        this.getImageTagList().add(imageTag);
        if (imageTag.getImage() != this) {
            imageTag.setImage(this);
        }
    }

    public void setBookmark(Bookmark bookmark) {
        this.getBookmarkList().add(bookmark);
        if (bookmark.getImage() != this) {
            bookmark.setImage(this);
        }
    }

    public void setLike(Like like) {
        this.getLikeList().add(like);
        if (like.getImage() != this) {
            like.setImage(this);
        }
    }

    public void setReport(Report report) {
        this.getReportList().add(report);
        if (report.getImage() != this) {
            report.setImage(this);
        }
    }
}
