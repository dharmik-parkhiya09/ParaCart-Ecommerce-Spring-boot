package com.project.OrderService.demo.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OrderItemResponse {
    private Long productId;
    private int quantity;
    private double price;
}
