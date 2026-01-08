import { IconType } from 'react-icons';
import { 
  RiDashboardLine, 
  RiCalendarLine, 
  RiToolsLine,
  RiWalletLine,
  RiGroupLine,
  RiBarChartLine,
  RiAddCircleLine,
  RiNotification3Line,
  RiQuestionLine,
  RiSettings4Line
} from 'react-icons/ri';

export interface NavItem {
  id: string;
  title: string;
  path: string;
  icon: IconType;
  badge?: number;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const adminNavSections: NavSection[] = [
  {
    title: 'Main Menu',
    items: [
      { id: 'dashboard', title: 'Dashboard', path: '/', icon: RiDashboardLine },
      { id: 'bookings', title: 'Bookings', path: '/bookings', icon: RiCalendarLine, badge: 5 },
      { id: 'services', title: 'Services', path: '/services', icon: RiToolsLine },
      { id: 'accounting', title: 'Accounting', path: '/accounting', icon: RiWalletLine },
      { id: 'customers', title: 'Customers', path: '/customers', icon: RiGroupLine },
      { id: 'reports', title: 'Reports', path: '/reports', icon: RiBarChartLine },
    ],
  },
  {
    title: 'Recent Quick Links',
    items: [
      { id: 'add-booking', title: 'Add New Booking', path: '/bookings/new', icon: RiAddCircleLine },
    ],
  },
  {
    title: 'Help & Settings',
    items: [
      { id: 'notifications', title: 'Notifications', path: '/notifications', icon: RiNotification3Line, badge: 10 },
      { id: 'support', title: 'Support', path: '/support', icon: RiQuestionLine },
      { id: 'settings', title: 'Settings', path: '/settings', icon: RiSettings4Line },
    ],
  },
];
