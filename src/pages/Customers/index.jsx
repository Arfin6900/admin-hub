import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  IconButton,
  useTheme,
  Grid,
} from '@mui/material';
import {
  RiAddLine,
  RiSearchLine,
  RiDownloadLine,
  RiEyeLine,
  RiEditLine,
  RiGroupLine,
  RiCalendarCheckLine,
  RiMoneyDollarCircleLine,
} from 'react-icons/ri';
import Header from '@/components/Layout/Header';
import StatsCard from '@/components/Common/StatsCard';

const mockCustomers = [
  {
    id: '1',
    name: 'John Doe',
    customerId: '#123',
    email: 'john@example.com',
    phone: '(555) 111-2222',
    totalBookings: 3,
    totalSpent: '$425.50',
    memberSince: '1/15/2025',
  },
];

const Customers = () => {
  const theme = useTheme();

  const statsData = [
    {
      title: 'Total Customers',
      value: '12',
      icon: RiGroupLine,
      iconBgColor: '#EEF2FF',
      iconColor: '#5046E5',
    },
    {
      title: 'Total Bookings',
      value: '134',
      icon: RiCalendarCheckLine,
      iconBgColor: '#DBEAFE',
      iconColor: '#3B82F6',
    },
    {
      title: 'Lifetime Value',
      value: '$856.40',
      icon: RiMoneyDollarCircleLine,
      iconBgColor: '#D1FAE5',
      iconColor: '#10B981',
    },
  ];

  return (
    <Box>
      <Header
        title="Customer Management"
        showQuickActions={false}
        actions={
          <>
            <Button
              variant="contained"
              startIcon={<RiAddLine />}
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                mr: 1,
              }}
            >
              Add Customer
            </Button>
            <Button variant="outlined" startIcon={<RiDownloadLine />}>
              Export to CSV
            </Button>
          </>
        }
      />

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {statsData.map((stat, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <StatsCard {...stat} />
          </Grid>
        ))}
      </Grid>

      {/* Customers Table */}
      <Card>
        <CardContent sx={{ p: 3 }}>
          {/* Search */}
          <TextField
            fullWidth
            placeholder="Search customers by name or email..."
            size="small"
            sx={{ mb: 3, maxWidth: 400 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <RiSearchLine color={theme.palette.text.secondary} />
                </InputAdornment>
              ),
            }}
          />

          {/* Table */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Customer</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Total Spent</TableCell>
                  <TableCell>Total Spent</TableCell>
                  <TableCell>Member Since</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockCustomers.map((customer) => (
                  <TableRow key={customer.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar
                          src={customer.avatar}
                          sx={{ bgcolor: theme.palette.primary.main }}
                        >
                          {customer.name.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {customer.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: theme.palette.text.secondary }}
                          >
                            Customer ID {customer.customerId}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{customer.email}</Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: theme.palette.text.secondary }}
                      >
                        {customer.phone}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {customer.totalBookings.toString().padStart(2, '0')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{customer.totalSpent}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{customer.memberSince}</Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <IconButton
                          size="small"
                          sx={{
                            color: theme.palette.text.secondary,
                            backgroundColor: theme.palette.grey[100],
                            '&:hover': {
                              backgroundColor: theme.palette.grey[200],
                            },
                          }}
                        >
                          <RiEyeLine size={18} />
                        </IconButton>
                        <IconButton
                          size="small"
                          sx={{
                            color: theme.palette.text.secondary,
                            backgroundColor: theme.palette.grey[100],
                            '&:hover': {
                              backgroundColor: theme.palette.grey[200],
                            },
                          }}
                        >
                          <RiEditLine size={18} />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Customers;
