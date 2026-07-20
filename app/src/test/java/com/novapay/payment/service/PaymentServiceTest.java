package com.novapay.payment.service;

import com.novapay.payment.model.Payment;
import com.novapay.payment.repository.PaymentRepository;
import io.micrometer.core.instrument.simple.SimpleMeterRegistry;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.Instant;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PaymentServiceTest {

    private PaymentRepository paymentRepository;
    private PaymentService paymentService;

    @BeforeEach
    void setUp() {
        paymentRepository = mock(PaymentRepository.class);

        paymentService = new PaymentService(
            paymentRepository,
            new SimpleMeterRegistry()
        );
    }

    @Test
    void shouldCreatePaymentWithCreatedStatus() {

        Payment savedPayment = new Payment(
            1000,
            "CREATED",
            Instant.now()
        );

        when(paymentRepository.save(any(Payment.class)))
            .thenReturn(savedPayment);

        Payment result = paymentService.createPayment(1000);

        assertNotNull(result);
        assertEquals(1000, result.getAmount());
        assertEquals("CREATED", result.getStatus());

        verify(paymentRepository).save(any(Payment.class));
    }

    @Test
    void shouldMovePaymentFromCreatedToProcessing() {

        Payment payment = new Payment(
            1000,
            "CREATED",
            Instant.now()
        );

        when(paymentRepository.findById(1L))
            .thenReturn(Optional.of(payment));

        when(paymentRepository.save(payment))
            .thenReturn(payment);

        Payment result =
            paymentService.updateStatus(1L, "PROCESSING");

        assertEquals("PROCESSING", result.getStatus());

        verify(paymentRepository).save(payment);
    }

    @Test
    void shouldMovePaymentFromProcessingToCompleted() {

        Payment payment = new Payment(
            1000,
            "PROCESSING",
            Instant.now()
        );

        when(paymentRepository.findById(1L))
            .thenReturn(Optional.of(payment));

        when(paymentRepository.save(payment))
            .thenReturn(payment);

        Payment result =
            paymentService.updateStatus(1L, "COMPLETED");

        assertEquals("COMPLETED", result.getStatus());
    }

    @Test
    void shouldRejectInvalidStatusTransition() {

        Payment payment = new Payment(
            1000,
            "CREATED",
            Instant.now()
        );

        when(paymentRepository.findById(1L))
            .thenReturn(Optional.of(payment));

        assertThrows(
            IllegalStateException.class,
            () -> paymentService.updateStatus(1L, "COMPLETED")
        );

        verify(paymentRepository, never()).save(any());
    }

    @Test
    void shouldRejectUnknownPayment() {

        when(paymentRepository.findById(999L))
            .thenReturn(Optional.empty());

        assertThrows(
            RuntimeException.class,
            () -> paymentService.updateStatus(999L, "PROCESSING")
        );
    }

    @Test
    void shouldReturnAllPayments() {

        Payment payment = new Payment(
            1000,
            "CREATED",
            Instant.now()
        );

        when(paymentRepository.findAll())
            .thenReturn(java.util.List.of(payment));

        var result = paymentService.getPayments();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(1000, result.get(0).getAmount());
        assertEquals("CREATED", result.get(0).getStatus());

        verify(paymentRepository).findAll();
    }

}
