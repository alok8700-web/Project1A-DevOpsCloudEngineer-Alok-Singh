import {
  AccountBalanceWallet,
  ArrowDownward,
  ArrowUpward,
  BarChart,
  CreditCard,
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
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  CssBaseline,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";

import { useState } from "react";

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

const transactions = [
  {
    name: "Netflix",
    category: "Entertainment",
    amount: "-₹649.00",
    icon: "N",
    type: "expense",
    date: "Today, 10:32 AM",
  },
  {
    name: "Salary Credit",
    category: "Income",
    amount: "+₹85,000.00",
    icon: "₹",
    type: "income",
    date: "Yesterday, 09:15 AM",
  },
  {
    name: "Amazon",
    category: "Shopping",
    amount: "-₹2,499.00",
    icon: "A",
    type: "expense",
    date: "May 18, 05:45 PM",
  },
  {
    name: "Uber",
    category: "Transport",
    amount: "-₹349.00",
    icon: "U",
    type: "expense",
    date: "May 17, 08:20 PM",
  },
];

function App() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  const menuItems = [
    { label: "Dashboard", icon: <Dashboard /> },
    { label: "Payments", icon: <Payments /> },
    { label: "Transfer", icon: <Send /> },
    { label: "Analytics", icon: <BarChart /> },
  ];

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
                      activeMenu === item.label ? "#5B8CFF" : "text.secondary",
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
                        fontWeight: activeMenu === item.label ? 700 : 400,
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
              <Typography
                variant="h4"
                sx={{ fontWeight: 800 }}
              >
                Good evening, Alok 👋
              </Typography>

              <Typography color="text.secondary" sx={{ mt: 1 }}>
                Here's what's happening with your money today.
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
              title="Total Balance"
              value="₹1,24,560"
              change="+12.8%"
              icon={<AccountBalanceWallet />}
              positive
            />

            <StatCard
              title="Monthly Income"
              value="₹85,000"
              change="+8.2%"
              icon={<ArrowUpward />}
              positive
            />

            <StatCard
              title="Monthly Expenses"
              value="₹32,450"
              change="-4.6%"
              icon={<ArrowDownward />}
            />

            <StatCard
              title="Savings"
              value="₹52,550"
              change="+18.4%"
              icon={<TrendingUp />}
              positive
            />
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "1.5fr 1fr" },
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
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 5,
                  }}
                >
                  <Box>
                    <Typography color="rgba(255,255,255,0.7)">
                      Available Balance
                    </Typography>

                    <Typography
                      variant="h3"
                      sx={{ mt: 1, fontWeight: 800 }}
                    >
                      ₹1,24,560
                    </Typography>
                  </Box>

                  <CreditCard sx={{ fontSize: 42, opacity: 0.7 }} />
                </Box>

                <Box sx={{ display: "flex", gap: 6 }}>
                  <Box>
                    <Typography variant="caption" color="rgba(255,255,255,0.6)">
                      CARD NUMBER
                    </Typography>

                    <Typography sx={{ mt: 1 }}>
                      •••• •••• •••• 4821
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="caption" color="rgba(255,255,255,0.6)">
                      VALID THRU
                    </Typography>

                    <Typography sx={{ mt: 1 }}>12/28</Typography>
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
                    <Typography sx={{ fontWeight: 700, fontSize: 18 }}>
                      Spending Overview
                    </Typography>

                    <Typography color="text.secondary" variant="body2">
                      This month
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
                  {[35, 55, 42, 78, 62, 90, 70, 58, 82, 65, 95, 72].map(
                    (height, index) => (
                      <Box
                        key={index}
                        sx={{
                          flex: 1,
                          height: `${height}%`,
                          borderRadius: "6px 6px 2px 2px",
                          background:
                            index === 10
                              ? "#5B8CFF"
                              : "rgba(91,140,255,0.22)",
                        }}
                      />
                    )
                  )}
                </Box>

                <Divider sx={{ mt: 2, mb: 2 }} />

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography color="text.secondary" variant="body2">
                    Total spending
                  </Typography>

                  <Typography sx={{ fontWeight: 700 }}>
                    ₹32,450
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
                  <Typography sx={{ fontWeight: 700, fontSize: 18 }}>
                    Recent Transactions
                  </Typography>

                  <Typography color="text.secondary" variant="body2">
                    Your latest payment activity
                  </Typography>
                </Box>

                <Chip
                  label="View all"
                  clickable
                  sx={{
                    color: "#5B8CFF",
                    background: "rgba(91,140,255,0.1)",
                  }}
                />
              </Box>

              {transactions.map((transaction, index) => (
                <Box key={transaction.name}>
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
                          transaction.type === "income"
                            ? "rgba(34,197,94,0.15)"
                            : "rgba(91,140,255,0.15)",
                        color:
                          transaction.type === "income"
                            ? "#4ADE80"
                            : "#5B8CFF",
                      }}
                    >
                      {transaction.icon}
                    </Avatar>

                    <Box sx={{ flex: 1 }}>
                      <Typography sx={{ fontWeight: 600 }}>
                        {transaction.name}
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        {transaction.category} • {transaction.date}
                      </Typography>
                    </Box>

                    <Typography
                      sx={{ fontWeight: 700 }}
                      color={
                        transaction.type === "income"
                          ? "#4ADE80"
                          : "text.primary"
                      }
                    >
                      {transaction.amount}
                    </Typography>
                  </Box>

                  {index !== transactions.length - 1 && <Divider />}
                </Box>
              ))}
            </CardContent>
          </Card>
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
          sx={{ mt: 2, fontWeight: 800 }}
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
          {change} from last month
        </Typography>
      </CardContent>
    </Card>
  );
}

export default App;
