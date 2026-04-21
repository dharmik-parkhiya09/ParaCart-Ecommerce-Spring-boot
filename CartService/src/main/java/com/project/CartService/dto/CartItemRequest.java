package com.project.CartService.dto;

import lombok.Data;

@Data
public class CartItemRequest {

    private Long userId;
    private Long productId;
    private int quantity;

}
