import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Breadcrumbs, 
  Link,
  useTheme 
} from '@mui/material';
import { RiHome5Line, RiAddLine, RiFlashlightLine } from 'react-icons/ri';
import { useLocation, Link as RouterLink } from 'react-router-dom';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showQuickActions?: boolean;
  breadcrumbs?: { label: string; path?: string; icon?: React.ReactNode }[];
  actions?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  subtitle, 
  showQuickActions = true,
  breadcrumbs,
  actions 
}) => {
  const theme = useTheme();
  const location = useLocation();

  // Generate breadcrumbs from path if not provided
  const defaultBreadcrumbs = React.useMemo(() => {
    if (breadcrumbs) return breadcrumbs;
    
    const paths = location.pathname.split('/').filter(Boolean);
    if (paths.length === 0) return [{ label: 'Home', path: '/', icon: <RiHome5Line size={16} /> }];
    
    return [
      { label: 'Home', path: '/', icon: <RiHome5Line size={16} /> },
      ...paths.map((path, index) => ({
        label: path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' '),
        path: '/' + paths.slice(0, index + 1).join('/'),
      })),
    ];
  }, [breadcrumbs, location.pathname]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        mb: 3,
      }}
    >
      {/* Breadcrumbs */}
      {defaultBreadcrumbs.length > 1 && (
        <Breadcrumbs 
          separator="/"
          sx={{ 
            '& .MuiBreadcrumbs-separator': { 
              color: theme.palette.text.secondary,
              mx: 1,
            } 
          }}
        >
          {defaultBreadcrumbs.map((crumb, index) => {
            const isLast = index === defaultBreadcrumbs.length - 1;
            return isLast ? (
              <Box
                key={crumb.label}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  color: theme.palette.text.primary,
                  fontSize: '0.875rem',
                }}
              >
                {crumb.icon}
                {crumb.label}
              </Box>
            ) : (
              <Link
                key={crumb.label}
                component={RouterLink}
                to={crumb.path || '/'}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  color: theme.palette.text.secondary,
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  '&:hover': {
                    color: theme.palette.primary.main,
                  },
                }}
              >
                {crumb.icon}
                {crumb.label}
              </Link>
            );
          })}
        </Breadcrumbs>
      )}

      {/* Title and Actions Row */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <Box>
          {title && (
            <Typography 
              variant="h2" 
              sx={{ 
                fontWeight: 700, 
                color: theme.palette.text.primary,
                mb: subtitle ? 0.5 : 0,
              }}
            >
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography 
              variant="body1" 
              sx={{ color: theme.palette.text.secondary }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>

        <Box sx={{ display: 'flex', gap: 1.5 }}>
          {actions}
          {showQuickActions && (
            <Button
              variant="contained"
              startIcon={<RiFlashlightLine size={18} />}
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.error.main} 0%, ${theme.palette.error.dark} 100%)`,
                '&:hover': {
                  background: `linear-gradient(135deg, ${theme.palette.error.dark} 0%, ${theme.palette.error.main} 100%)`,
                },
              }}
            >
              Quick Actions
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
