package com.keycam.backend.repository;
 
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.keycam.backend.model.Direccion_clienteModel;

import java.util.List;
 
@Repository
public interface Direccion_clienteRepository extends JpaRepository<Direccion_clienteModel, Long> {
    List<Direccion_clienteModel> findByClienteId(Long idCliente);
}
 