import React from 'react'
import './App.css'
import { TodolistsList } from '../features/TodolistsList/TodolistsList'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from './store'
import { RequestStatusType } from './app-reducer'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import { Menu } from '@mui/icons-material';
import { ErrorSnackbar } from '../components/ErrorSnackbar/ErrorSnackbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Login } from '../features/Login/Login'
import { InitialStateType, logoutTC } from '../features/Login/auth-reducer'

type PropsType = {
    demo?: boolean
}

function App({ demo = false }: PropsType) {
    const dispatch = useDispatch()
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const auth = useSelector<AppRootStateType, InitialStateType>(state => state.auth)
    const logoutHandler = () => {
        dispatch(logoutTC())
    }
    return (
        <div className="App">
            <ErrorSnackbar />
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    {auth.isLoggedIn && <Button onClick={logoutHandler} color="inherit">Log out</Button>}
                </Toolbar>
                <div className='container'>
                    {status == 'loading' && <LinearProgress className='container__linear' />}
                </div>
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path='/' element={<TodolistsList demo={demo} />} />
                    <Route path='login' element={<Login />} />
                    <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>} />
                    <Route path="*" element={<Navigate to={'/404'} />} />
                </Routes>
            </Container>
        </div>
    )
}

export default App
