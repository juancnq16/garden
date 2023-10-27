package com.juan.garden.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.juan.garden.model.User;

public interface UserRepository extends JpaRepository <User, Integer> {
    /**
     * Finds a stored user by a given username
     * Its recomended to use existsByUsername method first
     * to ensure user existence
     * @param username
     * username to query
     * @return
     * returns user by given username
     */
    User findByUsername(String username);

    /**
     * Checks whether the user exists in storage or not
     * @param username
     * username to query
     * @return
     * a boolean indicating if the user exists
     */
    Boolean existsByUsername(String username);
    /**
     * Searchs for users matching given search term
     * @param searchTerm
     * @return
     * List containing users found
     */
     List<User> findByUsernameContaining(String searchTerm);
}
