package com.juan.garden.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.juan.garden.model.Role;
/**
 * Repository for role management
 */
public interface RoleRepository extends JpaRepository<Role, Integer> {

    /**
     * Checks if a role exists based on a given name
     * @param name
     * Name to query 
     * @return
     * Return boolean indicating whether the role exists or not
     */
    boolean existsByName(String name);

    /**
     * Finds a role with a given name, its recomended to use preceeded by
     * the existsByName method in order to garantee the role existence
     * @param name
     * name to query
     * @return
     * returns the role if it exists
     */
    Role findByName(String name);
    
}
