import React from 'react';
import { Box, Card, CardContent, Typography, useTheme } from '@mui/material';
import { RiArrowUpLine, RiArrowDownLine } from 'react-icons/ri';

const StatsCard = ({
  title,
  value,
  icon: Icon,
  iconBgColor = '#EEF2FF',
  iconColor = '#5046E5',
  trend,
}) => {
  const theme = useTheme();

  return (
    <Card 
      sx={{ 
        height: '100%',
        '&:hover': {
          boxShadow: theme.shadows[4],
          transform: 'translateY(-2px)',
        },
        transition: 'all 0.2s ease-in-out',
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography 
              variant="body2" 
              sx={{ 
                color: theme.palette.text.secondary,
                fontWeight: 500,
                mb: 1,
              }}
            >
              {title}
            </Typography>
            <Typography 
              variant="h2" 
              sx={{ 
                fontWeight: 700,
                color: theme.palette.text.primary,
                fontSize: '1.75rem',
                letterSpacing: '-0.5px',
              }}
            >
              {value}
            </Typography>
            {trend && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.25,
                    px: 0.75,
                    py: 0.25,
                    borderRadius: 1,
                    backgroundColor: trend.isPositive 
                      ? `${theme.palette.success.main}15` 
                      : `${theme.palette.error.main}15`,
                    color: trend.isPositive 
                      ? theme.palette.success.main 
                      : theme.palette.error.main,
                  }}
                >
                  {trend.isPositive ? (
                    <RiArrowUpLine size={14} />
                  ) : (
                    <RiArrowDownLine size={14} />
                  )}
                  <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.75rem' }}>
                    {Math.abs(trend.value)}%
                  </Typography>
                </Box>
                <Typography 
                  variant="body2" 
                  sx={{ color: theme.palette.text.secondary, fontSize: '0.75rem' }}
                >
                  {trend.label || 'vs last month'}
                </Typography>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: '12px',
              backgroundColor: iconBgColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon size={24} color={iconColor} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
