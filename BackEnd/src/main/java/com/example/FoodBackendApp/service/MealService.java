package com.example.FoodBackendApp.service;

import com.example.FoodBackendApp.dto.OrderRequest;
import com.example.FoodBackendApp.module.Customers;
import com.example.FoodBackendApp.module.Meals;
import com.example.FoodBackendApp.repository.CustomersRepo;
import com.example.FoodBackendApp.repository.MealsRepo;
import com.example.FoodBackendApp.repository.OrderItemsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class MealService {
    private final MealsRepo mealsRepo;
    private CustomersRepo customerRepo;
    private OrderItemsRepo orderItemsRepo;

    public MealService(MealsRepo mealsRepo, CustomersRepo customerRepo, OrderItemsRepo orderItemsRepo) {
        this.mealsRepo = mealsRepo;
        this.customerRepo=customerRepo;
        this.orderItemsRepo=orderItemsRepo;
    }


    //return the list of meals
    public List<Meals> findAllMeals(){
        return mealsRepo.findAll();
    }

    public Meals saveMeal(Meals meals){
        return mealsRepo.save(meals);
    }

    public Customers saveCustomer(@RequestBody OrderRequest request){
        return customerRepo.save(request.getCustomers());
    }

    public List<Customers> findAllOrders(){
        return customerRepo.findAll();
    }
    
}
