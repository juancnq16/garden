package com.juan.garden.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.juan.garden.services.CustomUserDetailsService;

@EnableWebSecurity //(debug = true)
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true, jsr250Enabled = true)

@Configuration
/**
 * Configurates application security enabling access control on 
 * method level by JSR-250 especification allowing security roles 
 * for access control
 */
public class SecurityConfig {
    
	@Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    @Autowired 
    private JwtTokenFilter jwtTokenFilter;

    private final CustomUserDetailsService userDetailsService;

	public SecurityConfig(CustomUserDetailsService customUserDetailsService) {
        this.userDetailsService = customUserDetailsService;
    }
	@Bean
    /**
     * Builds the custom authentication manager setting up 
     * the custom userDetailsService for spring security and
     * the customizable password encoder
     * @param http
     * @param passwordEncoder
     * @return
     * @throws Exception
     */
    public AuthenticationManager authenticationManager(HttpSecurity http, BCryptPasswordEncoder passwordEncoder)
            throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
        authenticationManagerBuilder.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
        return authenticationManagerBuilder.build();
    }
	@Bean
    /**
     * Sets the filter chain to requiere authentication for requests
     * sets routes that shall be excluded and adds the custom jwt token filter
     * @param http
     * @return
     * @throws Exception
     */
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .authorizeRequests()
                .antMatchers("/home/**").permitAll()
                .antMatchers("/auth/**").permitAll()
                .antMatchers("/users/**").permitAll()
                .antMatchers("/chat/**").permitAll()
                .antMatchers("/ws/**").permitAll() //web.ignoring().antMatchers("/authFailure");
                //.antMatchers("/chat").permitAll()//hasAnyRole("USER","ADMIN")
                //.antMatchers("/test").hasRole("ADMIN")
                //.antMatchers("/test").access("hasRole('ROLE_ADMIN')")
                //.antMatchers("/test").hasAnyAuthority("ADMIN","ROLE_ADMIN")//,"hasRole('ADMIN')","hasRole('ROLE_ADMIN')")
                .anyRequest().authenticated()
                .and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and().addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
		 
    }
}