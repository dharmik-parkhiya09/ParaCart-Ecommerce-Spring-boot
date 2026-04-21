package com.project.OrderService.demo.client;

import com.project.OrderService.demo.dto.PaymentOrderRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "razorpay")
public interface PaymentClient {

    @PostMapping("/payment/create-order")
    String createRazorpayOrder(@RequestBody PaymentOrderRequest request);
}
