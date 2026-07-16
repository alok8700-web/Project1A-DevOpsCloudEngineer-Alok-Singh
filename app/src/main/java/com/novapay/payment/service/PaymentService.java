package com.novapay.payment.service;

import com.novapay.payment.model.Payment;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class PaymentService {

    private final List<Payment> payments = new ArrayList<>();

    private final AtomicLong paymentId = new AtomicLong(0);

    public PaymentService() {
        payments.add(
            new Payment(
                paymentId.incrementAndGet(),
                3000,
                "CREATED",
                Instant.now()
            )
        );
    }

    public List<Payment> getPayments() {
        return payments;
    }

    public Payment createPayment(Integer amount) {
        Payment payment = new Payment(
            paymentId.incrementAndGet(),
            amount,
            "CREATED",
            Instant.now()
        );

        payments.add(payment);

        return payment;
    }

    public Payment updateStatus(Long paymentId, String newStatus) {

        Payment payment = payments.stream()
            .filter(item -> item.getId().equals(paymentId))
            .findFirst()
            .orElseThrow(() -> new RuntimeException("Payment not found"));

        String currentStatus = payment.getStatus();

        boolean validTransition =
            currentStatus.equals("CREATED")
                && newStatus.equals("PROCESSING")
            || currentStatus.equals("PROCESSING")
                && newStatus.equals("COMPLETED");

        if (!validTransition) {
            throw new IllegalStateException(
                "Invalid payment status transition: "
                    + currentStatus
                    + " -> "
                    + newStatus
            );
        }

        payment.setStatus(newStatus);

        return payment;
    }
}
