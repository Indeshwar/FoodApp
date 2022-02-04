package com.example.FoodBackendApp.module;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@Data               //create getter and setter for all properties of class
@AllArgsConstructor //create All argument constructor
@NoArgsConstructor  //create no argument constructor
@ToString           //Overide ToString method
@Entity             //map with database
public class Customers {
    @Id              //Make customerId as primary key
    @GeneratedValue  //Autogenerate customerId
    private Long customerId;
    private String customerName;
    private String street;
    private String city;
    private String postalCode;

    @OneToMany(targetEntity = OrderItems.class, cascade= CascadeType.ALL)
    @JoinColumn(name = "customerId", referencedColumnName = "customerId") //set foreign key
    private List<OrderItems> orderItems;

}
