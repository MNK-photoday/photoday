package com.photoday.photoday.mail;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.MailSendException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailSender {
    private final EmailSendable emailSendable;

    public void sendEmail(String[] to, String subject, String message) throws MailSendException, InterruptedException {
        emailSendable.send(to, subject, message);
    }
}
