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
  Chip,
  IconButton,
  useTheme,
  Grid,
} from '@mui/material';
import {
  RiAddLine,
  RiSearchLine,
  RiSettings3Line,
  RiDeleteBinLine,
  RiEditLine,
  RiTimeLine,
  RiCalendarCheckLine,
  RiPriceTag3Line,
} from 'react-icons/ri';
import Header from '@/components/Layout/Header';
import StatsCard from '@/components/Common/StatsCard';

interface Service {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: string;
  status: 'active' | 'inactive';
}

const mockServices: Service[] = [
  {
    id: '1',
    name: 'Drain Cleaning',
    description: 'Professional drain cleaning service for clogged drains',
    duration: '60 min',
    price: '$125.00/hr',
    status: 'active',
  },
  {
    id: '2',
    name: 'AC Repair',
    description: 'Air conditioning repair and diagnostics',
    duration: '120 min',
    price: '$150.00/hr',
    status: 'active',
  },
  {
    id: '3',
    name: 'Electrical Panel Upgrade',
    description: 'Complete electrical panel replacement and upgrade',
    duration: '240 min',
    price: '$125.00/hr',
    status: 'active',
  },
  {
    id: '4',
    name: 'Water Heater Installation',
    description: 'New water heater installation including removal of old unit',
    duration: '180 min',
    price: '$85.00/hr',
    status: 'active',
  },
];

const Services: React.FC = () => {
  const theme = useTheme();

  const statsData = [
    {
      title: 'Total Services',
      value: '2,420',
      icon: RiCalendarCheckLine,
      iconBgColor: '#EEF2FF',
      iconColor: '#5046E5',
    },
    {
      title: 'Active Services',
      value: '1,203',
      icon: RiTimeLine,
      iconBgColor: '#DBEAFE',
      iconColor: '#3B82F6',
    },
    {
      title: 'Avg. Price',
      value: '$14,780',
      icon: RiPriceTag3Line,
      iconBgColor: '#FEE2E2',
      iconColor: '#EF4444',
    },
  ];

  return (
    <Box>
      <Header
        title="Services Management"
        showQuickActions={false}
        actions={
          <>
            <Button
              variant="outlined"
              startIcon={<RiSettings3Line />}
              sx={{ mr: 1 }}
            >
              Book Page Setting
            </Button>
            <Button
              variant="contained"
              startIcon={<RiAddLine />}
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              }}
            >
              Add Service
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

      {/* Services Table */}
      <Card>
        <CardContent sx={{ p: 3 }}>
          {/* Search */}
          <TextField
            fullWidth
            placeholder="Search"
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
                  <TableCell>Service</TableCell>
                  <TableCell>Duration</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Status ↓</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockServices.map((service) => (
                  <TableRow key={service.id} hover>
                    <TableCell>
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          {service.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: theme.palette.text.secondary }}
                        >
                          {service.description}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <RiTimeLine size={16} color={theme.palette.text.secondary} />
                        <Typography variant="body2">{service.duration}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">$ {service.price}</Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            backgroundColor: theme.palette.success.main,
                          }}
                        />
                        <Typography
                          variant="body2"
                          sx={{ color: theme.palette.success.main, fontWeight: 500 }}
                        >
                          Active
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <IconButton
                          size="small"
                          sx={{
                            color: theme.palette.error.main,
                            backgroundColor: `${theme.palette.error.main}10`,
                            '&:hover': {
                              backgroundColor: `${theme.palette.error.main}20`,
                            },
                          }}
                        >
                          <RiDeleteBinLine size={18} />
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

export default Services;
