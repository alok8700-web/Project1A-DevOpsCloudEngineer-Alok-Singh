import {
  AccountBalanceWallet,
  ArrowUpward,
  BarChart,
  Dashboard,
  Logout,
  MoreHoriz,
  NotificationsNone,
  Payments,
  Send,
  Settings,
  TrendingUp,
} from "@mui/icons-material";

import {
  Alert,
  Avatar,
  Button,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  CssBaseline,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ThemeProvider,
  TextField,
  Typography,
  createTheme,
} from "@mui/material";

import { useEffect, useState } from "react";

type Payment = {
  id: number;
  amount: number;
  status: string;
  createdAt: string;
};

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#080B14",
      paper: "#101522",
    },
    primary: {
      main: "#5B8CFF",
    },
  },
  typography: {
    fontFamily: "Inter, Arial, sans-serif",
  },
  shape: {
    borderRadius: 18,
  },
});

function App() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [amount, setAmount] = useState("");
  const [creatingPayment, setCreatingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  const menuItems = [
    { label: "Dashboard", icon: <Dashboard /> },
    { label: "Payments", icon: <Payments /> },
    { label: "Transfer", icon: <Send /> },
    { label: "Analytics", icon: <BarChart /> },
  ];

  useEffect(() => {
    fetch("/api/payments")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch payments");
        }

        return response.json();
      })
      .then((data: Payment[]) => {
        setPayments(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Unable to load payment data");
        setLoading(false);
      });
  }, []);

  const totalAmount = payments.reduce(
    (total, payment) => total + payment.amount,
    0
  );

  const createdPayments = payments.filter(
    (payment) => payment.status === "CREATED"
  ).length;

  const latestPayment = payments.length
    ? [...payments].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      )[0]
    : null;

  const createPayment = async () => {
    const paymentAmount = Number(amount);

    if (!paymentAmount || paymentAmount <= 0) {
      setPaymentError("Enter a valid payment amount");
      return;
    }

    try {
      setCreatingPayment(true);
      setPaymentError("");

      const response = await fetch("/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: paymentAmount,
        }),
      });

      if (!response.ok) {
        throw new Error("Payment creation failed");
      }

      const paymentsResponse = await fetch("/api/payments");
      const updatedPayments: Payment[] = await paymentsResponse.json();

      setPayments(updatedPayments);
      setAmount("");
    } catch {
      setPaymentError("Unable to create payment");
    } finally {
      setCreatingPayment(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          background:
            "radial-gradient(circle at top right, #18264d 0%, #080B14 35%)",
        }}
      >
        <Box
          sx={{
            width: 250,
            p: 3,
            borderRight: "1px solid rgba(255,255,255,0.06)",
            display: { xs: "none", md: "block" },
          }}
        >
          <Box sx={{ mb: 6 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                background: "linear-gradient(90deg, #5B8CFF, #8C6CFF)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              NovaPay
            </Typography>

            <Typography variant="caption" color="text.secondary">
              DIGITAL BANKING
            </Typography>
          </Box>

          <List>
            {menuItems.map((item) => (
              <ListItemButton
                key={item.label}
                selected={activeMenu === item.label}
                onClick={() => setActiveMenu(item.label)}
                sx={{
                  mb: 1,
                  borderRadius: 3,
                  "&.Mui-selected": {
                    background:
                      "linear-gradient(90deg, rgba(91,140,255,0.25), rgba(91,140,255,0.05))",
                    borderLeft: "3px solid #5B8CFF",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color:
                      activeMenu === item.label
                        ? "#5B8CFF"
                        : "text.secondary",
                    minWidth: 42,
                  }}
                >
                  {item.icon}
                </ListItemIcon>

                <ListItemText
                  primary={item.label}
                  slotProps={{
                    primary: {
                      sx: {
                        fontWeight:
                          activeMenu === item.label ? 700 : 400,
                      },
                    },
                  }}
                />
              </ListItemButton>
            ))}
          </List>

          <Box sx={{ mt: 8 }}>
            <ListItemButton sx={{ mb: 1, borderRadius: 3 }}>
              <ListItemIcon sx={{ minWidth: 42 }}>
                <Settings />
              </ListItemIcon>

              <ListItemText primary="Settings" />
            </ListItemButton>

            <ListItemButton sx={{ borderRadius: 3 }}>
              <ListItemIcon sx={{ minWidth: 42 }}>
                <Logout />
              </ListItemIcon>

              <ListItemText primary="Logout" />
            </ListItemButton>
          </Box>
        </Box>

        <Box sx={{ flex: 1, p: { xs: 2, md: 4 } }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 5,
            }}
          >
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 800 }}>
                Good evening, Alok 👋
              </Typography>

              <Typography color="text.secondary" sx={{ mt: 1 }}>
                Here's what's happening with NovaPay today.
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <IconButton
                sx={{
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: 3,
                }}
              >
                <NotificationsNone />
              </IconButton>

              <Avatar
                sx={{
                  width: 44,
                  height: 44,
                  background: "linear-gradient(135deg, #5B8CFF, #8C6CFF)",
                }}
              >
                AS
              </Avatar>
            </Box>
          </Box>

          {loading && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                py: 8,
              }}
            >
              <CircularProgress />
            </Box>
          )}

          {error && (
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography color="error">{error}</Typography>
              </CardContent>
            </Card>
          )}

          {!loading && !error && (
            <>
              <Card
                sx={{
                  mb: 3,
                  background:
                    "linear-gradient(135deg, rgba(91,140,255,0.18), rgba(140,108,255,0.08))",
                  border: "1px solid rgba(91,140,255,0.2)",
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: 18,
                      mb: 0.5,
                    }}
                  >
                    Create Payment
                  </Typography>

                  <Typography
                    color="text.secondary"
                    variant="body2"
                    sx={{ mb: 3 }}
                  >
                    Create a payment through the NovaPay API
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      alignItems: "flex-start",
                      flexWrap: "wrap",
                    }}
                  >
                    <TextField
                      label="Amount"
                      placeholder="Enter amount"
                      type="number"
                      value={amount}
                      onChange={(event) => {
                        setAmount(event.target.value);
                        setPaymentError("");
                      }}
                      sx={{
                        minWidth: 260,
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 3,
                        },
                      }}
                    />

                    <Button
                      variant="contained"
                      onClick={createPayment}
                      disabled={creatingPayment}
                      sx={{
                        height: 56,
                        px: 4,
                        borderRadius: 3,
                        fontWeight: 700,
                      }}
                    >
                      {creatingPayment
                        ? "Creating..."
                        : "Create Payment"}
                    </Button>
                  </Box>

                  {paymentError && (
                    <Alert
                      severity="error"
                      sx={{ mt: 2, borderRadius: 2 }}
                    >
                      {paymentError}
                    </Alert>
                  )}
                </CardContent>
              </Card>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, 1fr)",
                    lg: "repeat(4, 1fr)",
                  },
                  gap: 2,
                  mb: 3,
                }}
              >
                <StatCard
                  title="Payment Volume"
                  value={`₹${totalAmount.toLocaleString("en-IN")}`}
                  change="Live API data"
                  icon={<AccountBalanceWallet />}
                  positive
                />

                <StatCard
                  title="Total Payments"
                  value={payments.length.toString()}
                  change="Live API data"
                  icon={<Payments />}
                  positive
                />

                <StatCard
                  title="Created Payments"
                  value={createdPayments.toString()}
                  change="Current status"
                  icon={<ArrowUpward />}
                  positive
                />

                <StatCard
                  title="Latest Payment"
                  value={
                    latestPayment
                      ? `₹${latestPayment.amount.toLocaleString("en-IN")}`
                      : "₹0"
                  }
                  change="Latest transaction"
                  icon={<TrendingUp />}
                  positive
                />
              </Box>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    lg: "1.5fr 1fr",
                  },
                  gap: 3,
                  mb: 3,
                }}
              >
                <Card
                  sx={{
                    minHeight: 270,
                    background:
                      "linear-gradient(135deg, #1E3A8A 0%, #312E81 55%, #111827 100%)",
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Typography color="rgba(255,255,255,0.7)">
                      NovaPay Payment Volume
                    </Typography>

                    <Typography
                      variant="h3"
                      sx={{
                        mt: 2,
                        fontWeight: 800,
                      }}
                    >
                      ₹{totalAmount.toLocaleString("en-IN")}
                    </Typography>

                    <Typography
                      color="rgba(255,255,255,0.7)"
                      sx={{ mt: 2 }}
                    >
                      Calculated from live payment records
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        gap: 6,
                        mt: 5,
                      }}
                    >
                      <Box>
                        <Typography
                          variant="caption"
                          color="rgba(255,255,255,0.6)"
                        >
                          PAYMENTS
                        </Typography>

                        <Typography sx={{ mt: 1 }}>
                          {payments.length}
                        </Typography>
                      </Box>

                      <Box>
                        <Typography
                          variant="caption"
                          color="rgba(255,255,255,0.6)"
                        >
                          API STATUS
                        </Typography>

                        <Typography sx={{ mt: 1 }}>
                          CONNECTED
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>

                <Card sx={{ minHeight: 270 }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 3,
                      }}
                    >
                      <Box>
                        <Typography
                          sx={{
                            fontWeight: 700,
                            fontSize: 18,
                          }}
                        >
                          Payment Overview
                        </Typography>

                        <Typography
                          color="text.secondary"
                          variant="body2"
                        >
                          Live backend data
                        </Typography>
                      </Box>

                      <IconButton>
                        <MoreHoriz />
                      </IconButton>
                    </Box>

                    <Box
                      sx={{
                        height: 130,
                        display: "flex",
                        alignItems: "end",
                        gap: 1.5,
                        px: 1,
                      }}
                    >
                      {payments.length === 0 ? (
                        <Typography color="text.secondary">
                          No payments available
                        </Typography>
                      ) : (
                        payments.slice(-12).map((payment) => (
                          <Box
                            key={payment.id}
                            sx={{
                              flex: 1,
                              height: `${Math.min(
                                Math.max(payment.amount / 50, 15),
                                100
                              )}%`,
                              borderRadius: "6px 6px 2px 2px",
                              background: "#5B8CFF",
                            }}
                          />
                        ))
                      )}
                    </Box>

                    <Divider sx={{ mt: 2, mb: 2 }} />

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        color="text.secondary"
                        variant="body2"
                      >
                        Backend status
                      </Typography>

                      <Typography
                        sx={{
                          fontWeight: 700,
                          color: "#4ADE80",
                        }}
                      >
                        ONLINE
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Box>

              <Card>
                <CardContent sx={{ p: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 3,
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: 18,
                        }}
                      >
                        Recent Payments
                      </Typography>

                      <Typography
                        color="text.secondary"
                        variant="body2"
                      >
                        Live data from Spring Boot API
                      </Typography>
                    </Box>

                    <Chip
                      label="API Connected"
                      sx={{
                        color: "#4ADE80",
                        background: "rgba(34,197,94,0.1)",
                      }}
                    />
                  </Box>

                  {payments.length === 0 && (
                    <Typography color="text.secondary">
                      No payments found.
                    </Typography>
                  )}

                  {[...payments]
                    .sort(
                      (a, b) =>
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime()
                    )
                    .map((payment, index) => (
                      <Box key={payment.id}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            py: 2,
                          }}
                        >
                          <Avatar
                            sx={{
                              mr: 2,
                              background:
                                "rgba(91,140,255,0.15)",
                              color: "#5B8CFF",
                            }}
                          >
                            ₹
                          </Avatar>

                          <Box sx={{ flex: 1 }}>
                            <Typography
                              sx={{ fontWeight: 600 }}
                            >
                              Payment #{payment.id}
                            </Typography>

                            <Typography
                              variant="body2"
                              color="text.secondary"
                            >
                              {payment.status} •{" "}
                              {new Date(
                                payment.createdAt
                              ).toLocaleString("en-IN")}
                            </Typography>
                          </Box>

                          <Typography
                            sx={{
                              fontWeight: 700,
                              color: "#4ADE80",
                            }}
                          >
                            +₹
                            {payment.amount.toLocaleString(
                              "en-IN"
                            )}
                          </Typography>
                        </Box>

                        {index !== payments.length - 1 && (
                          <Divider />
                        )}
                      </Box>
                    ))}
                </CardContent>
              </Card>
            </>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

function StatCard({
  title,
  value,
  change,
  icon,
  positive,
}: {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  positive?: boolean;
}) {
  return (
    <Card
      sx={{
        background: "rgba(16,21,34,0.75)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography color="text.secondary" variant="body2">
            {title}
          </Typography>

          <Box sx={{ color: "#5B8CFF" }}>{icon}</Box>
        </Box>

        <Typography
          variant="h5"
          sx={{
            mt: 2,
            fontWeight: 800,
          }}
        >
          {value}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            mt: 1,
            color: positive ? "#4ADE80" : "#F87171",
            fontWeight: 600,
          }}
        >
          {change}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default App;
