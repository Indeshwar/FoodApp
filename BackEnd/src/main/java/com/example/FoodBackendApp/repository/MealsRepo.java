package com.example.FoodBackendApp.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.FoodBackendApp.module.Meals;
import org.springframework.stereotype.Repository;

@Repository
public interface MealsRepo extends JpaRepository<Meals, Long> {
}
