package com.project.ProductService.dto;

import lombok.Data;

@Data
public class ProductResponse {

    private Long id;
    private String name;
    private String description;
    private double price;
    private int stock;
    private String category;
    private String stockStatus;
    private String imageUrl;

}