package com.novapay.payment;

import com.novapay.payment.model.Payment;
import com.novapay.payment.service.PaymentService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.Instant;
import java.util.List;
import java.util.Map;

import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(PaymentController.class)
class PaymentControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PaymentService paymentService;

    @Test
    void shouldReturnHealthyStatus() throws Exception {

        mockMvc.perform(get("/health"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.status").value("UP"));
    }

    @Test
    void shouldReturnAllPayments() throws Exception {

        Payment payment = new Payment(
            1000,
            "CREATED",
            Instant.now()
        );

        when(paymentService.getPayments())
            .thenReturn(List.of(payment));

        mockMvc.perform(get("/payments"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$[0].amount").value(1000))
            .andExpect(jsonPath("$[0].status").value("CREATED"));
    }

    @Test
    void shouldCreatePayment() throws Exception {

        Payment payment = new Payment(
            1000,
            "CREATED",
            Instant.now()
        );

        when(paymentService.createPayment(anyInt()))
            .thenReturn(payment);

        mockMvc.perform(
                post("/payments")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content("{\"amount\":1000}")
            )
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.amount").value(1000))
            .andExpect(jsonPath("$.status").value("CREATED"));
    }

    @Test
    void shouldUpdatePaymentStatus() throws Exception {

        Payment payment = new Payment(
            1000,
            "PROCESSING",
            Instant.now()
        );

        when(paymentService.updateStatus(eq(1L), eq("PROCESSING")))
            .thenReturn(payment);

        mockMvc.perform(
                patch("/payments/1/status")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content("{\"status\":\"PROCESSING\"}")
            )
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.status").value("PROCESSING"));
    }
}
