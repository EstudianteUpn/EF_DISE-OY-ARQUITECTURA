package com.keycam.backend.services;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.keycam.backend.dto.RegistroClienteDTO;
import com.keycam.backend.model.ClienteModel;
import com.keycam.backend.model.Estado_usuarioModel;
import com.keycam.backend.model.RolModel;
import com.keycam.backend.model.UsuarioModel;
import com.keycam.backend.repository.ClienteRepository;
import com.keycam.backend.repository.Estado_usuarioRepository;
import com.keycam.backend.repository.RolRepository;
import com.keycam.backend.repository.UsuarioRepository;
import com.keycam.backend.model.TelefonoModel;
import com.keycam.backend.repository.TelefonoRepository;

@Service
public class UsuarioServices {

    @Autowired
    UsuarioRepository usuarioRepository;
    @Autowired
    ClienteRepository clienteRepository;
    @Autowired
    RolRepository rolRepository;
    @Autowired
    Estado_usuarioRepository estadoUsuarioRepository;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    TelefonoRepository telefonoRepository;

    public ArrayList<UsuarioModel> listar() {
        return (ArrayList<UsuarioModel>) usuarioRepository.findAll();
    }

    public UsuarioModel nuevo(UsuarioModel usuario) {
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        return usuarioRepository.save(usuario);
    }

    public Optional<UsuarioModel> obtenerPorId(Long id) {
        return usuarioRepository.findById(id);
    }

    public UsuarioModel actualizar(Long id, UsuarioModel usuario) {
        usuario.setId(id);
        if (usuario.getPassword() != null && !usuario.getPassword().isBlank()) {
            usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        } else {
            usuarioRepository.findById(id).ifPresent(actual -> usuario.setPassword(actual.getPassword()));
        }
        return usuarioRepository.save(usuario);
    }

    public void eliminar(Long id) {
        usuarioRepository.deleteById(id);
    }

    public UsuarioModel registrarCliente(RegistroClienteDTO datos) {
        ClienteModel cliente = new ClienteModel();
        cliente.setNombre(datos.getNombre());
        cliente.setApellido_paterno(datos.getApellidoPaterno());
        cliente.setApellido_materno(datos.getApellidoMaterno());
        cliente.setDni(datos.getDni());
        cliente.setEmail(datos.getEmail());
        cliente = clienteRepository.save(cliente);

        if (datos.getTelefono() == null || !datos.getTelefono().matches("\\d{9}")) {
            throw new RuntimeException("El teléfono debe tener 9 dígitos");
        }

        TelefonoModel telefono = new TelefonoModel();
        telefono.setNumero(datos.getTelefono());
        telefono.setTipo(datos.getTipoTelefono() != null ? datos.getTipoTelefono() : "Celular");
        telefono.setCliente(cliente);
        telefonoRepository.save(telefono);

        RolModel rolCliente = rolRepository.findByNombre("Cliente")
                .orElseThrow(() -> new RuntimeException("No existe el rol 'Cliente' en la tabla rol"));

        Estado_usuarioModel estadoActivo = estadoUsuarioRepository.findByNombre("Activo")
                .orElseThrow(() -> new RuntimeException("No existe el estado 'Activo' en la tabla estado_usuario"));

        UsuarioModel usuario = new UsuarioModel();
        usuario.setEmail(datos.getEmail());
        usuario.setPassword(passwordEncoder.encode(datos.getPassword()));
        usuario.setCliente(cliente);
        usuario.setRol(rolCliente);
        usuario.setEstado(estadoActivo);

        return usuarioRepository.save(usuario);
    }

    public UsuarioModel obtenerPorEmail(String email) {
        return usuarioRepository.findByEmail(email).orElse(null);
    }
}