package com.keycam.backend.controller;

import com.keycam.backend.model.Estado_pagoModel;
import com.keycam.backend.model.PagoModel;
import com.keycam.backend.model.PedidoModel;
import com.keycam.backend.model.Transaccion_pago_onlineModel;
import com.keycam.backend.repository.Estado_pagoRepository;
import com.keycam.backend.repository.PagoRepository;
import com.keycam.backend.repository.Transaccion_pago_onlineRepository;
import com.keycam.backend.services.NiubizService;
import com.keycam.backend.services.PedidoService; 
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api/niubiz")
public class NiubizController {

    private final NiubizService niubizService;
    private final PedidoService pedidoService;
    private final PagoRepository pagoRepository;
    private final Estado_pagoRepository estadoPagoRepository;
    private final Transaccion_pago_onlineRepository transaccionPagoOnlineRepository;

    public NiubizController(NiubizService niubizService, PedidoService pedidoService,
                            PagoRepository pagoRepository, Estado_pagoRepository estadoPagoRepository,
                            Transaccion_pago_onlineRepository transaccionPagoOnlineRepository) {
        this.niubizService = niubizService;
        this.pedidoService = pedidoService;
        this.pagoRepository = pagoRepository;
        this.estadoPagoRepository = estadoPagoRepository;
        this.transaccionPagoOnlineRepository = transaccionPagoOnlineRepository;
    }

    @PostMapping("/sesion")
    public Map<String, Object> crearSesion(@RequestBody Map<String, Object> req) {
        Double monto = Double.valueOf(req.get("monto").toString());
        String tokenAcceso = niubizService.generarTokenAcceso();
        return niubizService.generarTokenSesion(tokenAcceso, monto);
    }

    @PostMapping("/callback")
    public void callback(
            @RequestParam("transactionToken") String transactionToken,
            @RequestParam("customerEmail") String customerEmail,
            @RequestParam("channel") String channel,
            @RequestParam("pedidoId") Long pedidoId,
            HttpServletResponse response) throws IOException {

        PedidoModel pedido = pedidoService.obtenerPorId(pedidoId)
                .orElseThrow(() -> new RuntimeException("Pedido no encontrado: " + pedidoId));
        Double monto = pedido.getTotal();

        String tokenAcceso = niubizService.generarTokenAcceso();
        Map<String, Object> resultado = niubizService.autorizarTransaccion(
                tokenAcceso, transactionToken, pedidoId.toString(), monto);

        System.out.println("RESPUESTA AUTORIZACION: " + resultado);

        Map<String, Object> order = (Map<String, Object>) resultado.get("order");
        String actionCode = order != null ? (String) order.get("actionCode") : null;
        boolean aprobado = "000".equals(actionCode);

        // Buscar el Pago asociado a este pedido
        PagoModel pago = pagoRepository.findByPedido_Id(pedidoId)
                .orElseThrow(() -> new RuntimeException("Pago no encontrado para pedido: " + pedidoId));

        // Actualizar estado del pago
        Long idEstadoPago = aprobado ? 2L : 3L; // 2=Pagado, 3=Rechazado
        Estado_pagoModel estadoPago = estadoPagoRepository.findById(idEstadoPago)
                .orElseThrow(() -> new RuntimeException("Estado de pago no encontrado: " + idEstadoPago));
        pago.setEstado(estadoPago);
        pagoRepository.save(pago);

        // Guardar la transacción online
        Transaccion_pago_onlineModel transaccion = new Transaccion_pago_onlineModel();
        transaccion.setPago(pago);
        transaccion.setCodigo_transaccion(transactionToken);
        transaccion.setMedio_pago("TARJETA");
        transaccion.setMoneda("PEN");
        transaccion.setEstado_transaccion(aprobado ? "APROBADO" : "RECHAZADO");
        transaccion.setFecha_transaccion(LocalDateTime.now());

        if (aprobado && order != null) {
            transaccion.setNumero_operacion((String) order.get("transactionId"));
            transaccion.setAutorizacion((String) order.get("authorizationCode"));
            transaccion.setFecha_abono(LocalDateTime.now());
        }

        transaccionPagoOnlineRepository.save(transaccion);

        String estado = aprobado ? "APROBADO" : "RECHAZADO";
        response.sendRedirect("http://localhost:4200/checkout-resultado?pedidoId=" + pedidoId + "&estado=" + estado);
    }
}