package com.juan.garden;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import com.juan.garden.model.Role;
import com.juan.garden.repositories.RoleRepository;

@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
@Rollback(false)
public class RoleRepositoryTests {
    @Autowired private RoleRepository repo;
     
    @Test
    public void testCreateRoles() {
        Role admin = new Role("ROLE_ADMIN");
        Role user = new Role("ROLE_USER");
        //Role editor = new Role("ROLE_EDITOR");
        //Role customer = new Role("ROLE_CUSTOMER");
         
        repo.saveAll(List.of(admin, user));
         
        long count = repo.count();
        assertEquals(3, count);
    }
    /*
    @Test
    public void testCreateUsers() {
        Role admin = new Role("ROLE_ADMIN");
        Role user = new Role("ROLE_USER");
        //Role editor = new Role("ROLE_EDITOR");
        //Role customer = new Role("ROLE_CUSTOMER");
         
        repo.saveAll(List.of(admin, user));
         
        long count = repo.count();
        assertEquals(3, count);
    }
    @Test
    public void testAssignRoleToUser() {
        Integer userId = 1;
        Integer roleId = 2;
        User user = repo.findById(userId).get();
        user.addRole(new Role(roleId));
        
        User updatedUser = repo.save(user);
        assertThat(updatedUser.getRoles()).hasSize(1);
        
    }
     */
}
