package com.keycam.backend.services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.keycam.backend.model.RolModel;
import com.keycam.backend.repository.RolRepository;

@Service
public class RolService {
    @Autowired
    RolRepository rolRepository;

    public ArrayList<RolModel> listar() {
        return (ArrayList<RolModel>) rolRepository.findAll();
    }

    public RolModel nuevo(RolModel rol) {
        return rolRepository.save(rol);
    }

    public RolModel actualizar(Long id, RolModel rol) {
        rol.setId(id);
        return rolRepository.save(rol);
    }   

    public void eliminar(Long id) {
        rolRepository.deleteById(id);
    }
}
