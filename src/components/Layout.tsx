import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  Box, Drawer, AppBar, Toolbar, List, Typography, Divider, 
  IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText,
  useTheme, useMediaQuery
} from '@mui/material';
import { Menu as MenuIcon, LayoutDashboard, CheckSquare, Tags, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const drawerWidth = 280;

const menuItems = [
  { text: 'Dashboard', icon: <LayoutDashboard size={24} />, path: '/' },
  { text: 'Tareas', icon: <CheckSquare size={24} />, path: '/tasks' },
  { text: 'Categorías', icon: <Tags size={24} />, path: '/categories' },
  { text: 'Ajustes Premium', icon: <Settings size={24} />, path: '/settings' },
];

const Layout: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Toolbar sx={{ my: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', px: 3 }}>
        <Typography variant="h5" color="primary" sx={{ fontWeight: 900, letterSpacing: '-0.5px' }}>
          TaskFlow<Typography component="span" variant="h5" color="secondary" sx={{ fontWeight: 900 }}>Pro</Typography>
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Edelweiss Edition
        </Typography>
      </Toolbar>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)', mx: 2 }} />
      <List sx={{ px: 2, py: 3, flexGrow: 1 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                  if (isMobile) setMobileOpen(false);
                }}
                sx={{
                  borderRadius: 3,
                  py: 1.5,
                  backgroundColor: isActive ? 'rgba(0, 245, 255, 0.1)' : 'transparent',
                  color: isActive ? 'primary.main' : 'text.secondary',
                  '&:hover': {
                    backgroundColor: isActive ? 'rgba(0, 245, 255, 0.15)' : 'rgba(255,255,255,0.05)',
                    color: isActive ? 'primary.light' : 'text.primary',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ 
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '1rem'
                  }} 
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      
      {/* Footer Area */}
      <Box sx={{ p: 3 }}>
         <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)', mb: 3 }} />
         <Typography variant="body2" color="text.secondary" align="center">
           Made with ❤️ | TaskFlowPro
         </Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Top App Bar (Mobile Only) */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          display: { md: 'none' },
          width: '100%',
          bgcolor: 'rgba(10, 10, 10, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" color="primary" fontWeight={800}>
            TaskFlow<Typography component="span" variant="h6" color="secondary" fontWeight={800}>Pro</Typography>
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Navigation Drawer */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth, 
              bgcolor: 'background.paper',
              backgroundImage: 'none',
              borderRight: '1px solid rgba(255,255,255,0.05)'
            },
          }}
        >
          {drawer}
        </Drawer>
        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth, 
              bgcolor: 'background.paper',
              backgroundImage: 'none',
              borderRight: '1px solid rgba(255,255,255,0.05)'
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 4 },
          width: { xs: '100%', md: `calc(100% - ${drawerWidth}px)` },
          mt: { xs: 8, md: 0 },
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default Layout;
