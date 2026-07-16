package com.novapay.payment;

import com.novapay.payment.model.Payment;
import com.novapay.payment.service.PaymentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @GetMapping("/health")
    public Map<String, String> health() {
        return Map.of("status", "UP");
    }

    @GetMapping("/payments")
    public List<Payment> payments() {
        return paymentService.getPayments();
    }

    @PostMapping("/payments")
    public Payment create(@RequestBody Map<String, Object> request) {

        Integer amount = ((Number) request.getOrDefault("amount", 0))
            .intValue();

        return paymentService.createPayment(amount);
    }

    @PatchMapping("/payments/{id}/status")
    public Payment updateStatus(
        @PathVariable Long id,
        @RequestBody Map<String, String> request
    ) {
        return paymentService.updateStatus(
            id,
            request.get("status")
        );
    }
}
