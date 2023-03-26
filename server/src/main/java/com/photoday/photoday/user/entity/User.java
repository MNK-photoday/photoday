package com.photoday.photoday.user.entity;

import com.photoday.photoday.follow.entity.Follow;
import com.photoday.photoday.image.entity.Bookmark;
import com.photoday.photoday.image.entity.Image;
import com.photoday.photoday.image.entity.Like;
import com.photoday.photoday.image.entity.Report;
import lombok.*;
import lombok.Builder.Default;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    @Default
    private String profileImageUrl = "https://ifh.cc/g/zPrPfv.png";

    @Column
    @Default
    private String description = "안녕하세요!";

    @Column(nullable = false)
    @Default
    @Enumerated(EnumType.STRING)
    private UserStatus status = UserStatus.USER_ACTIVE;

    private LocalDateTime banTime;

    private int reportedCount;

    private int todayReportCount;

    @ElementCollection(fetch = FetchType.EAGER)
    @Default
    private List<String> roles = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @Default
    private List<Image> images = new ArrayList<>();

    @OneToMany(mappedBy = "following", cascade = CascadeType.ALL)
    @Default
    private List<Follow> following = new ArrayList<>();

    @OneToMany(mappedBy = "follower", cascade = CascadeType.ALL)
    @Default
    private List<Follow> follower = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH})
    @Default
    private List<Report> reports = new ArrayList<>(); //TODO 추후 유저 삭제 후 확인

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @Default
    private List<Like> likes = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @Default
    private List<Bookmark> bookmarks = new ArrayList<>();

    public User(Long userId, String name) {
        this.userId = userId;
        this.name = name;
    }

    public void setImages(Image image) {
        this.getImages().add(image);
        if (image.getUser() != this) {
            image.setUser(this);
        }
    }

    public void setFollowing(Follow following) {
        this.getFollowing().add(following);
        if (following.getFollowing() != this) {
            following.setFollowing(this);
        }
    }

    public void setFollower(Follow follower) {
        this.getFollower().add(follower);
        if (follower.getFollower() != this) {
            follower.setFollower(this);
        }
    }

    public void setReport(Report report) {
        this.getReports().add(report);
        if (report.getUser() != this) {
            report.setUser(this);
        }
    }

    public void setLike(Like like) {
        this.getLikes().add(like);
        if (like.getUser() != this) {
            like.setUser(this);
        }
    }

    public void setBookmark(Bookmark bookmark) {
        this.getBookmarks().add(bookmark);
        if (bookmark.getUser() != this) {
            bookmark.setUser(this);
        }
    }

    public enum UserStatus {
        USER_ACTIVE("활동중"),
        USER_BANED("정지회원"); //TODO BANNED 로 수정

        @Getter
        private String status;

        UserStatus(String status) {
            this.status = status;
        }
    }
}


