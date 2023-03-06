package com.photoday.photoday.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public class SingleResponseDto<T> {
    T data;
}
