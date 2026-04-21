package com.project.CartService.repository;

import com.project.CartService.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartRepo extends JpaRepository<Cart,Integer> {
    Optional<Cart> findByUserId(Long userId);
}
