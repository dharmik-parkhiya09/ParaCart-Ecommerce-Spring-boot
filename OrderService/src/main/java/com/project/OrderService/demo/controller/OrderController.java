package com.project.OrderService.demo.controller;

import com.project.OrderService.demo.dto.OrderItemResponse;
import com.project.OrderService.demo.dto.OrderRequest;
import com.project.OrderService.demo.dto.OrderResponse;
import com.project.OrderService.demo.dto.OrderStatusRequest;
import com.project.OrderService.demo.entity.Order;
import com.project.OrderService.demo.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping()
    public Order createOrder(@RequestBody OrderRequest request) {
        return orderService.createOrder(request);
    }

    @GetMapping()
    public ResponseEntity<List<OrderResponse>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<OrderResponse> getOrderById(@PathVariable Long orderId) {
        return ResponseEntity.ok(orderService.getOrderById(orderId));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<OrderResponse>> getOrdersByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(orderService.getAllOrdersByUserId(userId));
    }

//    @PutMapping("/{orderId}/cancel")
//    public ResponseEntity<String> cancelOrder(@PathVariable Long orderId) {
//        orderService.cancelOrder(orderId);
//        return ResponseEntity.ok("Order cancelled successfully");
//    }

//    @PutMapping("/{orderId}/status")
//    public ResponseEntity<OrderResponse> updateOrderStatus(@PathVariable Long orderId, @RequestBody OrderStatusRequest request) {
//        return ResponseEntity.ok(orderService.updateOrderStatus(orderId, request.getStatus()));
//    }

//    @GetMapping("/{orderId}/items")
//    public ResponseEntity<List<OrderItemResponse>> getOrderItems(@PathVariable Long orderId) {
//        return ResponseEntity.ok(orderService.getOrderItems(orderId));
//    }

//    @DeleteMapping("/{orderId}")
//    public ResponseEntity<String> deleteOrder(@PathVariable Long orderId) {
//        orderService.deleteOrder(orderId);
//        return ResponseEntity.ok("Order deleted successfully");
//    }


}
