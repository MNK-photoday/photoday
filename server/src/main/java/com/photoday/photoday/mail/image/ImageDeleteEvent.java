package com.photoday.photoday.mail.image;

import com.photoday.photoday.image.entity.Image;
import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class ImageDeleteEvent extends ApplicationEvent {
    private Image image;
    public ImageDeleteEvent(Object source, Image image) {
        super(source);
        this.image = image;
    }
}
