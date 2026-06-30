package com.keycam.backend.security;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.keycam.backend.model.UsuarioModel;

public class UserDetailsImpl implements UserDetails {

    private final UsuarioModel usuario;

    public UserDetailsImpl(UsuarioModel usuario) {
        this.usuario = usuario;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        String rol = usuario.getRol() != null ? usuario.getRol().getNombre() : "CLIENTE";
        return List.of(new SimpleGrantedAuthority("ROLE_" + rol.toUpperCase()));
    }

    @Override
    public String getPassword() { return usuario.getPassword(); }

    @Override
    public String getUsername() { return usuario.getEmail(); }

    @Override
    public boolean isEnabled() {
        String estado = usuario.getEstado() != null ? usuario.getEstado().getNombre() : "";
        return estado.equalsIgnoreCase("Activo");
    }

    public String getRolNombre() {
        return usuario.getRol() != null ? usuario.getRol().getNombre() : "CLIENTE";
    }
}