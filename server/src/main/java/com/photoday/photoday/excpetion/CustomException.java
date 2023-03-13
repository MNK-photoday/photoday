package com.photoday.photoday.excpetion;

import lombok.Getter;

@Getter
public class CustomException extends RuntimeException{

    private ExceptionCode exceptionCode;

    public CustomException(ExceptionCode exceptionCode) {
        super(exceptionCode.getMessage());
        this.exceptionCode = exceptionCode;
    }
}
