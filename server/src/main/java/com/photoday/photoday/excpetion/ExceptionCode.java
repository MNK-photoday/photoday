package com.photoday.photoday.excpetion;

import lombok.Getter;
import org.springframework.http.HttpStatus;

public enum ExceptionCode {
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "회원 정보가 없습니다."),
    USER_ALREADY_EXISTS(HttpStatus.CONFLICT, "이미 존재하는 이메일입니다."),
    NOT_IMAGE_OWNER(HttpStatus.UNAUTHORIZED, "게시물 작성자가 아닙니다.");

    @Getter
    private HttpStatus httpStatus;

    @Getter
    private String message;

    ExceptionCode(HttpStatus httpStatus, String message) {
        this.httpStatus = httpStatus;
        this.message = message;
    }
}
