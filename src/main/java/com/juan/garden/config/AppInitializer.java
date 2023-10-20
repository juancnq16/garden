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
        if (!userRepository.existsByUserName("admin") && roleRepository.existsByName("ROLE_ADMIN")) {
            User adminUser = new User();
            adminUser.setUserName("admin");
            adminUser.setPassword(passwordEncoder.encode("12345")); 
            Role adminRole = roleRepository.findByName("ROLE_ADMIN");
            adminUser.addRole(adminRole);
            userRepository.save(adminUser);
        }
    }

}




