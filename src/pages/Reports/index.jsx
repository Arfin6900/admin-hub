import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  LinearProgress,
  useTheme,
  Grid,
} from '@mui/material';
import {
  RiMoneyDollarCircleLine,
  RiCalendarCheckLine,
  RiLineChartLine,
  RiPriceTag3Line,
} from 'react-icons/ri';
import Chart from 'react-apexcharts';
import Header from '@/components/Layout/Header';
import StatsCard from '@/components/Common/StatsCard';

const Reports = () => {
  const theme = useTheme();
  const [period, setPeriod] = useState('Weekly');

  const statsData = [
    {
      title: 'Total Revenue',
      value: '$15,840',
      icon: RiMoneyDollarCircleLine,
      iconBgColor: '#D1FAE5',
      iconColor: '#10B981',
      trend: { value: 12, isPositive: true },
    },
    {
      title: 'Bookings',
      value: '48',
      icon: RiCalendarCheckLine,
      iconBgColor: '#DBEAFE',
      iconColor: '#3B82F6',
    },
    {
      title: 'Win Rate',
      value: '87.5%',
      icon: RiLineChartLine,
      iconBgColor: '#FEE2E2',
      iconColor: '#EF4444',
    },
    {
      title: 'Avg Job Size',
      value: '$165.00',
      icon: RiPriceTag3Line,
      iconBgColor: '#EEF2FF',
      iconColor: '#5046E5',
    },
  ];

  const revenueChartOptions = {
    chart: {
      type: 'area',
      toolbar: { show: false },
      sparkline: { enabled: false },
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [0, 100],
      },
    },
    colors: ['#5046E5'],
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        formatter: (value) => `${value / 1000}k`,
      },
    },
    grid: {
      borderColor: '#E2E8F0',
      strokeDashArray: 4,
    },
    tooltip: {
      y: {
        formatter: (value) => `$${value.toLocaleString()}`,
      },
    },
    dataLabels: { enabled: false },
  };

  const revenueChartSeries = [
    {
      name: 'Revenue',
      data: [6500, 6200, 6800, 6400, 7200, 6500, 6121, 6800, 6200, 6500, 7000, 6800],
    },
  ];

  const bookingsChartOptions = {
    chart: {
      type: 'bar',
      toolbar: { show: false },
    },
    colors: ['#8B5CF6'],
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: '50%',
      },
    },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        formatter: (value) => value.toString(),
      },
    },
    grid: {
      borderColor: '#E2E8F0',
      strokeDashArray: 4,
    },
    dataLabels: { enabled: false },
  };

  const bookingsChartSeries = [
    {
      name: 'Bookings',
      data: [35, 42, 38, 45, 35, 48, 40],
    },
  ];

  const donutChartOptions = {
    chart: {
      type: 'donut',
    },
    colors: ['#5046E5', '#A78BFA', '#C4B5FD'],
    labels: ['Leak Repair', 'Water Heater Service', 'Drain Cleaning'],
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          labels: {
            show: true,
            total: {
              show: true,
              label: '',
              formatter: () => '$11,900',
            },
          },
        },
      },
    },
    dataLabels: { enabled: false },
  };

  const donutChartSeries = [45, 30, 25];

  const performanceMetrics = [
    { label: 'Customer Satisfaction', value: '4.8/5.0', progress: 96 },
    { label: 'Technician Utilization', value: '78%', progress: 78 },
    { label: 'On-Time Arrival', value: '92%', progress: 92 },
    { label: 'Customer Retention', value: '85%', progress: 85 },
  ];

  return (
    <Box>
      <Header
        title="Business Analytics"
        subtitle="Track performance and identify trends"
        showQuickActions={false}
      />

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {statsData.map((stat, index) => (
          <Grid item xs={12} sm={6} lg={3} key={index}>
            <StatsCard {...stat} />
          </Grid>
        ))}
      </Grid>

      {/* Charts Row 1 */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} lg={7}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Revenue Trend
              </Typography>
              <Chart
                options={revenueChartOptions}
                series={revenueChartSeries}
                type="area"
                height={280}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={5}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  All Bookings Analytics
                </Typography>
                <Select
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  size="small"
                  sx={{ minWidth: 100 }}
                >
                  <MenuItem value="Weekly">Weekly</MenuItem>
                  <MenuItem value="Monthly">Monthly</MenuItem>
                  <MenuItem value="Yearly">Yearly</MenuItem>
                </Select>
              </Box>
              <Chart
                options={bookingsChartOptions}
                series={bookingsChartSeries}
                type="bar"
                height={280}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Row 2 */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Top Services by Revenue
              </Typography>
              <Chart
                options={donutChartOptions}
                series={donutChartSeries}
                type="donut"
                height={280}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Performance Metrics
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {performanceMetrics.map((metric, index) => (
                  <Box key={index}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                        {metric.label}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {metric.value}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={metric.progress}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: '#E2E8F0',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 4,
                          backgroundColor: '#F59E0B',
                        },
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Top Services
              </Typography>
              <Chart
                options={{
                  ...donutChartOptions,
                  colors: ['#5046E5', '#8B5CF6', '#A78BFA'],
                  labels: ['Leak Repair', 'Drain Cleaning', 'Water Heater Service'],
                  plotOptions: {
                    pie: {
                      donut: {
                        size: '75%',
                        labels: {
                          show: true,
                          total: {
                            show: true,
                            label: '',
                            formatter: () => '$11,900',
                          },
                        },
                      },
                    },
                  },
                }}
                series={[40, 35, 25]}
                type="donut"
                height={280}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Reports;
