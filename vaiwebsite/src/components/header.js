import React,{useEffect,useState} from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import logo from '../components/images/logo.jpg';
import { useAuth } from './auth/useauth';

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#000000',
});

const Header = () => {
  const auth = useAuth();
  const [renderCount, setRenderCount] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/home';
  };
  useEffect(() => {
    const handleBeforeUnload = () => {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        localStorage.clear();
      }
    };
  
    window.addEventListener('beforeunload', handleBeforeUnload);
  
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  useEffect(() => {
    // Clear localStorage when auth.user becomes false (user logs out)
    if (!auth.user) {
      localStorage.clear();
    }
  }, [auth.user]);


  
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const useStyles = {
    title: {
      flexGrow: 1,
      fontSize: '1.5rem',
      fontWeight: 'bold',
    },
    logo: {
      marginRight: '8px',
    },
    button: {
      fontSize: '1rem',
      fontWeight: 'bold',
      marginBottom: '8px',
      marginLeft: '8px',
    },
    username: {
      marginRight: '8px',
      fontSize: '1rem',
      fontWeight: 'bold',
    },
  };

  return (
    <StyledAppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
        <Box display="flex" alignItems="center">
          <img src={logo} alt="Logo"  style={{ height: '50px', width: 'auto', marginTop: '10px', ...useStyles.logo }} />
          <Typography variant="h6" sx={{ ...useStyles.title, marginBottom: '10px' }}>
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Button color="inherit" sx={useStyles.button} component={Link} to="/home">
            Home
          </Button>
          <Button color="inherit" sx={useStyles.button} component={Link} to="/category">
            Category
          </Button>
          <Button color="inherit" sx={useStyles.button} component={Link} to="/contact">
            Contact
          </Button>
          {auth.user && (
            <>
              {auth.role === 'admin' ? (
                <>
                  <Button
                    color="inherit"
                    sx={useStyles.button}
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    Admin Dashboard
                  </Button>
                  <Menu
                    id="admin-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  > 
                    <MenuItem component={Link} to="/admin-dashboard">Dashboard</MenuItem>
                    <MenuItem component={Link} to="/admin-tool">tool</MenuItem>
                    <MenuItem component={Link} to="/enquiry">enquiry</MenuItem>
                    <MenuItem component={Link} to="/profile">Profile</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
              <>
                <Button
                  color="inherit"
                  sx={useStyles.button}
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  Dashboard
                </Button>
                <Typography variant="body1" sx={useStyles.username}>
                  {auth.username}
                </Typography>
                <Menu
                  id="user-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem component={Link} to="/profile">Profile</MenuItem>
                  <MenuItem component={Link} to="/addtool">Submit Product</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
              )}
            </>
          )}
               {!auth.user && (
  <Button 
    color="inherit" 
    sx={useStyles.button} 
    component={Link} 
    to="/login"
    onClick={() => localStorage.clear()} // Added onClick handler to clear localStorage
  >
    Login
  </Button>
)}
   
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
