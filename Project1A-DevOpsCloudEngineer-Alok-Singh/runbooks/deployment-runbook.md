# Deployment Runbook
1. Validate CI pipeline status.
2. Deploy via Helm.
3. Verify health, error rate, and latency.
4. Roll back if error rate > 5%.
