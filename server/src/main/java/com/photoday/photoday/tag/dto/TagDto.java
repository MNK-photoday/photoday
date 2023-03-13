package com.photoday.photoday.tag.dto;

import lombok.Getter;

import javax.validation.constraints.Size;
import java.util.List;

@Getter
public class TagDto {
    @Size(min = 1)
    private List<String> names;
}
