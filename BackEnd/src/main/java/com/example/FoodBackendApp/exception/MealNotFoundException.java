package com.example.FoodBackendApp.exception;

public class MealNotFoundException extends RuntimeException{
    public MealNotFoundException(String message){
        super(message);
    }
}
