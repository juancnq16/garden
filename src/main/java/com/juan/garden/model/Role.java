package com.juan.garden.model;

import javax.persistence.*;

import lombok.Getter;
import lombok.Setter;
 
@Entity
@Table(name = "d")
@Getter
@Setter
public class Role {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
     
    @Column(nullable = false, length = 50, unique = true)
    private String name;
 
    public Role() { }
     
    public Role(String name) {
        this.name = name;
    }
     
    public Role(Integer id) {
        this.id = id;
    }
 
 
    @Override
    public String toString() {
        return this.name;
    }
}