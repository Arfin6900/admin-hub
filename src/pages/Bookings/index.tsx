import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Tabs,
  Tab,
  Chip,
  IconButton,
  useTheme,
} from '@mui/material';
import {
  RiAddLine,
  RiCalendarLine,
  RiTimeLine,
  RiMapPinLine,
  RiPhoneLine,
  RiPlayCircleLine,
  RiEyeLine,
  RiCheckLine,
  RiCloseLine,
} from 'react-icons/ri';
import Header from '@/components/Layout/Header';

interface Booking {
  id: string;
  customer: string;
  service: string;
  bookingId: string;
  date: string;
  time: string;
  address: string;
  phone: string;
  status: 'confirmed' | 'in-progress' | 'completed' | 'pending';
  day: number;
  month: string;
}

const mockBookings: Booking[] = [
  {
    id: '1',
    customer: 'John Doe',
    service: 'Plumbing Repair Service',
    bookingId: '#BK-0034',
    date: '03/15/2024',
    time: '2:00 PM - 3:00 PM',
    address: '800 Maple Street, Anytown, USA',
    phone: '(555) 987-6543',
    status: 'confirmed',
    day: 27,
    month: 'November',
  },
  {
    id: '2',
    customer: 'Jane Smith',
    service: 'Electric Shock Fix',
    bookingId: '#BK-0031',
    date: '01/22/2024',
    time: '9:30 AM - 10:30 AM',
    address: '456 Oak Avenue, Springfield, USA',
    phone: '(555) 246-1357',
    status: 'in-progress',
    day: 20,
    month: 'November',
  },
  {
    id: '3',
    customer: 'Bob Wilson',
    service: 'Slow Bathroom Drain',
    bookingId: '#BK-0032',
    date: '04/01/2024',
    time: '11:00 AM - 12:00 PM',
    address: '123 Pine Lane, Hill Valley, USA',
    phone: '(555) 789-0123',
    status: 'completed',
    day: 17,
    month: 'November',
  },
  {
    id: '4',
    customer: 'John Doe',
    service: 'Plumbing Repair Service',
    bookingId: '#BK-0035',
    date: '02/14/2024',
    time: '3:30 PM - 4:30 PM',
    address: '987 Cherry Blvd, Gotham City, USA',
    phone: '(555) 456-7890',
    status: 'pending',
    day: 12,
    month: 'November',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'confirmed':
      return { bg: '#DBEAFE', text: '#2563EB' };
    case 'in-progress':
      return { bg: '#FEF3C7', text: '#D97706' };
    case 'completed':
      return { bg: '#D1FAE5', text: '#059669' };
    case 'pending':
      return { bg: '#FEE2E2', text: '#DC2626' };
    default:
      return { bg: '#F3F4F6', text: '#6B7280' };
  }
};

const Bookings: React.FC = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);

  const tabs = [
    { label: 'All', count: 4 },
    { label: 'Pending', count: 1 },
    { label: 'Confirmed', count: 1 },
    { label: 'In Progress', count: 1 },
  ];

  return (
    <Box>
      <Header
        title="My Bookings"
        showQuickActions={false}
        actions={
          <Button
            variant="contained"
            startIcon={<RiAddLine />}
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            }}
          >
            Add New Booking
          </Button>
        }
      />

      {/* Tabs */}
      <Card sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={(_, value) => setTabValue(value)}
          sx={{
            px: 2,
            '& .MuiTabs-indicator': {
              display: 'none',
            },
          }}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={tab.label}
              label={`${tab.label} (${tab.count})`}
              sx={{
                textTransform: 'none',
                fontWeight: tabValue === index ? 600 : 400,
                color: tabValue === index ? theme.palette.text.primary : theme.palette.text.secondary,
                backgroundColor: tabValue === index ? theme.palette.grey[100] : 'transparent',
                borderRadius: '8px',
                mx: 0.5,
                my: 1,
                minHeight: 40,
              }}
            />
          ))}
        </Tabs>
      </Card>

      {/* Bookings List */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {mockBookings.map((booking) => {
          const statusColors = getStatusColor(booking.status);
          return (
            <Card key={booking.id}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
                  {/* Date Badge */}
                  <Box
                    sx={{
                      width: 70,
                      height: 80,
                      borderRadius: '12px',
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      flexShrink: 0,
                    }}
                  >
                    <Typography variant="body2" sx={{ fontSize: '0.7rem', fontWeight: 500 }}>
                      {booking.month}
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 700 }}>
                      {booking.day}
                    </Typography>
                  </Box>

                  {/* Booking Details */}
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {booking.customer} - {booking.service}
                      </Typography>
                      <Chip
                        label={booking.status.charAt(0).toUpperCase() + booking.status.slice(1).replace('-', ' ')}
                        size="small"
                        sx={{
                          backgroundColor: statusColors.bg,
                          color: statusColors.text,
                          fontWeight: 500,
                          fontSize: '0.75rem',
                        }}
                      />
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{ color: theme.palette.text.secondary, mb: 2 }}
                    >
                      {booking.bookingId}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 3,
                        flexWrap: 'wrap',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <RiCalendarLine size={16} color={theme.palette.text.secondary} />
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                          {booking.date}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <RiTimeLine size={16} color={theme.palette.text.secondary} />
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                          {booking.time}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <RiMapPinLine size={16} color={theme.palette.text.secondary} />
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                          {booking.address}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <RiPhoneLine size={16} color={theme.palette.text.secondary} />
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                          {booking.phone}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  {/* Actions */}
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {booking.status === 'pending' ? (
                      <>
                        <Button
                          variant="contained"
                          size="small"
                          startIcon={<RiCheckLine />}
                          sx={{ backgroundColor: theme.palette.success.main }}
                        >
                          Confirm
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          startIcon={<RiCloseLine />}
                          sx={{ backgroundColor: theme.palette.error.main }}
                        >
                          Decline
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<RiPlayCircleLine />}
                        sx={{
                          backgroundColor: theme.palette.success.main,
                          '&:hover': { backgroundColor: theme.palette.success.dark },
                        }}
                      >
                        Start Job
                      </Button>
                    )}
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<RiEyeLine />}
                    >
                      View Details
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};

export default Bookings;
