package com.photoday.photoday.tag.dto;

import lombok.Getter;

public class TagDto {
    @Getter
    public static class Post {
        private String name;
    }

    @Getter
    public static class Patch {
        private String name;

    }

    @Getter
    public static class Response {
        private String name;
    }
}
