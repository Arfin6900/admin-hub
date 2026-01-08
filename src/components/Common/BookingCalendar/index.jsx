import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Grid,
  useTheme,
} from '@mui/material';
import {
  RiAddLine,
  RiGridFill,
  RiListCheck2,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from 'react-icons/ri';
import moment from 'moment';

const mockEvents = [
  { id: '1', title: 'Water Heater In...', date: '2025-12-27', time: '07:00 am', type: 'water-heater' },
  { id: '2', title: 'Drain Cleaning', date: '2025-12-29', time: '13:00', type: 'drain' },
  { id: '3', title: 'Emergency Call...', date: '2025-12-01', time: '15:00', type: 'emergency' },
  { id: '4', title: 'Plumbing Service', date: '2025-12-06', time: '11:00 am', type: 'plumbing' },
  { id: '5', title: 'Water Heater In...', date: '2025-12-10', time: '07:00 am', type: 'water-heater' },
  { id: '6', title: 'Water Heater In...', date: '2025-12-11', time: '07:00 am', type: 'water-heater' },
  { id: '7', title: 'Electrical Panel...', date: '2025-12-15', time: '14:00 pm', type: 'electrical' },
  { id: '8', title: 'Emergency Call...', date: '2025-12-18', time: '15:00 pm', type: 'emergency' },
  { id: '9', title: 'Drain Cleaning', date: '2025-12-22', time: '13:00 pm', type: 'drain' },
];

const getEventColor = (type) => {
  switch (type) {
    case 'water-heater':
      return { bg: '#FEE2E2', text: '#DC2626', border: '#FCA5A5' };
    case 'drain':
      return { bg: '#DBEAFE', text: '#2563EB', border: '#93C5FD' };
    case 'emergency':
      return { bg: '#FEE2E2', text: '#DC2626', border: '#FCA5A5' };
    case 'plumbing':
      return { bg: '#DBEAFE', text: '#2563EB', border: '#93C5FD' };
    case 'electrical':
      return { bg: '#E0E7FF', text: '#4F46E5', border: '#A5B4FC' };
    default:
      return { bg: '#F3F4F6', text: '#374151', border: '#D1D5DB' };
  }
};

const BookingCalendar = () => {
  const theme = useTheme();
  const [currentDate, setCurrentDate] = useState(moment('2025-12-01'));
  const [viewType, setViewType] = useState('Month');

  const daysInMonth = currentDate.daysInMonth();
  const firstDayOfMonth = currentDate.clone().startOf('month').day();
  const weeks = [];

  let currentWeek = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    currentWeek.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push(null);
    }
    weeks.push(currentWeek);
  }

  const getEventsForDay = (day) => {
    const dateStr = currentDate.clone().date(day).format('YYYY-MM-DD');
    return mockEvents.filter((event) => event.date === dateStr);
  };

  const handlePrevMonth = () => {
    setCurrentDate(currentDate.clone().subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.clone().add(1, 'month'));
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 3 }}>
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Booking Overview
            </Typography>
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <IconButton size="small" sx={{ border: `1px solid ${theme.palette.divider}` }}>
                <RiGridFill size={18} />
              </IconButton>
              <IconButton size="small" sx={{ border: `1px solid ${theme.palette.divider}` }}>
                <RiListCheck2 size={18} />
              </IconButton>
            </Box>
          </Box>
          <Button
            variant="contained"
            startIcon={<RiAddLine />}
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            }}
          >
            Add New Booking
          </Button>
        </Box>

        {/* Calendar Navigation */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
            pb: 2,
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              variant="outlined"
              size="small"
              sx={{ minWidth: 70 }}
              onClick={() => setCurrentDate(moment())}
            >
              Today
            </Button>
            <IconButton size="small" onClick={handlePrevMonth}>
              <RiArrowLeftSLine />
            </IconButton>
            <IconButton size="small" onClick={handleNextMonth}>
              <RiArrowRightSLine />
            </IconButton>
            <Typography variant="h6" sx={{ fontWeight: 500, ml: 1 }}>
              {currentDate.format('MMMM YYYY')} 📅
            </Typography>
          </Box>
          <ToggleButtonGroup
            value={viewType}
            exclusive
            onChange={(_, value) => value && setViewType(value)}
            size="small"
          >
            <ToggleButton value="Day" sx={{ px: 2 }}>Day</ToggleButton>
            <ToggleButton value="Week" sx={{ px: 2 }}>Week</ToggleButton>
            <ToggleButton 
              value="Month" 
              sx={{ 
                px: 2,
                '&.Mui-selected': {
                  backgroundColor: theme.palette.primary.main,
                  color: 'white',
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                  },
                },
              }}
            >
              Month
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* Calendar Grid */}
        <Box>
          {/* Day Headers */}
          <Grid container sx={{ mb: 1 }}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <Grid item xs={12 / 7} key={day}>
                <Typography
                  variant="body2"
                  sx={{
                    textAlign: 'center',
                    fontWeight: 600,
                    color: theme.palette.text.secondary,
                    py: 1,
                  }}
                >
                  {day}
                </Typography>
              </Grid>
            ))}
          </Grid>

          {/* Calendar Days */}
          {weeks.map((week, weekIndex) => (
            <Grid 
              container 
              key={weekIndex}
              sx={{ 
                borderTop: `1px solid ${theme.palette.divider}`,
              }}
            >
              {week.map((day, dayIndex) => {
                const events = day ? getEventsForDay(day) : [];
                const isToday = day === moment().date() && 
                  currentDate.month() === moment().month() && 
                  currentDate.year() === moment().year();

                return (
                  <Grid
                    item
                    xs={12 / 7}
                    key={dayIndex}
                    sx={{
                      minHeight: 100,
                      borderRight: dayIndex < 6 ? `1px solid ${theme.palette.divider}` : 'none',
                      p: 1,
                      backgroundColor: day ? 'transparent' : theme.palette.grey[50],
                    }}
                  >
                    {day && (
                      <>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: isToday ? 700 : 400,
                            color: isToday ? theme.palette.primary.main : theme.palette.text.secondary,
                            mb: 0.5,
                          }}
                        >
                          {day.toString().padStart(2, '0')}
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                          {events.slice(0, 2).map((event) => {
                            const colors = getEventColor(event.type);
                            return (
                              <Box
                                key={event.id}
                                sx={{
                                  backgroundColor: colors.bg,
                                  borderLeft: `3px solid ${colors.border}`,
                                  borderRadius: '4px',
                                  px: 1,
                                  py: 0.5,
                                  cursor: 'pointer',
                                  '&:hover': {
                                    opacity: 0.8,
                                  },
                                }}
                              >
                                <Typography
                                  variant="body2"
                                  sx={{
                                    fontSize: '0.7rem',
                                    fontWeight: 500,
                                    color: colors.text,
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                  }}
                                >
                                  {event.title}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    fontSize: '0.65rem',
                                    color: colors.text,
                                    opacity: 0.8,
                                  }}
                                >
                                  {event.time}
                                </Typography>
                              </Box>
                            );
                          })}
                        </Box>
                      </>
                    )}
                  </Grid>
                );
              })}
            </Grid>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default BookingCalendar;
