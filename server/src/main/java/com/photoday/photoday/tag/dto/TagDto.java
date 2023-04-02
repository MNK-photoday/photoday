package com.photoday.photoday.tag.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Size;
import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class TagDto {
    @Size(min = 1, max = 20)
    private List<String> tags;
}
