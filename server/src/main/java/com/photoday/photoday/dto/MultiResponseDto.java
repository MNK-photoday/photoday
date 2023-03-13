package com.photoday.photoday.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
public class MultiResponseDto<T> {
    private List<T> data;
    private PageInfo pageInfo;

    public MultiResponseDto(List<T> data, Page page) {
        this.data = data;
        this.pageInfo = new PageInfo(page.getNumber()+1, page.getSize(), page.getTotalPages(), page.getTotalElements());
    }

    @Getter
    private class PageInfo{
        private int pageNumber;
        private int size;
        private int totalPages;
        private long totalElements;

        public PageInfo(int pageNumber, int size, int totalPages, long totalElements) {
            this.pageNumber = pageNumber;
            this.size = size;
            this.totalPages = totalPages;
            this.totalElements = totalElements;
        }
    }
}
