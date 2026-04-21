package com.project.CartService.service;

import com.project.CartService.client.OrderClient;
import com.project.CartService.client.ProductClient;
import com.project.CartService.dto.*;
import com.project.CartService.entity.Cart;
import com.project.CartService.entity.CartItem;
import com.project.CartService.repository.CartItemRepo;
import com.project.CartService.repository.CartRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class CartService {

    private final CartRepo cartRepo;
    private final CartItemRepo cartItemRepo;
    private final ProductClient productClient;
    private final OrderClient orderClient;

    public CartItem addToCart(CartItemRequest request){

        ProductResponse product =
                productClient.getProduct(request.getProductId());

        log.info("Product Added : "+ product.getName());

        Cart cart = cartRepo.findByUserId(request.getUserId())
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUserId(request.getUserId());
                    return cartRepo.save(newCart);
                });

        CartItem item = new CartItem();
        item.setCartId(cart.getId());
        item.setProductId(request.getProductId());
        item.setQuantity(request.getQuantity());
        item.setPrice(product.getPrice());

        return cartItemRepo.save(item);
    }

    public CartResponse getCartItems(Long userId){

        Cart cart = cartRepo.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        List<CartItem> items = cartItemRepo.findByCartId(cart.getId());

        List<CartItemResponse> itemResponses = items.stream()
                .map(item -> {
                    CartItemResponse response = new CartItemResponse();
                    response.setId(item.getId());
                    response.setProductId(item.getProductId());
                    response.setQuantity(item.getQuantity());
                    return response;
                }).toList();

        CartResponse response = new CartResponse();
        response.setCartId(cart.getId());
        response.setUserId(userId);
        response.setItems(itemResponses);

        return response;
    }

    public void removeItem(Long itemId){
        cartItemRepo.deleteById(itemId);
    }

    public CartItemResponse updateCartItems(Long itemId, CartItemRequest request) {
        CartItem item = cartItemRepo.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        item.setQuantity(request.getQuantity());
        CartItem updatedItem = cartItemRepo.save(item);

        CartItemResponse response = new CartItemResponse();
        response.setId(updatedItem.getId());           // ← add this
        response.setProductId(updatedItem.getProductId());
        response.setQuantity(updatedItem.getQuantity());

        return response;
    }

    public OrderResponse checkout(Long userId) {
        Cart cart = cartRepo.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        List<CartItem> items = cartItemRepo.findByCartId(cart.getId());
        if (items.isEmpty()) throw new RuntimeException("Cart is empty");

        List<OrderItemDto> orderItems = items.stream().map(i -> {
            OrderItemDto dto = new OrderItemDto();
            dto.setProductId(i.getProductId());
            dto.setQuantity(i.getQuantity());
            dto.setPrice(i.getPrice());
            return dto;
        }).toList();

        OrderRequest orderRequest = new OrderRequest();
        orderRequest.setUserId(userId);
        orderRequest.setItems(orderItems);

        // Call OrderService from Feign Client
        OrderResponse order = orderClient.createOrder(orderRequest);

        cartItemRepo.deleteAll(items);

        return order;
    }


}
