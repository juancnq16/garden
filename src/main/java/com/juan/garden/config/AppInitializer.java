package com.juan.garden.config;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.juan.garden.model.Role;
import com.juan.garden.model.User;
import com.juan.garden.repositories.RoleRepository;
import com.juan.garden.repositories.UserRepository;

@Component
public class AppInitializer implements ApplicationRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
 
    @Override
    /**
     * Creates default users and passwords for testing purposes
     */
    public void run(ApplicationArguments args) throws Exception {
        // Verifica si el usuario administrador ya existe
        if (!roleRepository.existsByName("ROLE_ADMIN")) {
            Role admin = new Role();
            admin.setName("ROLE_ADMIN");
            roleRepository.save(admin);
        }
        if (!roleRepository.existsByName("ROLE_USER")) {
            Role admin = new Role();
            admin.setName("ROLE_USER");
            roleRepository.save(admin);
        }
        if (!userRepository.existsByUsername("admin") && roleRepository.existsByName("ROLE_ADMIN")) {
            User adminUser = new User();
            adminUser.setUsername("admin");
            adminUser.setPassword(passwordEncoder.encode("12345")); 
            Role adminRole = roleRepository.findByName("ROLE_ADMIN");
            adminUser.addRole(adminRole);
            userRepository.save(adminUser);
        }
        User tempUser = new User();
        tempUser.setUsername("user 1");
        tempUser.setPassword(passwordEncoder.encode("12345"));
        Role userRole = roleRepository.findByName("ROLE_USER");
        User user2 = new User();
        user2.setUsername("user 5");
        user2.addRole(userRole);
        user2.setPassword(passwordEncoder.encode("12345"));
        userRepository.save(user2);
        tempUser.setUsername("user 2");
        userRepository.save(tempUser);
        tempUser.setUsername("user 3");
        userRepository.save(tempUser);
    }

}




