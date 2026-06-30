package com.keycam.backend.services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.keycam.backend.model.Estado_usuarioModel;
import com.keycam.backend.repository.Estado_usuarioRepository;

@Service
public class Estado_usuarioService {

    @Autowired
    Estado_usuarioRepository estado_usuarioRepository;

    public ArrayList<Estado_usuarioModel> listar() {
        return (ArrayList<Estado_usuarioModel>) estado_usuarioRepository.findAll();
    }

    public Estado_usuarioModel nuevo(Estado_usuarioModel estado_usuario) {
        return estado_usuarioRepository.save(estado_usuario);
    }

    public Estado_usuarioModel actualizar(Long id, Estado_usuarioModel estado_usuario) {
        estado_usuario.setId(id);
        return estado_usuarioRepository.save(estado_usuario);
}

    public void eliminar(Long id) {
        estado_usuarioRepository.deleteById(id);
    }
}