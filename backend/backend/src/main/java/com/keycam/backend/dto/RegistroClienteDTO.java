package com.keycam.backend.dto;

public class RegistroClienteDTO {
    private String nombre;
    private String apellidoPaterno;
    private String apellidoMaterno;
    private String dni;
    private String email;
    private String password;
    private String telefono;
    private String tipoTelefono;

    public String getNombre() { 
        return nombre; 
    }
    public void setNombre(String nombre) { 
        this.nombre = nombre; 
    }
    public String getApellidoPaterno() { 
        return apellidoPaterno; 
    }
    public void setApellidoPaterno(String apellidoPaterno) { 
        this.apellidoPaterno = apellidoPaterno; 
    }
    public String getApellidoMaterno() { 
        return apellidoMaterno; 
    }
    public void setApellidoMaterno(String apellidoMaterno) { 
        this.apellidoMaterno = apellidoMaterno; 
    }
    public String getDni() { 
        return dni; 
    }
    public void setDni(String dni) { 
        this.dni = dni; 
    }
    public String getEmail() { 
        return email; 
    }
    public void setEmail(String email) { 
        this.email = email; 
    }
    public String getPassword() { 
        return password; 
    }
    public void setPassword(String password) { 
        this.password = password; 
    }
    public String getTelefono() {
    return telefono;
    }
    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }
    public String getTipoTelefono() {
        return tipoTelefono;
    }
    public void setTipoTelefono(String tipoTelefono) {
        this.tipoTelefono = tipoTelefono;
    }
}
