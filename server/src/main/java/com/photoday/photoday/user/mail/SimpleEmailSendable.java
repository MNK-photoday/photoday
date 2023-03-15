package com.photoday.photoday.user.mail;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class SimpleEmailSendable implements EmailSendable {
    private final JavaMailSender javaMailSender;

    @Value("${mail.smtp.username}")
    private String from;

    @Override
    public void send(String[] to, String subject, String message) {
        // 보낸 사람, 받는 사람, 참조, 제목 및 텍스트를 포함하는 메시지를 만든다
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(to); //받는 사람 주소
        mailMessage.setFrom(from); //보내는 사람 주소
        mailMessage.setSubject(subject); //제목
        mailMessage.setText(message); //메시지 내용
        javaMailSender.send(mailMessage); //메일 발송

        log.info("Sent simple email!");
    }
}
