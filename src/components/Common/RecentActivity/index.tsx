import React from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Avatar, 
  Button,
  useTheme 
} from '@mui/material';
import { 
  RiCalendarCheckLine, 
  RiMoneyDollarCircleLine, 
  RiStarLine,
  RiPhoneLine,
  RiArrowRightLine
} from 'react-icons/ri';

interface ActivityItem {
  id: string;
  user: string;
  action: string;
  amount?: string;
  time: string;
  type: 'booking' | 'payment' | 'review' | 'callback';
  status?: 'completed' | 'pending';
}

const mockActivities: ActivityItem[] = [
  {
    id: '1',
    user: 'Sarah Johnson',
    action: 'New booking confirmed',
    amount: '$285.00',
    time: '5 min ago',
    type: 'booking',
  },
  {
    id: '2',
    user: 'Mike Anderson',
    action: 'Payment received',
    amount: '$315.00',
    time: '12 min ago',
    type: 'payment',
  },
  {
    id: '3',
    user: 'Tom Wilson',
    action: 'Left 5-star review',
    time: '1 hour ago',
    type: 'review',
  },
  {
    id: '4',
    user: 'Emma Davis',
    action: 'Payment received',
    amount: '$425.00',
    time: '2 hour ago',
    type: 'payment',
  },
  {
    id: '5',
    user: 'James Miller',
    action: 'Scheduled callback',
    time: '5 min ago',
    type: 'callback',
    status: 'pending',
  },
];

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'booking':
      return { icon: RiCalendarCheckLine, bg: '#EEF2FF', color: '#5046E5' };
    case 'payment':
      return { icon: RiMoneyDollarCircleLine, bg: '#D1FAE5', color: '#10B981' };
    case 'review':
      return { icon: RiStarLine, bg: '#FEF3C7', color: '#F59E0B' };
    case 'callback':
      return { icon: RiPhoneLine, bg: '#E0E7FF', color: '#6366F1' };
    default:
      return { icon: RiCalendarCheckLine, bg: '#EEF2FF', color: '#5046E5' };
  }
};

const RecentActivity: React.FC = () => {
  const theme = useTheme();

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Recent Activity
          </Typography>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
            Live business updates
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {mockActivities.map((activity) => {
            const { icon: Icon, bg, color } = getActivityIcon(activity.type);
            return (
              <Box 
                key={activity.id}
                sx={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  gap: 1.5,
                  pb: 2,
                  borderBottom: `1px solid ${theme.palette.divider}`,
                  '&:last-child': {
                    borderBottom: 'none',
                    pb: 0,
                  },
                }}
              >
                <Avatar
                  sx={{
                    width: 36,
                    height: 36,
                    backgroundColor: bg,
                  }}
                >
                  <Icon size={18} color={color} />
                </Avatar>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography 
                    variant="body1" 
                    sx={{ fontWeight: 600, fontSize: '0.875rem' }}
                  >
                    {activity.user}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ color: theme.palette.text.secondary, fontSize: '0.75rem' }}
                  >
                    {activity.action}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: theme.palette.text.secondary, 
                      fontSize: '0.7rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      mt: 0.5,
                    }}
                  >
                    🕐 {activity.time}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  {activity.amount && (
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        fontWeight: 600, 
                        color: activity.type === 'payment' 
                          ? theme.palette.success.main 
                          : theme.palette.text.primary,
                        fontSize: '0.875rem',
                      }}
                    >
                      {activity.amount}
                    </Typography>
                  )}
                  {activity.status === 'pending' && (
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: theme.palette.primary.main,
                        fontWeight: 500,
                        fontSize: '0.75rem',
                      }}
                    >
                      Pending
                    </Typography>
                  )}
                  {activity.type === 'review' && (
                    <Box sx={{ display: 'flex', gap: 0.25 }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <RiStarLine key={star} size={12} color="#F59E0B" fill="#F59E0B" />
                      ))}
                    </Box>
                  )}
                </Box>
              </Box>
            );
          })}
        </Box>

        <Button
          fullWidth
          endIcon={<RiArrowRightLine />}
          sx={{ 
            mt: 3, 
            color: theme.palette.primary.main,
            fontWeight: 500,
          }}
        >
          View All Activity
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
