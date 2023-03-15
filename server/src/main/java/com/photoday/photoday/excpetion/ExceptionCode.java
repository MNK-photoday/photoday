package com.photoday.photoday.excpetion;

import lombok.Getter;
import org.springframework.http.HttpStatus;

public enum ExceptionCode {
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "회원 정보가 없습니다."),
    USER_ALREADY_EXISTS(HttpStatus.CONFLICT, "이미 존재하는 이메일입니다."),
    REPORT_COUNT_EXCEEDS_LIMIT(HttpStatus.BAD_REQUEST, "신고 개수가 5개 이상입니다."),
    NOT_IMAGE_OWNER(HttpStatus.UNAUTHORIZED, "게시물 작성자가 아닙니다."),
    CANNOT_FOLLOW_MYSELF(HttpStatus.UNAUTHORIZED, "본인을 팔로우 할 수 없습니다");

    @Getter
    private HttpStatus httpStatus;

    @Getter
    private String message;

    ExceptionCode(HttpStatus httpStatus, String message) {
        this.httpStatus = httpStatus;
        this.message = message;
    }
}
