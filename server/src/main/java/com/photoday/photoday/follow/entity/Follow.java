package com.photoday.photoday.follow.entity;

import com.photoday.photoday.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Entity
@Getter
@Setter
public class Follow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long followId;

    @ManyToOne
    @JoinColumn(name = "following_id")
    private User following;

    @ManyToOne
    @JoinColumn(name = "follower_id")
    private User follower;

    public void setFollowing(User following) {
        this.following = following;
        if(!following.getFollowing().contains(this)) {
            following.getFollowing().add(this);
        }
    }

    public void setFollower(User follower) {
        this.follower = follower;
        if(!follower.getFollower().contains(this)) {
            follower.getFollower().add(this);
        }
    }
}

