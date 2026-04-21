package com.project.OrderService.demo.dto;

import com.project.OrderService.demo.entity.OrderStatus;
import lombok.Data;

@Data
public class OrderStatusRequest {
    private OrderStatus status;
}
