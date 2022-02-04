package com.example.FoodBackendApp.module;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
@Data                 //Create all getter and setter for data fields
@AllArgsConstructor   //Create all arg-constructor
@NoArgsConstructor    //create no arg-constructor
@ToString             //Override ToString method
@Entity               //map with database
public class OrderItems {
    @Id               //Make orderId as a primary key
    @GeneratedValue   //Auto generate orderId
    private Long orderId;
    private Long id;
    private String name;
    private Long amount;
    private Double price;

}
