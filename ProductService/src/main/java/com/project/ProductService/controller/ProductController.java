package com.project.ProductService.controller;

import com.project.ProductService.dto.ProductRequest;
import com.project.ProductService.dto.ProductResponse;
import com.project.ProductService.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

//    @PostMapping
//    public ResponseEntity<ProductResponse> createProduct(@Valid @RequestBody ProductRequest request){
//        return ResponseEntity.status(HttpStatus.CREATED)
//                .body(productService.createProduct(request));
//    }

    @GetMapping
    public ResponseEntity<Page<ProductResponse>> getAllProducts(Pageable pageable){
        return ResponseEntity.ok(productService.getAllProducts(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getProductById(@PathVariable Long id){
        return ResponseEntity.ok(productService.getProductById(id));
    }

//    @PutMapping("/{id}")
//    public ResponseEntity<ProductResponse> updateProduct(
//            @PathVariable Long id,
//            @Valid @RequestBody ProductRequest request){
//        return ResponseEntity.ok(productService.updateProduct(id, request));
//    }

//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteProduct(@PathVariable Long id){
//        productService.deleteProduct(id);
//        return ResponseEntity.noContent().build();
//    }
}
