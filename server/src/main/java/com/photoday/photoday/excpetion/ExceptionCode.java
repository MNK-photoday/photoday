package com.photoday.photoday.excpetion;

import lombok.Getter;
import org.springframework.http.HttpStatus;

public enum ExceptionCode { //TODO 3 단어로 맞추기?
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "회원 정보가 없습니다."),
    USER_ALREADY_EXISTS(HttpStatus.CONFLICT, "이미 존재하는 이메일입니다."),
    REPORT_COUNT_EXCEEDS_LIMIT(HttpStatus.BAD_REQUEST, "신고 개수가 5개 이상입니다."),
    NOT_IMAGE_OWNER(HttpStatus.UNAUTHORIZED, "게시물 작성자가 아닙니다."),
    CANNOT_FOLLOW_MYSELF(HttpStatus.UNAUTHORIZED, "본인을 팔로우 할 수 없습니다"),
    ALREADY_REPORTED(HttpStatus.CONFLICT, "이미 신고한 게시물입니다."),
    IMAGE_NOT_FOUND(HttpStatus.NOT_FOUND, "이미지가 없습니다."),
    ACCOUNT_SUSPENDED(HttpStatus.FORBIDDEN, "부적절한 이용으로 계정이 일시 정지되었습니다."),
    PASSWORD_NOT_MATCH(HttpStatus.UNAUTHORIZED, "비밀번호가 일치하지 않습니다."),
    IMAGE_FILE_ONLY(HttpStatus.BAD_REQUEST, "이미지 타입의 파일이 아닙니다."),
    DUPLICATE_IMAGE(HttpStatus.CONFLICT, "중복된 이미지 입니다.");

    @Getter
    private HttpStatus httpStatus;

    @Getter
    private String message;

    ExceptionCode(HttpStatus httpStatus, String message) {
        this.httpStatus = httpStatus;
        this.message = message;
    }
}
