import React from 'react';
import { 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  Typography,
  Avatar,
  IconButton,
  Divider,
  Chip,
  useTheme,
} from '@mui/material';
import { RiMenuFoldLine, RiMenuUnfoldLine, RiArrowUpDownLine } from 'react-icons/ri';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { toggleSidebar } from '@/redux/slices/sidebarSlice';
import { adminNavSections } from '@/constants/NavItems/adminNavs';

const DRAWER_WIDTH = 260;
const COLLAPSED_WIDTH = 80;

const Sidebar: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isCollapsed } = useSelector((state: RootState) => state.sidebar);
  const { user } = useSelector((state: RootState) => state.auth);

  const handleToggle = () => {
    dispatch(toggleSidebar());
  };

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isCollapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: isCollapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH,
          boxSizing: 'border-box',
          borderRight: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.paper,
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          overflowX: 'hidden',
        },
      }}
    >
      {/* Logo Section */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: isCollapsed ? 'center' : 'space-between',
          padding: isCollapsed ? '20px 0' : '20px 16px',
          minHeight: 72,
        }}
      >
        {!isCollapsed && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: '10px',
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 700,
                fontSize: '1.25rem',
              }}
            >
              ∞
            </Box>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 700, 
                color: theme.palette.text.primary,
                letterSpacing: '-0.5px'
              }}
            >
              Finloop
            </Typography>
          </Box>
        )}
        {isCollapsed && (
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: '10px',
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 700,
              fontSize: '1.25rem',
            }}
          >
            ∞
          </Box>
        )}
        {!isCollapsed && (
          <IconButton onClick={handleToggle} size="small">
            <RiMenuFoldLine size={20} />
          </IconButton>
        )}
      </Box>

      {isCollapsed && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <IconButton onClick={handleToggle} size="small">
            <RiMenuUnfoldLine size={20} />
          </IconButton>
        </Box>
      )}

      {/* Navigation Sections */}
      <Box sx={{ flex: 1, overflow: 'auto', py: 1 }}>
        {adminNavSections.map((section, sectionIndex) => (
          <Box key={section.title} sx={{ mb: 2 }}>
            {!isCollapsed && (
              <Typography
                variant="body2"
                sx={{
                  px: 3,
                  py: 1,
                  color: theme.palette.text.secondary,
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                {section.title}
              </Typography>
            )}
            <List sx={{ px: 1.5 }}>
              {section.items.map((item) => {
                const active = isActive(item.path);
                return (
                  <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
                    <ListItemButton
                      onClick={() => navigate(item.path)}
                      sx={{
                        borderRadius: '10px',
                        minHeight: 44,
                        justifyContent: isCollapsed ? 'center' : 'flex-start',
                        px: isCollapsed ? 2 : 2,
                        backgroundColor: active 
                          ? `${theme.palette.primary.main}14` 
                          : 'transparent',
                        '&:hover': {
                          backgroundColor: active 
                            ? `${theme.palette.primary.main}20` 
                            : theme.palette.action.hover,
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: isCollapsed ? 0 : 40,
                          justifyContent: 'center',
                          color: active 
                            ? theme.palette.primary.main 
                            : theme.palette.text.secondary,
                        }}
                      >
                        <item.icon size={20} />
                      </ListItemIcon>
                      {!isCollapsed && (
                        <>
                          <ListItemText
                            primary={item.title}
                            primaryTypographyProps={{
                              fontSize: '0.875rem',
                              fontWeight: active ? 600 : 400,
                              color: active 
                                ? theme.palette.primary.main 
                                : theme.palette.text.primary,
                            }}
                          />
                          {item.badge && (
                            <Chip
                              label={item.badge > 9 ? '9+' : item.badge}
                              size="small"
                              sx={{
                                height: 22,
                                minWidth: 28,
                                fontSize: '0.7rem',
                                fontWeight: 600,
                                backgroundColor: theme.palette.primary.main,
                                color: 'white',
                              }}
                            />
                          )}
                        </>
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
            {sectionIndex < adminNavSections.length - 1 && !isCollapsed && (
              <Divider sx={{ mx: 3, mt: 2 }} />
            )}
          </Box>
        ))}
      </Box>

      {/* User Profile Section */}
      <Box
        sx={{
          borderTop: `1px solid ${theme.palette.divider}`,
          p: isCollapsed ? 1 : 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: isCollapsed ? 0 : 1.5,
            justifyContent: isCollapsed ? 'center' : 'flex-start',
            p: 1,
            borderRadius: '10px',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
          }}
        >
          <Avatar
            src={user?.avatar}
            alt={user?.name}
            sx={{ 
              width: 40, 
              height: 40,
              bgcolor: theme.palette.primary.main,
            }}
          >
            {user?.name?.charAt(0)}
          </Avatar>
          {!isCollapsed && (
            <>
              <Box sx={{ flex: 1 }}>
                <Typography 
                  variant="body1" 
                  sx={{ fontWeight: 600, fontSize: '0.875rem' }}
                >
                  {user?.name}
                </Typography>
              </Box>
              <RiArrowUpDownLine size={16} color={theme.palette.text.secondary} />
            </>
          )}
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
