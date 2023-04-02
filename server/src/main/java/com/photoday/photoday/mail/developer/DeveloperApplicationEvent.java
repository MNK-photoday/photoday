package com.photoday.photoday.mail.developer;


import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class DeveloperApplicationEvent extends ApplicationEvent {
    private String exceptionName;
    public DeveloperApplicationEvent(Object source, String exceptionName) {
        super(source);
        this.exceptionName = exceptionName;
    }
}
