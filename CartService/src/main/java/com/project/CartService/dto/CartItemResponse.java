package com.project.CartService.dto;

import lombok.Data;

@Data
public class CartItemResponse {
    private Long id;
    private Long productId;
    private int quantity;

}
