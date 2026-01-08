import React from 'react';
import { Box, Grid } from '@mui/material';
import { 
  RiCalendarCheckLine, 
  RiTimeLine, 
  RiMoneyDollarCircleLine,
  RiLineChartLine 
} from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Header from '@/components/Layout/Header';
import StatsCard from '@/components/Common/StatsCard';
import BookingCalendar from '@/components/Common/BookingCalendar';
import RecentActivity from '@/components/Common/RecentActivity';

const Dashboard: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const statsData = [
    {
      title: "Today's Jobs",
      value: '2,420',
      icon: RiCalendarCheckLine,
      iconBgColor: '#EEF2FF',
      iconColor: '#5046E5',
      trend: { value: 40, isPositive: true },
    },
    {
      title: 'Pending Bookings',
      value: '1,203',
      icon: RiTimeLine,
      iconBgColor: '#DBEAFE',
      iconColor: '#3B82F6',
      trend: { value: 10, isPositive: false },
    },
    {
      title: 'Outstandings',
      value: '$14,780',
      icon: RiMoneyDollarCircleLine,
      iconBgColor: '#FEE2E2',
      iconColor: '#EF4444',
      trend: { value: 3, isPositive: false },
    },
    {
      title: 'Weekly Revenue',
      value: '$88,543',
      icon: RiLineChartLine,
      iconBgColor: '#D1FAE5',
      iconColor: '#10B981',
      trend: { value: 11, isPositive: true },
    },
  ];

  return (
    <Box>
      <Header
        title={`Welcome Back, ${user?.name || 'User'}`}
        subtitle="Detailed overview of how your bookings are performing today..."
        showQuickActions={true}
      />

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {statsData.map((stat, index) => (
          <Grid item xs={12} sm={6} lg={3} key={index}>
            <StatsCard {...stat} />
          </Grid>
        ))}
      </Grid>

      {/* Calendar and Activity */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <BookingCalendar />
        </Grid>
        <Grid item xs={12} lg={4}>
          <RecentActivity />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
