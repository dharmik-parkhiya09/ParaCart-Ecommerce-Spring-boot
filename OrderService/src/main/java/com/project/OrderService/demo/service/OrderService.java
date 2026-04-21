package com.project.OrderService.demo.service;

import com.project.OrderService.demo.client.PaymentClient;
import com.project.OrderService.demo.dto.*;
import com.project.OrderService.demo.entity.Order;
import com.project.OrderService.demo.entity.OrderItem;
import com.project.OrderService.demo.entity.OrderStatus;
import com.project.OrderService.demo.exception.OrderNotFoundException;
import com.project.OrderService.demo.repository.OrderItemRepo;
import com.project.OrderService.demo.repository.OrderRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepo orderRepo;
    private final OrderItemRepo orderItemRepo;
    private final PaymentClient paymentClient;

    public Order createOrder(OrderRequest request) {

        Order order = new Order();
        order.setUserId(request.getUserId());
        order.setOrderStatus(OrderStatus.CREATED);
        order.setCreatedAt(LocalDateTime.now());

        double total = request.getItems()
                .stream()
                .mapToDouble(i -> i.getPrice() * i.getQuantity())
                .sum();
        order.setTotalAmount(total);

        Order savedOrder = orderRepo.save(order);

        for (OrderItemDto item : request.getItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrderId(savedOrder.getId());
            orderItem.setProductId(item.getProductId());
            orderItem.setQuantity(item.getQuantity());
            orderItem.setPrice(item.getPrice());
            orderItemRepo.save(orderItem);
        }

        // Call PaymentService via Feign
        try {
            String razorpayOrderJson = paymentClient.createRazorpayOrder(
                    new PaymentOrderRequest(
                            savedOrder.getTotalAmount().intValue(),  // use savedOrder not order
                            "INR",
                            "order_" + savedOrder.getId()
                    )
            );

            org.json.JSONObject json = new org.json.JSONObject(razorpayOrderJson);
            String razorpayOrderId = json.getString("id");


            savedOrder.setRazorpayOrderId(razorpayOrderId);
            orderRepo.save(savedOrder);

        } catch (Exception e) {
            System.err.println("PaymentService call failed: " + e.getMessage());
        }

        return savedOrder;
    }

    public OrderResponse getOrderById(Long orderId) {
        Order order = orderRepo.findById(orderId).orElseThrow(() -> new OrderNotFoundException("Order Not Found"));
        return mapToResponse(order);
    }

    public List<OrderResponse> getAllOrders() {
        List<Order> orders = orderRepo.findAll();
        return orders.stream()
                .map(this :: mapToResponse)
                .collect(Collectors.toList());
    }

    public List<OrderResponse> getAllOrdersByUserId(Long userId) {
        List<Order> orders = orderRepo.findByUserId(userId);
        return orders.stream()
                .map(this :: mapToResponse)
                .collect(Collectors.toList());
    }

    public void cancelOrder(Long orderId) {

        Order order = orderRepo.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (order.getOrderStatus() == OrderStatus.SHIPPED ||
                order.getOrderStatus() == OrderStatus.DELIVERED) {
            throw new RuntimeException("Order cannot be cancelled");
        }

        order.setOrderStatus(OrderStatus.CANCELLED);
        orderRepo.save(order);
    }

    public OrderResponse updateOrderStatus(Long orderId, OrderStatus status) {
        Order order  = orderRepo.findById(orderId)
                .orElseThrow(() -> new OrderNotFoundException("Order Not Found"));

        if(order.getOrderStatus() == OrderStatus.DELIVERED){
            throw new RuntimeException("Delivered order cannot be updated");
        }
        order.setOrderStatus(status);
        Order updateOrder = orderRepo.save(order);
        return mapToResponse(updateOrder);
    }

    public List<OrderItemResponse> getOrderItems(Long orderId) {
        List<OrderItem> orderItems = orderItemRepo.findByOrderId(orderId);
        return orderItems.stream()
                .map(this::mapToOrderItemResponse)
                .toList();
    }

    public void deleteOrder(Long orderId){
        Order order = orderRepo.findById(orderId).orElseThrow(() -> new OrderNotFoundException("Order Not Found"));
        orderRepo.delete(order);
    }

    private OrderResponse mapToResponse(Order order) {
        return OrderResponse.builder()
                .orderId(order.getId())
                .userId(order.getUserId())
                .totalAmount(order.getTotalAmount())
                .orderStatus(order.getOrderStatus())
                .createdAt(order.getCreatedAt())
                .razorpayOrderId(order.getRazorpayOrderId())
                .build();
    }

    private OrderItemResponse mapToOrderItemResponse(OrderItem orderItem) {
        return OrderItemResponse.builder()
                .productId(orderItem.getProductId())
                .quantity(orderItem.getQuantity())
                .price(orderItem.getPrice())
                .build();
    }
}
