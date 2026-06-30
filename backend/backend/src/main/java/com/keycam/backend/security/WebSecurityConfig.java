package com.keycam.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.Arrays;

@Configuration
public class WebSecurityConfig {

    private final UserDetailsService userDetailsService;

    public WebSecurityConfig(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http, AuthenticationManager authManager) throws Exception {

        JWTAuthenticationFilter jaf = new JWTAuthenticationFilter();
        jaf.setAuthenticationManager(authManager);
        jaf.setRequiresAuthenticationRequestMatcher(new AntPathRequestMatcher("/login", "POST"));

        JWTAuthorizationFilter jwtf = new JWTAuthorizationFilter(authManager);

        return http.csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .requestMatchers("/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/usuario/registro").permitAll()
                        .requestMatchers("/api/niubiz/**").permitAll()   
                
                
               
                .requestMatchers(HttpMethod.GET,
                        "/productos/**", "/categoria_productos/**", "/estado_productos/**", 
                        "/tipo_entrega/**", "/tipo_pago/**").permitAll()

                .requestMatchers(
                        "/pedido/**", "/detalle_pedido/**", "/direcciones_cliente/**",
                        "/telefonos/**", "/pago/**"
                ).authenticated()

                .requestMatchers(HttpMethod.GET, "/clientes/email/**").authenticated()
                .requestMatchers(HttpMethod.GET, "/usuario/email/**").authenticated()

                .requestMatchers(
                        "/usuario/**", "/clientes/**", "/stock/**", "/conciliacion_pago/**",
                        "/movimiento_bancario/**", "/transaccion_pago_online/**",
                        "/historial_estado_pedido/**", "/historial_estado_entrega/**",
                        "/entrega/**", "/rol/**", "/estado_usuarios/**", "estado_pedido/**",
                        "/estado_entrega/**", "/estado_pago/**", "/estado_conciliacion/**",
                        "/productos/**", "/categoria_productos/**", "/estado_productos/**"
                ).hasAnyRole("ADMIN", "TRABAJADOR")

                .anyRequest().authenticated()
        )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilter(jaf)
                .addFilter(jwtf)
                .build();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder amb = http.getSharedObject(AuthenticationManagerBuilder.class);
        amb.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
        return amb.build();
    }
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Origin", "Content-Type", "X-Requested-With", "Authorization", "Accept"));
        configuration.setExposedHeaders(Arrays.asList("Authorization"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}