package kubernetes

deny[msg] {
  input.kind == "Pod"
  not input.spec.securityContext.runAsNonRoot
  msg = "Container must not run as root"
}
