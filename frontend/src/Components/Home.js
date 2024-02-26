import React from 'react';
import { Link } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography } from '@mui/material';

const Home = () => {
    return (
        <Box>
            <Box>
                <AppBar position='fixed'>
                    <Toolbar>
                        <Box sx={{ flexGrow: 1 }}></Box>
                        <Box sx={{ display: 'flex' }}>
                            <Typography variant='h5' sx={{ marginRight: '50px', textDecoration: 'none' }}><Link style={{ color: 'inherit', textDecoration: 'none' }} to={'/loginu'} >LOG IN</Link></Typography>
                            <Typography variant='h5' sx={{ marginRight: '50px', textDecoration: 'none' }}><Link style={{ color: 'inherit', textDecoration: 'none' }} to={'/signup'} >SIGN UP</Link></Typography>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <Typography variant='h1' style={{ textAlign: 'center' }}>TO DO LIST</Typography>
            </Box>
        </Box>
    )
}

export default Home