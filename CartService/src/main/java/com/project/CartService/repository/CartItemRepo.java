package com.project.CartService.repository;

import com.project.CartService.entity.CartItem;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartItemRepo extends CrudRepository<CartItem,Long> {

    List<CartItem> findByCartId(Long cartId);

    void deleteById(Long itemId);


}

