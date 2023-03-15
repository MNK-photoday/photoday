package com.photoday.photoday.user.entity;

import com.photoday.photoday.follow.entity.Follow;
import com.photoday.photoday.image.entity.Bookmark;
import com.photoday.photoday.image.entity.Image;
import com.photoday.photoday.image.entity.Like;
import com.photoday.photoday.image.entity.Report;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "users")
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String profileImageUrl = "https://cdn.discordapp.com/attachments/1082610363712950272/1082610364371435540/userImage.png";

    @Column
    private String description = "안녕하세요!";

    @Column(nullable = false)
    private UserStatus status = UserStatus.USER_ACTIVE; // 보류 -> 백업데이터 고려, DB 2개


    private LocalDateTime banTime; // 로직 고려

    private int reportedCount;

    private int todayReportCount; // 보류 -> 로직 고려

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Image> images = new ArrayList<>();

    @OneToMany(mappedBy = "following", cascade = CascadeType.ALL)
    private List<Follow> following = new ArrayList<>();

    @OneToMany(mappedBy = "follower", cascade = CascadeType.ALL)
    private List<Follow> follower = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Report> reports = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Like> likes = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
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
        USER_BANED("정지회원");

        @Getter
        private String status;

        UserStatus(String status) {
            this.status = status;
        }
    }
}


