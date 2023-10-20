package com.juan.garden.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.juan.garden.model.User;

public interface UserRepository extends JpaRepository <User, Integer> {
    User findByUserName(String userName);
    Boolean existsByUserName(String userName);
}
