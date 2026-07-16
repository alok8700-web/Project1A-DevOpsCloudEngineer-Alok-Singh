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
}
