package com.photoday.photoday.mail.developer;

import com.photoday.photoday.mail.config.EmailSender;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.mail.MailSendException;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Component;

@EnableAsync
@Component
@Slf4j
@RequiredArgsConstructor
public class DeveloperEventListener {
    private final EmailSender emailSender;

    @Async
    @EventListener
    public void listen(DeveloperApplicationEvent event) throws Exception {
        try {
            String[] to = new String[]{"photoday42@gmail.com"};
            String message = event.getExceptionName() + " 에러가 발생하였습니다.\n 로그를 확인해주세요.\n" +
                    "로그 확인 주소 : https://grafana.photoday.shop";
            emailSender.sendEmail(to, "에러 발생!", message);
        } catch (MailSendException e) {
            e.printStackTrace();
            log.error("MailSendException : 메일 발송 실패");
        }
    }
}