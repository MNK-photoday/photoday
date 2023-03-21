package com.photoday.photoday.logging;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;

@Slf4j
@org.aspectj.lang.annotation.Aspect
@Component
public class Aspect {
    // Pointcut에 의해 필터링된 경로로 들어오는 경우 메서드 호출 전에 적용
    @Before("com.photoday.photoday.logging.PointCuts.controllerAndService() ")
    public void beforeParameterLog(JoinPoint joinPoint) {
        String className = getClassName(joinPoint);
        Method method = getMethod(joinPoint);
        log.info("[>>>] " + className.substring(className.lastIndexOf(".") + 1) + " , " + method.getName());
    }

    // Poincut에 의해 필터링된 경로로 들어오는 경우 메서드 리턴 후에 적용
    @AfterReturning(value = "com.photoday.photoday.logging.PointCuts.controllerAndService()", returning = "returnObj")
    public void afterReturnLog(JoinPoint joinPoint, Object returnObj) {
        String className = getClassName(joinPoint);
        Method method = getMethod(joinPoint);
        log.info("[<<<] " + className.substring(className.lastIndexOf(".") + 1) + " , " + method.getName());
    }

    @AfterThrowing(value = "com.photoday.photoday.logging.PointCuts.controllerAndService()")
    public void afterThrownLog(JoinPoint joinPoint) {
        String className = getClassName(joinPoint);
        Method method = getMethod(joinPoint);
        log.error("[ERR] " + className.substring(className.lastIndexOf(".") + 1) + " , " + method.getName());
    }

    // JoinPoint로 메서드 정보 가져오기
    private Method getMethod(JoinPoint joinPoint) {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        return signature.getMethod();
    }

    // JoinPoint로 클래스 정보 가져오기
    private String getClassName(JoinPoint joinPoint) {
        Class<?> activeClass = joinPoint.getTarget().getClass();
        return activeClass.getName();
    }
}
