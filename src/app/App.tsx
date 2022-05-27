import React from 'react'
import './App.css'
import { TodolistsList } from '../features/TodolistsList/TodolistsList'

// You can learn about the difference by reading this guide on minimizing bundle size.
// https://mui.com/guides/minimizing-bundle-size/
// import { AppBar, Button, Container, IconButton, Toolbar, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Menu } from '@mui/icons-material';
import { LinearProgress } from '@mui/material';
import {CustomizedSnackbars} from '../components/ErrorSnackBar/ErrorSnackBar';
import { AppRootStateType } from './store';
import { RequestStatusType } from './app-reducer';
import { useSelector } from 'react-redux';


export default function App() {

    const status=useSelector<AppRootStateType,RequestStatusType>(state=>state.app.status)

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>

            </AppBar>
            <div className='container'>
                { status=='loading'  && <LinearProgress className='container__linear' />}
            </div>
            <Container fixed>
                <TodolistsList />
                <CustomizedSnackbars/>
            </Container>
        </div>
    )
}


