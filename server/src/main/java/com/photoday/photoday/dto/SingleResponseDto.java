package com.photoday.photoday.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SingleResponseDto<T> {
    T data;
}