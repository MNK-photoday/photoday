package com.photoday.photoday.tag.dto;

import lombok.Getter;

import javax.validation.constraints.Size;
import java.util.List;

public class TagDto {
    @Getter
    public static class Get {
        @Size(min=1)
        private List<String> tags;
    }
}
