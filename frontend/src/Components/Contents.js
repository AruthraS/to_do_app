import React, { useEffect, useState } from 'react';
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import ClearIcon from '@mui/icons-material/Clear';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button, Box, Container, TableContainer, Table, TableBody, TableHead, TableCell, TableRow, Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';

const Contents = () => {
    const { user } = useUser();
    const [cont, setCont] = useState([]);
    const credential = user.username;
    const navigate = useNavigate();
    const { logoutuser } = useUser();
    useEffect(() => {
        axios.get(`http://localhost:8000/${credential}`)
            .then((res) => { setCont(res.data); })
            .catch((err) => { console.log(err + "hi"); })
    }, [credential]);

    function handleDelete(sno) {
        axios.delete(`http://localhost:8000/delete/${sno}`)
            .then(() => { setCont(prev => prev.filter(data => data.sno !== sno)); })
            .catch(err => console.log(err))
    }
    function handleLogout() {
        axios.post(`http://localhost:8000/logout`)
            .then((res) => {
                logoutuser();
                navigate('/');
            })
            .catch((err) => { console.log(err) })
    }
    function handleComplete(sno, arg) {
        axios.put(`http://localhost:8000/status`, { arg, sno})
            .then(() => { setCont(prev => prev.map(data => data.sno === sno ? { ...data, status: arg } : data)) })
            .catch(err => { console.log(err) })
    }
    return (
        <Container>
            <Box sx={{ paddingTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ marginLeft: '10px', marginTop: '10px', alignSelf: 'flex-start' }}><Link to={'/changepassword'} style={{ color: 'inherit', textDecoration: 'None' }}><Button variant='contained' style={{ backgroundColor: 'white', color: 'black' }}><AccountCircleIcon /></Button></Link></Box>
                <Button variant='contained' style={{ backgroundColor: 'white', color: 'black', marginLeft: '10px', marginTop: '10px', alignSelf: 'flex-end' }} onClick={handleLogout}>SIGN OUT</Button>
            </Box>
            <Box style={{ paddingTop: '20px' }}>
                <TableContainer component={Paper} style={{ width: '100%', overflowX: 'auto' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ textAlign: 'center', width: '50%' }}>Tasks</TableCell>
                                <TableCell style={{ textAlign: 'center' }}>Date</TableCell>
                                <TableCell style={{ textAlign: 'center' }}>Time</TableCell>
                                <TableCell style={{ textAlign: 'center' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <Button variant='contained' style={{ backgroundColor: 'white', color: 'black', marginLeft: '10px', marginTop: '10px' }} endIcon={<AddIcon />}><Link style={{ color: 'inherit', textDecoration: 'None' }} to={`/add`}>ADD</Link></Button>
                        <TableBody>
                            {
                                cont ? (cont.map((data, i) => (
                                    <TableRow key={i}>
                                        <TableCell style={{ width: '40%', textDecoration: (data.status) ? 'line-through' : 'none' }}>{data.content}</TableCell>
                                        <TableCell style={{ textAlign: 'center', textDecoration: (data.status) ? 'line-through' : 'none' }}>{data.dd}</TableCell>
                                        <TableCell style={{ textAlign: 'center', textDecoration: (data.status) ? 'line-through' : 'none' }}>{data.dt}</TableCell>
                                        <TableCell style={{ textAlign: 'center' }}>
                                            <Link to={`/update/${data.sno}`}> <Button variant='contained' style={{ backgroundColor: 'white', color: 'black', margin: '5px' }}><UpdateIcon /></Button></Link>
                                            <Button variant='contained' style={{ backgroundColor: 'white', color: 'black', margin: '5px' }} onClick={e => handleComplete(data.sno, 1)}><DoneIcon /></Button>
                                            <Button variant='contained' style={{ backgroundColor: 'white', color: 'black', margin: '5px' }} onClick={e => handleComplete(data.sno, 0)}><ClearIcon /></Button>
                                            <Button variant='contained' style={{ backgroundColor: 'white', color: 'black', margin: '5px' }} onClick={e => handleDelete(data.sno)}><DeleteIcon /></Button>
                                        </TableCell>
                                    </TableRow>
                                ))) : null
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container >
    )
}

export default Contents