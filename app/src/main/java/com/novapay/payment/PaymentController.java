package com.novapay.payment;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PaymentController {
  @GetMapping("/health")
  public Map<String, String> health() { return Map.of("status", "UP"); }

  @GetMapping("/payments")
  public List<Map<String, Object>> payments() {
    return List.of(Map.of("id", 1, "amount", 2000, "status", "CREATED", "createdAt", Instant.now().toString()));
  }

  @PostMapping("/payments")
  public Map<String, Object> create(@RequestBody Map<String, Object> request) {
    return Map.of("id", 2, "amount", request.getOrDefault("amount", 0), "status", "CREATED", "createdAt", Instant.now().toString());
  }
}
