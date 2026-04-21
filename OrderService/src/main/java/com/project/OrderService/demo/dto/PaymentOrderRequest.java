package com.project.OrderService.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor  // ← needed for new PaymentOrderRequest(...)
@NoArgsConstructor
public class PaymentOrderRequest {
    private int amount;       // total in rupees — service multiplies by 100
    private String currency;  // "INR"
    private String receipt;   // e.g. "order_" + orderId
}
