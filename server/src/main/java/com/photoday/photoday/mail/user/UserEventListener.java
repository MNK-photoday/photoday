package com.photoday.photoday.mail.user;

import com.photoday.photoday.mail.config.EmailSender;
import com.photoday.photoday.user.entity.User;
import com.photoday.photoday.user.repository.UserRepository;
import com.photoday.photoday.util.TempPassword;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.event.EventListener;
import org.springframework.mail.MailSendException;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

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
    private final TempPassword tempPassword;

    @Async
    @EventListener
    public void listen(UserApplicationEvent event) throws Exception {
        String newPassword = tempPassword.getTempPassword();
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
}