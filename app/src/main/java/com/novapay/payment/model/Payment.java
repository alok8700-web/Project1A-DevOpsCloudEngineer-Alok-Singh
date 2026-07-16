package com.novapay.payment.model;

import java.time.Instant;

public class Payment {

    private Long id;
    private Integer amount;
    private String status;
    private Instant createdAt;

    public Payment() {
    }

    public Payment(Long id, Integer amount, String status, Instant createdAt) {
        this.id = id;
        this.amount = amount;
        this.status = status;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public Integer getAmount() {
        return amount;
    }

    public String getStatus() {
        return status;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }
}
