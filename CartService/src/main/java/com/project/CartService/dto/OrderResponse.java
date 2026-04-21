package com.project.CartService.dto;

import lombok.Data;

@Data
public class OrderResponse {
    private Long orderId;
    private Long userId;
    private Double totalAmount;
    private String orderStatus;
    private String createdAt;
}