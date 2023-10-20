package com.juan.garden.util;

import java.util.Date;
import java.util.concurrent.TimeUnit;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import com.juan.garden.model.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

@Component
public class JwtUtil {
    private final String secret_key = "mysecretkey";
    private long accessTokenValidity = 60*60*1000;
    //private static final long EXPIRE_DURATION = 24 * 60 * 60 * 1000; // 24 hour
    private final JwtParser jwtParser;

    private final String TOKEN_HEADER = "Authorization";
    private final String TOKEN_PREFIX = "Bearer ";

    public JwtUtil(){
        this.jwtParser = Jwts.parser().setSigningKey(secret_key);
    }/*
    public String createToken(User user) {
        Claims claims = Jwts.claims().setSubject(user.getUsername());
        claims.put("displayName",user.getUsername());
        //claims.put("lastName",user.getLastName());
        claims.put("roles", user);
        Date tokenCreateTime = new Date();
        Date tokenValidity = new Date(tokenCreateTime.getTime() + TimeUnit.MINUTES.toMillis(accessTokenValidity));
        return Jwts.builder()
                .setClaims(claims)
                .setExpiration(tokenValidity)
                .signWith(SignatureAlgorithm.HS256, secret_key)
                .compact();
    } */
    public String createToken(Authentication userAuth) {
        try {
            Claims claims = Jwts.claims().setSubject(userAuth.getName());
            claims.put("displayName",userAuth.getName());
            claims.put("roles", userAuth.getAuthorities().toString());
            Date tokenCreateTime = new Date();
            Date tokenValidity = new Date(tokenCreateTime.getTime() + TimeUnit.MINUTES.toMillis(accessTokenValidity));
            return Jwts.builder()
                    .setClaims(claims)
                    .setExpiration(tokenValidity)
                    .signWith(SignatureAlgorithm.HS256, secret_key)
                    .compact();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "bad token", e);
        }
        
    }
    public boolean validateAccessToken(String token) {
		try {
			Jwts.parser().setSigningKey(secret_key).parseClaimsJws(token);
			return true;
		} catch (ExpiredJwtException ex) {
			//LOGGER.error("JWT expired", ex.getMessage());
		} catch (IllegalArgumentException ex) {
			//LOGGER.error("Token is null, empty or only whitespace", ex.getMessage());
		} catch (MalformedJwtException ex) {
			//LOGGER.error("JWT is invalid", ex);
		} catch (UnsupportedJwtException ex) {
			//LOGGER.error("JWT is not supported", ex);
		} catch (SignatureException ex) {
			//LOGGER.error("Signature validation failed");
		}
		
		return false;
	}
    public Claims parseClaims(String token) {
		return Jwts.parser()
				.setSigningKey(secret_key)
				.parseClaimsJws(token)
				.getBody();
	}
    public String getSubject(String token) {
		return parseClaims(token).getSubject();
	}
}
