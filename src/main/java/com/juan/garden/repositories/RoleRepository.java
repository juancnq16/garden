package com.juan.garden.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.juan.garden.model.Role;

public interface RoleRepository extends JpaRepository<Role, Integer> {

    boolean existsByName(String name);

    Role findByName(String name);
    
}
