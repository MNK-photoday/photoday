package com.photoday.photoday.mail.user;


import com.photoday.photoday.user.entity.User;
import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class UserApplicationEvent extends ApplicationEvent {
    private User user;

    public UserApplicationEvent(Object source, User user) {
        super(source);
        this.user = user;
    }
}
