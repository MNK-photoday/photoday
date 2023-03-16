package com.photoday.photoday.mail;

import com.photoday.photoday.user.entity.User;
import com.photoday.photoday.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.event.EventListener;
import org.springframework.mail.MailSendException;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.security.SecureRandom;
import java.util.Date;

@EnableAsync
@Component
@Slf4j
@RequiredArgsConstructor
public class UserEventListener {
    @Value("${mail.subject.member.registration}")
    private String subject;
    private final EmailSender emailSender;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Async
    @EventListener
    public void listen(UserApplicationEvent event) throws Exception {
        String newPassword = getTempPassword();
        User user = event.getUser();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        try {
            String[] to = new String[]{user.getEmail()};
            String message = user.getEmail() + " 님 안녕하세요.\n" + "Photoday 임시비밀번호 안내 관련 이메일입니다.\n" + "회원님의 임시 비밀번호는 "
                    + newPassword + " 입니다.\n" + " 로그인 후에 비밀번호를 변경해주세요.";
            emailSender.sendEmail(to, subject, message);
        } catch (MailSendException e) {
            e.printStackTrace();
            log.error("MailSendException : 메일 발송 실패");
        }
    }

    public String getTempPassword(){ //TODO 메서드 밖으로 빼기
        char[] charSet = new char[] {
                '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
                'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
                '!', '@', '#', '$', '%', '^', '&' };

        StringBuffer sb = new StringBuffer();
        SecureRandom sr = new SecureRandom();
        sr.setSeed(new Date().getTime());

        int size = (int) Math.floor(Math.random() * (20 - 8 + 1)) + 8;

        for (int i=0; i<size; i++) {
            int idx = sr.nextInt(charSet.length);    // 강력한 난수를 발생시키기 위해 SecureRandom을 사용한다.
            sb.append(charSet[idx]);
        }

        return sb.toString();
    }
}