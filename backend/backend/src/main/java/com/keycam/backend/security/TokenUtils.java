package com.keycam.backend.security;

import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

public class TokenUtils {

    private final static String TOKEN_BASE = "a6c05bd5d579650bdb5f2088a3b8ea44452929a7";
    private final static Long TOKEN_TIME = 3600L; // 1 hora

    public static String crearToken(String email, String rol) {
        long tiempoExpiracionToken = TOKEN_TIME * 1000;
        Date fechaExpiracionToken = new Date(System.currentTimeMillis() + tiempoExpiracionToken);

        Map<String, Object> extra = new HashMap<>();
        extra.put("rol", rol);

        return Jwts.builder()
                .setSubject(email)
                .setExpiration(fechaExpiracionToken)
                .addClaims(extra)
                .signWith(Keys.hmacShaKeyFor(TOKEN_BASE.getBytes()))
                .compact();
    }

    public static UsernamePasswordAuthenticationToken validarToken(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(TOKEN_BASE.getBytes())
                .build()
                .parseClaimsJws(token)
                .getBody();

        String email = claims.getSubject();
        String rol = (String) claims.get("rol");

        List<GrantedAuthority> authorities = Collections.singletonList(
                new SimpleGrantedAuthority("ROLE_" + rol.toUpperCase())
        );

        return new UsernamePasswordAuthenticationToken(email, null, authorities);
    }
}