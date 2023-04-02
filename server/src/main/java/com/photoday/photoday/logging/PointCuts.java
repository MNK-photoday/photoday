package com.photoday.photoday.logging;

import org.aspectj.lang.annotation.Pointcut;

public class PointCuts {
    @Pointcut("execution(* *..*Controller.*(..))")
    public void allController(){}
    @Pointcut("execution(* *..*ServiceImpl.*(..))")
    public void allService(){}
    @Pointcut("allController() || allService() ")
    public void controllerAndService(){}
}
