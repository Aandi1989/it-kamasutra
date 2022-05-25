import React, { useCallback, useEffect } from 'react'
import './App.css';
import {Todolist } from './Todolist';
import { AddItemForm } from './AddItemForm';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Menu } from '@mui/icons-material';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    TodolistDomainType
} from './state/todolists-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from './state/tasks-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './state/store';
import axios from 'axios';
import { TaskType, todolistsAPI, UpdateTaskModelType } from "./api/todolists-api"


export type FilterValuesType = 'all' | 'active' | 'completed';


export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {

    //requests
    const settings = {
        withCredentials: true,
        headers: {
            "api-key": '22c76d3a-d364-4963-9ac6-fcd4ad3cce7b'
        }
    }
    useEffect(() => {
        const model:UpdateTaskModelType= {
deadline: '',
description:'',
priority: 1,
startDate: '',
status: 0,
title: "Zalupa"
        }
        // todolistsAPI.getTodolists()
        // todolistsAPI.createTodolist('With ResponseType')
        // todolistsAPI.deleteTodolist('9d73e882-9c0d-4a4d-a774-6836a15f010d')
        // todolistsAPI.updateTodolist('6b3aa51c-55a8-4df6-90d6-2a16aea9c293',"SuperPuper Updated Title")
        todolistsAPI.getTasks('6b3aa51c-55a8-4df6-90d6-2a16aea9c293')
        // todolistsAPI.createTask('6b3aa51c-55a8-4df6-90d6-2a16aea9c293','SupernewTask')
        // todolistsAPI.deleteTask('6b3aa51c-55a8-4df6-90d6-2a16aea9c293','89f2c31c-8eb4-4b3d-8c2a-98783c28e0a9')
        todolistsAPI.updateTask('6b3aa51c-55a8-4df6-90d6-2a16aea9c293','8bc243dc-b829-4c06-acd5-93971813c72b',model )

    }, [])
    //

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch();

    const removeTask = useCallback(function (id: string, todolistId: string) {
        const action = removeTaskAC(id, todolistId);
        dispatch(action);
    }, []);

    const addTask = useCallback(function (title: string, todolistId: string) {
        const action = addTaskAC(title, todolistId);
        dispatch(action);
    }, []);

    const changeStatus = useCallback(function (id: string, isDone: number, todolistId: string) {
        const action = changeTaskStatusAC(id, isDone, todolistId);
        dispatch(action);
    }, []);

    const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
        const action = changeTaskTitleAC(id, newTitle, todolistId);
        dispatch(action);
    }, []);

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value);
        dispatch(action);
    }, []);

    const removeTodolist = useCallback(function (id: string) {
        const action = removeTodolistAC(id);
        dispatch(action);
    }, []);

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        const action = changeTodolistTitleAC(id, title);
        dispatch(action);
    }, []);

    const addTodolist = useCallback((title: string) => {
        const action = addTodolistAC(title);
        dispatch(action);
    }, [dispatch]);

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
            <Container fixed>
                <Grid container style={{ padding: '20px' }}>
                    <AddItemForm addItem={addTodolist} />
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];

                            return <Grid item key={tl.id}>
                                <Paper style={{ padding: '10px' }}>
                                    <Todolist
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={allTodolistTasks}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;
