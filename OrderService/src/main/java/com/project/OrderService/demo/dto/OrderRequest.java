package com.project.OrderService.demo.dto;

import com.project.OrderService.demo.entity.OrderItem;
import lombok.Data;

import java.util.List;

@Data
public class OrderRequest {

    private Long userId;
    private List<OrderItemDto> items;
}
