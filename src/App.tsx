import { ThemeProvider, CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import theme from '@/constants/MuiTheme';
import { store } from '@/redux/store';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import Dashboard from '@/pages/Dashboard';
import Bookings from '@/pages/Bookings';
import Services from '@/pages/Services';
import Accounting from '@/pages/Accounting';
import Customers from '@/pages/Customers';
import Reports from '@/pages/Reports';
import NotFound from '@/pages/NotFound';

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <DashboardLayout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/bookings/*" element={<Bookings />} />
              <Route path="/services" element={<Services />} />
              <Route path="/accounting" element={<Accounting />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </DashboardLayout>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
