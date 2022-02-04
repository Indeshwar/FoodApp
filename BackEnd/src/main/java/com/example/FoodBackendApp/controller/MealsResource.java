package com.example.FoodBackendApp.controller;

import com.example.FoodBackendApp.dto.OrderRequest;
import com.example.FoodBackendApp.module.Customers;
import com.example.FoodBackendApp.module.Meals;
import com.example.FoodBackendApp.service.MealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/meals")
public class MealsResource {
    private MealService mealService;

    public MealsResource(MealService mealService) {
        this.mealService = mealService;
    }


    @GetMapping("/all")
    public ResponseEntity<List<Meals>> getAllMeals(){
        List<Meals> meals = mealService.findAllMeals();
        return new ResponseEntity<>(meals, HttpStatus.OK);
    }

    @PostMapping("/savemeals")
    public Meals saveMeals(@RequestBody Meals meals){
        return mealService.saveMeal(meals);
    }

    @PostMapping("/ordermeal")
    public Customers saveCustomers(@RequestBody OrderRequest request){
        return mealService.saveCustomer(request);
    }

    @GetMapping("/allordermeal")
    public ResponseEntity<List<Customers>> getAllOrder(){
        List<Customers> orders = mealService.findAllOrders();
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }
}
