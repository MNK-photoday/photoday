package com.photoday.photoday.dto;

import lombok.Getter;
import org.springframework.data.domain.Page;

@Getter
public class PageInfo {
    private int pageNumber;
    private int size;
    private int totalPages;
    private long totalElements;

    public PageInfo(Page page){
        this.pageNumber = page.getNumber()+1;
        this.size = page.getSize();
        this.totalPages = page.getTotalPages();
        this.totalElements = page.getTotalElements();
    }
}
