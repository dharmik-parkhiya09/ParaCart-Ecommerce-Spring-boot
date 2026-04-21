package com.project.OrderService.demo.dto;

import com.project.OrderService.demo.entity.OrderStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class OrderResponse {
    private Long orderId;
    private Long userId;
    private Double totalAmount;
    private OrderStatus orderStatus;
    private LocalDateTime createdAt;
    private String razorpayOrderId;
}
