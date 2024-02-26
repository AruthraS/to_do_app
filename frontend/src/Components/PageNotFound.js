import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', flexDirection: 'column' }}>
                <Typography variant='h3' style={{ textAlign: 'center' }}>PAGE NOT FOUND</Typography>
                <Link to={'/'}><Button variant='contained' style={{ backgroundColor: 'white', color: 'black' }}>GO HOME</Button></Link>
            </Box>
        </Box>
    )
}

export default PageNotFound