package com.keycam.backend.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.util.Base64Utils;
import java.util.HashMap;
import java.util.Map;

@Service
public class NiubizService {

    @Value("${niubiz.usuario}")
    private String usuario;

    @Value("${niubiz.clave}")
    private String clave;

    @Value("${niubiz.merchantId}")
    private String merchantId;

    private final RestTemplate restTemplate = new RestTemplate();

    public String generarTokenAcceso() {
        String credenciales = usuario + ":" + clave;
        String auth = "Basic " + Base64Utils.encodeToString(credenciales.getBytes());

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", auth);
        headers.set("Accept", "text/plain");

        HttpEntity<Void> request = new HttpEntity<>(headers);
        String url = "https://apisandbox.vnforappstest.com/api.security/v1/security";

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, request, String.class);
        return response.getBody();
    }

    public Map<String, Object> generarTokenSesion(String tokenAcceso, Double monto) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", tokenAcceso);
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> body = Map.of("channel", "web", "amount", monto);
        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

        String url = "https://apisandbox.vnforappstest.com/api.ecommerce/v2/ecommerce/token/session/" + merchantId;

        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, request, Map.class);
        return response.getBody();
    }

    public Map<String, Object> autorizarTransaccion(String tokenAcceso, String tokenId,
                                                      String purchaseNumber, Double monto) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", tokenAcceso);
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> order = Map.of(
            "tokenId", tokenId,
            "purchaseNumber", purchaseNumber,
            "amount", monto,
            "currency", "PEN"
        );

        Map<String, Object> body = new HashMap<>();
        body.put("channel", "web");
        body.put("captureType", "manual");
        body.put("countable", true);
        body.put("order", order);
        body.put("urlAddress", "http://localhost:4200");
        body.put("serviceLocationCityName", "Lima");
        body.put("serviceLocationCountrySubdivisionCode", "LIM");
        body.put("serviceLocationCountryCode", "PE");
        body.put("serviceLocationPostalCode", "15001");

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);
        String url = "https://apisandbox.vnforappstest.com/api.authorization/v3/authorization/ecommerce/" + merchantId;

        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, request, Map.class);
        return response.getBody();
    }
}