package com.project.CartService.client;

import com.project.CartService.dto.OrderRequest;
import com.project.CartService.dto.OrderResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "OrderService")
public interface OrderClient {
    @PostMapping("/orders")
    OrderResponse createOrder(@RequestBody OrderRequest request);
}