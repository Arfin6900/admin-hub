import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Tabs,
  Tab,
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
  RiDownloadLine,
  RiSendPlaneLine,
  RiEditLine,
  RiMoneyDollarCircleLine,
  RiTimeLine,
  RiPercentLine,
  RiLineChartLine,
  RiFileList2Line,
  RiExchangeDollarLine,
} from 'react-icons/ri';
import Header from '@/components/Layout/Header';
import StatsCard from '@/components/Common/StatsCard';

interface Invoice {
  id: string;
  number: string;
  customer: string;
  type: 'invoice' | 'quote';
  date: string;
  dueDate: string;
  total: string;
  paid: string;
  balance: string;
  status: 'paid' | 'partial' | 'sent' | 'overdue';
}

const mockInvoices: Invoice[] = [
  {
    id: '1',
    number: 'INV-2024-001',
    customer: 'Sarah Johnson',
    type: 'invoice',
    date: '12/10/2024',
    dueDate: '12/24/2024',
    total: '$363.47',
    paid: '$363.47',
    balance: '$0.00',
    status: 'paid',
  },
  {
    id: '2',
    number: 'INV-2024-002',
    customer: 'Mike Anderson',
    type: 'invoice',
    date: '12/10/2024',
    dueDate: '12/24/2024',
    total: '$363.47',
    paid: '$363.47',
    balance: '$0.00',
    status: 'partial',
  },
  {
    id: '3',
    number: 'QUOTE-2024-012',
    customer: 'Lisa Chen',
    type: 'quote',
    date: '12/10/2024',
    dueDate: '12/24/2024',
    total: '$363.47',
    paid: '$363.47',
    balance: '$0.00',
    status: 'sent',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'paid':
      return { bg: '#D1FAE5', text: '#059669' };
    case 'partial':
      return { bg: '#FEF3C7', text: '#D97706' };
    case 'sent':
      return { bg: '#DBEAFE', text: '#2563EB' };
    case 'overdue':
      return { bg: '#FEE2E2', text: '#DC2626' };
    default:
      return { bg: '#F3F4F6', text: '#6B7280' };
  }
};

const Accounting: React.FC = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);

  const tabs = ['Invoices', 'Payments', 'Payouts', 'Taxes', 'Expanses', 'Reports & Exports', 'Settings'];

  const statsData = [
    {
      title: 'Outstanding A/R',
      value: '$2,450.00',
      icon: RiMoneyDollarCircleLine,
      iconBgColor: '#EEF2FF',
      iconColor: '#5046E5',
    },
    {
      title: 'Pending Payouts',
      value: '$1,144.80',
      icon: RiTimeLine,
      iconBgColor: '#DBEAFE',
      iconColor: '#3B82F6',
    },
    {
      title: 'Tax Collected',
      value: '$856.40',
      icon: RiPercentLine,
      iconBgColor: '#FEE2E2',
      iconColor: '#EF4444',
    },
    {
      title: 'Net Profit',
      value: '$8,780.60',
      icon: RiLineChartLine,
      iconBgColor: '#D1FAE5',
      iconColor: '#10B981',
    },
  ];

  const quickActions = [
    {
      icon: RiExchangeDollarLine,
      title: 'Convert Quote to Invoice',
      description: 'Turn approved quotes into invoices instantly',
      color: '#5046E5',
    },
    {
      icon: RiFileList2Line,
      title: 'Issue Credit Note',
      description: 'Create credit notes for refunds or adjustments',
      color: '#EF4444',
    },
    {
      icon: RiDownloadLine,
      title: 'Customer Statement',
      description: 'Generate statements for the last 90 days',
      color: '#3B82F6',
    },
  ];

  return (
    <Box>
      <Header
        title="Accounting"
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

      {/* Main Content Card */}
      <Card sx={{ mb: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabValue}
            onChange={(_, value) => setTabValue(value)}
            sx={{ px: 2 }}
          >
            {tabs.map((tab) => (
              <Tab
                key={tab}
                label={tab}
                sx={{
                  textTransform: 'none',
                  fontWeight: 500,
                }}
              />
            ))}
          </Tabs>
        </Box>

        <CardContent sx={{ p: 3 }}>
          {/* Section Header */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              mb: 3,
            }}
          >
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Invoices & Quotes
              </Typography>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                Manage quotes, invoices, and credit notes
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button variant="outlined" startIcon={<RiDownloadLine />}>
                Export
              </Button>
              <Button
                variant="contained"
                startIcon={<RiAddLine />}
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                }}
              >
                New Invoice
              </Button>
            </Box>
          </Box>

          {/* Table */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Number</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Balance</TableCell>
                  <TableCell>Status ↓</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockInvoices.map((invoice) => {
                  const statusColors = getStatusColor(invoice.status);
                  return (
                    <TableRow key={invoice.id} hover>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {invoice.number}
                        </Typography>
                      </TableCell>
                      <TableCell>{invoice.customer}</TableCell>
                      <TableCell>
                        <Chip
                          label={invoice.type.charAt(0).toUpperCase() + invoice.type.slice(1)}
                          size="small"
                          sx={{
                            backgroundColor: theme.palette.grey[100],
                            fontWeight: 500,
                          }}
                        />
                      </TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>{invoice.dueDate}</TableCell>
                      <TableCell>{invoice.total}</TableCell>
                      <TableCell>{invoice.paid}</TableCell>
                      <TableCell>{invoice.balance}</TableCell>
                      <TableCell>
                        <Chip
                          label={invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                          size="small"
                          sx={{
                            backgroundColor: statusColors.bg,
                            color: statusColors.text,
                            fontWeight: 500,
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                          <IconButton size="small">
                            <RiDownloadLine size={18} />
                          </IconButton>
                          <IconButton size="small">
                            <RiSendPlaneLine size={18} />
                          </IconButton>
                          <IconButton size="small">
                            <RiEditLine size={18} />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Grid container spacing={3}>
        {quickActions.map((action, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: theme.shadows[4],
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              <CardContent sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '12px',
                    backgroundColor: `${action.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <action.icon size={24} color={action.color} />
                </Box>
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {action.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                    {action.description}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Accounting;
