package com.example.FoodBackendApp.repository;

import com.example.FoodBackendApp.module.Customers;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomersRepo extends JpaRepository<Customers, Long> {
}
