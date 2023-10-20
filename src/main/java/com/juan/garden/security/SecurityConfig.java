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
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.juan.garden.services.CustomUserDetailsService;

@EnableWebSecurity(debug = true)
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true, jsr250Enabled = true)

@Configuration
//@EnableWebSecurity
//@EnableGlobalMethodSecurity
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
    public AuthenticationManager authenticationManager(HttpSecurity http, BCryptPasswordEncoder passwordEncoder)
            throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
        authenticationManagerBuilder.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
        return authenticationManagerBuilder.build();
    }
	@Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .authorizeRequests()
                .antMatchers("/home/**").permitAll()
                .antMatchers("/auth/**").permitAll()
                .antMatchers("/chat").permitAll()//hasAnyRole("USER","ADMIN")
                //.antMatchers("/test").hasRole("ADMIN")
                //.antMatchers("/test").access("hasRole('ROLE_ADMIN')")
                //.antMatchers("/test").hasAnyAuthority("ADMIN","ROLE_ADMIN")//,"hasRole('ADMIN')","hasRole('ROLE_ADMIN')")
                .anyRequest().authenticated()
                .and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and().addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
		 
    }
    /*
    @SuppressWarnings("deprecation")
    @Bean
    public NoOpPasswordEncoder passwordEncoder() {
        return (NoOpPasswordEncoder) NoOpPasswordEncoder.getInstance();
    }

	/*
	/**public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
    return httpSecurity
        .csrf(csrf -> csrf.disable())
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/token/**").permitAll()
            .anyRequest().authenticated()
        )
        .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .oauth2ResourceServer(OAuth2ResourceServerConfigurer::jwt)
        .httpBasic(Customizer.withDefaults())
        .build();
} */
}
/* 
@Bean
SecurityFilterChain web(HttpSecurity http) throws Exception {
	http
		.authorizeHttpRequests((authorize) -> authorize
			.requestMatchers("/endpoint").hasAuthority('USER')
			.anyRequest().authenticated()
		)
        // ...

	return http.build();
}
/*
 * 
	@Autowired private UserRepository userRepo;
	
	@Autowired private JwtTokenFilter jwtTokenFilter;

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(username -> userRepo.findByEmail(username)
				.orElseThrow(() -> new UsernameNotFoundException("User " + username + " not found.")));
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable();
		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		
		http.authorizeRequests()
				.antMatchers("/auth/login", "/docs/**", "/users").permitAll()
				.anyRequest().authenticated();
		
        http.exceptionHandling()
                .authenticationEntryPoint(
                    (request, response, ex) -> {
                        response.sendError(
                            HttpServletResponse.SC_UNAUTHORIZED,
                            ex.getMessage()
                        );
                    }
                );
        
		http.addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class);
	}

	@Override
	@Bean
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}
 */