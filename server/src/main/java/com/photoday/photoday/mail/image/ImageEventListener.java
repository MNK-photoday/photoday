package com.photoday.photoday.mail.image;

import com.photoday.photoday.image.entity.Image;
import com.photoday.photoday.mail.config.EmailSender;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.mail.MailSendException;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Component;

import java.time.format.DateTimeFormatter;

@EnableAsync
@Component
@Slf4j
@RequiredArgsConstructor
public class ImageEventListener {
    private final EmailSender emailSender;

    @Async
    @EventListener
    public void listen(ImageDeleteEvent event) throws Exception {
        Image image = event.getImage();
        try {
            String[] to = new String[]{image.getUser().getEmail()};
            String message = "안녕하세요, Photoday 입니다.\n회원님께서 업로드하신 게시물이 부적절한 것으로 확인되어 삭제되었음을 알려드립니다.\n" +
                    "회원님께서 해당 게시물을 업로드하신 날짜는 " + image.getCreatedAt().format(DateTimeFormatter.ofPattern("YYYY-MM-dd E HH:mm")) + " 입니다.";
            emailSender.sendEmail(to, "Photoday 게시물 관련 안내입니다.", message);
        } catch (MailSendException e) {
            e.printStackTrace();
            log.error("MailSendException : 메일 발송 실패");
        }
    }
}
