package com.keycam.backend.repository;
 
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.keycam.backend.model.ClienteModel;
 
@Repository
public interface ClienteRepository extends JpaRepository<ClienteModel, Long> {
    ClienteModel findByEmail(String email);
}
 