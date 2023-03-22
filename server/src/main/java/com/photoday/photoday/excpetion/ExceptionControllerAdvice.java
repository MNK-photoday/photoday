package com.photoday.photoday.excpetion;

import com.photoday.photoday.mail.developer.DeveloperApplicationEvent;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.multipart.support.MissingServletRequestPartException;

import javax.validation.ConstraintViolationException;

@Slf4j
@RestControllerAdvice
@RequiredArgsConstructor
public class ExceptionControllerAdvice { //TODO 로그 정리
    private final ApplicationEventPublisher publisher;

    @ExceptionHandler
    public ResponseEntity handleCustomException(CustomException e) {
        log.error("CustomException : {}", e.getMessage());
        final ErrorResponse errorResponse = ErrorResponse.of(e.getExceptionCode());
        return new ResponseEntity(errorResponse, e.getExceptionCode().getHttpStatus());
    }

    //validation 오류가 있을 경우 발생
    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        log.error("MethodArgumentNotValidException : {}", e.getMessage());
        final ErrorResponse errorResponse = ErrorResponse.of(e.getBindingResult());
        return errorResponse;
    }

    //메서드 파라미터에 문제가 있을 경우 발생
    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleConstraintViolationException(ConstraintViolationException e) {
        log.error("ConstraintViolationException : {}", e.getMessage());
        final ErrorResponse errorResponse = ErrorResponse.of(e.getConstraintViolations());
        return errorResponse;
    }

    //지원하지 않는 HTTP method 호출 할 경우 발생
    @ExceptionHandler
    @ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)
    public ErrorResponse handleHttpRequestMethodNotSupportedException(HttpRequestMethodNotSupportedException e) {
        log.error("HttpRequestMethodNotSupportedException : {}", e.getMessage());
        final ErrorResponse errorResponse = ErrorResponse.of(HttpStatus.METHOD_NOT_ALLOWED, e.getMessage());
        return errorResponse;
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ErrorResponse handleJwtException(JwtException e) {
        log.error("JwtException : {}", e.getMessage());
        final ErrorResponse errorResponse = ErrorResponse.of(HttpStatus.UNAUTHORIZED, e.getMessage());
        return errorResponse;
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleException(MethodArgumentTypeMismatchException e) {
        log.error("MethodArgumentTypeMismatchException : {}", e.getMessage());
        final ErrorResponse errorResponse = ErrorResponse.of(HttpStatus.BAD_REQUEST, e.getMessage());
        return errorResponse;
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleException(MissingServletRequestPartException e) {
        log.error("MissingServletRequestPartException : {}", e.getMessage());
        final ErrorResponse errorResponse = ErrorResponse.of(HttpStatus.NOT_FOUND, e.getMessage());
        return errorResponse;
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleException(Exception e) {
        publisher.publishEvent(new DeveloperApplicationEvent(this, e.getClass().toString()));
        log.error("Exception : {}", e.getMessage());
        final ErrorResponse errorResponse = ErrorResponse.of(HttpStatus.INTERNAL_SERVER_ERROR);
        return errorResponse;
    }
}
