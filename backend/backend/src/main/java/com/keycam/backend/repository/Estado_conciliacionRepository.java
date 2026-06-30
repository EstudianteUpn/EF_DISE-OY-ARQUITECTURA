package com.keycam.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.keycam.backend.model.Estado_conciliacionModel;

@Repository
public interface Estado_conciliacionRepository extends JpaRepository<Estado_conciliacionModel, Long> {

    
}
