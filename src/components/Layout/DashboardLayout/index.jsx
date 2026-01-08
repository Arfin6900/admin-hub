import React from 'react';
import { Box, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import Sidebar from '../Sidebar';

const DashboardLayout = ({ children }) => {
  const theme = useTheme();
  const { isCollapsed } = useSelector((state) => state.sidebar);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: theme.palette.background.default,
          minHeight: '100vh',
          p: 3,
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
