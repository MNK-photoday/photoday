package com.photoday.photoday.image.entity;

import com.photoday.photoday.user.entity.User;
import lombok.*;
import lombok.Builder.Default;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class) //TODO setter, construct 접근제어자 고려 후 수정
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long imageId;

    @Column(nullable = false)
    private String imageUrl;

    @Column(nullable = false)
    private int viewCount;

    @CreatedDate  //TODO updatable false 추가?
    private LocalDateTime createdAt;

    @Column(nullable = false) //TODO unique true 추가?
    private String imageHashValue;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "image", cascade = CascadeType.ALL, orphanRemoval = true)
    @Default
    private List<ImageTag> imageTagList = new ArrayList<>();

    @OneToMany(mappedBy = "image", cascade = CascadeType.ALL, orphanRemoval = true)
    @Default
    private List<Bookmark> bookmarkList = new ArrayList<>();

    @OneToMany(mappedBy = "image", cascade = CascadeType.ALL, orphanRemoval = true)
    @Default
    private List<Like> likeList = new ArrayList<>();

    @OneToMany(mappedBy = "image", cascade = CascadeType.ALL, orphanRemoval = true)
    @Default
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
