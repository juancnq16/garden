package com.juan.garden.controllers;

import org.springframework.security.core.Authentication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import com.juan.garden.dto.AccessDTO;
import com.juan.garden.dto.ErrorDTO;
import com.juan.garden.dto.LoginDTO;
import com.juan.garden.util.JwtUtil;

@Controller
@RequestMapping("/auth")
/**
 * Controller for authentication related actions
 */
public class AuthController {
    private final AuthenticationManager authenticationManager;   
    private JwtUtil jwtUtil;
    /**
     * Builder that injects jwt authentication classes
     * @param authenticationManager
     * @param jwtUtil
     */
    public AuthController(AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }
    @ResponseBody
    @RequestMapping(value = "/login",method = RequestMethod.POST)
    /**
     * Web service for authentication
     * @param loginReq
     * Login dto containing username and password
     * @return
     * returns the authentication token which will be used for
     * user actions
     */
    public ResponseEntity login(@RequestBody LoginDTO loginReq)  {

        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginReq.getUsername(), loginReq.getPassword()));
            String token = jwtUtil.createToken(authentication);
            AccessDTO access = new AccessDTO(authentication.getName(),token);

            return ResponseEntity.ok(access);

        }catch (BadCredentialsException e){
            ErrorDTO errorResponse = new ErrorDTO(HttpStatus.BAD_REQUEST,"Invalid username or password");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }catch (Exception e){
            ErrorDTO errorResponse = new ErrorDTO(HttpStatus.BAD_REQUEST, e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }
    
}
