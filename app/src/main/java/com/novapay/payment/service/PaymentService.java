package com.novapay.payment.service;

import com.novapay.payment.model.Payment;
import com.novapay.payment.repository.PaymentRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;

    public PaymentService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    public List<Payment> getPayments() {
        return paymentRepository.findAll();
    }

    public Payment createPayment(Integer amount) {
        Payment payment = new Payment(
            amount,
            "CREATED",
            Instant.now()
        );

        return paymentRepository.save(payment);
    }

    public Payment updateStatus(Long paymentId, String newStatus) {

        Payment payment = paymentRepository.findById(paymentId)
            .orElseThrow(
                () -> new RuntimeException("Payment not found")
            );

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

        return paymentRepository.save(payment);
    }
}
