package com.example.FoodBackendApp.repository;

import com.example.FoodBackendApp.module.OrderItems;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemsRepo extends JpaRepository<OrderItems, Long> {
}
