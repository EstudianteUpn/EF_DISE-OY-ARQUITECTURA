package com.keycam.backend.services;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.keycam.backend.model.Movimiento_bancarioModel;
import com.keycam.backend.repository.Movimiento_bancarioRepository;

@Service
public class Movimiento_bancarioService {
    @Autowired
    Movimiento_bancarioRepository movimiento_bancarioRepository;

    public ArrayList<Movimiento_bancarioModel> listar() {
        return (ArrayList<Movimiento_bancarioModel>) movimiento_bancarioRepository.findAll();
    }

    public Movimiento_bancarioModel nuevo(Movimiento_bancarioModel movimiento_bancario) {
        return movimiento_bancarioRepository.save(movimiento_bancario);
    }

    public Optional<Movimiento_bancarioModel> obtenerPorId(Long id) {
        return movimiento_bancarioRepository.findById(id);
    }
}
