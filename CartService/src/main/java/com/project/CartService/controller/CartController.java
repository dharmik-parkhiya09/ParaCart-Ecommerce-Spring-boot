package com.project.CartService.controller;

import com.project.CartService.dto.CartItemRequest;
import com.project.CartService.dto.CartResponse;
import com.project.CartService.dto.OrderResponse;
import com.project.CartService.entity.CartItem;
import com.project.CartService.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @PostMapping
    public ResponseEntity<CartItem> addToCart(@RequestBody CartItemRequest request){
        return ResponseEntity.status(201).body(cartService.addToCart(request));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<CartResponse> getCart(@PathVariable Long userId){
        return ResponseEntity.ok(cartService.getCartItems(userId));
    }

    @PostMapping("/checkout/{userId}")
    public ResponseEntity<OrderResponse> checkout(@PathVariable Long userId) {
        return ResponseEntity.ok(cartService.checkout(userId));
    }

    // Optional features
    /*
    @DeleteMapping("/{itemId}")
    public ResponseEntity<Void> removeItem(@PathVariable Long itemId){
        cartService.removeItem(itemId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{itemId}")
    public ResponseEntity<CartItemResponse> updateCartItem(
            @PathVariable Long itemId,
            @RequestBody CartItemRequest request){
        return ResponseEntity.ok(cartService.updateCartItems(itemId, request));
    }
    */
}