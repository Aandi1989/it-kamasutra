import { TasksStateType } from '../App';
import { v1 } from 'uuid';
import { AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType } from './todolists-reducer';
import { TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType } from '../api/todolists-api'
import { Dispatch } from 'redux';
import { AppRootStateType } from './store';

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    taskId: string
    todolistId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    task: TaskType
}

export type UpdateTaskActionType = {
    type: 'UPDATE-TASK',
    todolistId: string
    taskId: string
    model:UpdateTaskModelType
}


export type SetTasksActionType = {
    type: 'SET-TASKS',
    todolistId: string
    tasks:Array<TaskType>
}

type ActionsType = RemoveTaskActionType | AddTaskActionType
    | UpdateTaskActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | SetTasksActionType

const initialState: TasksStateType = {
    /*"todolistId1": [
        { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ],
    "todolistId2": [
        { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ]*/

}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const newTask: TaskType = action.task
            const tasks = stateCopy[action.task.todoListId];
            const newTasks = [newTask, ...tasks];
            stateCopy[action.task.todoListId] = newTasks;
            return stateCopy;
        }
        case 'UPDATE-TASK': {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, ...action.model} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todoList.id]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        case 'SET-TODOLISTS':{
            let stateCopy={...state}
            action.todolists.forEach(tl=>{
                stateCopy[tl.id]=[]
            })
            return stateCopy
        }
        case 'SET-TASKS':{
            return{...state,[action.todolistId]:action.tasks}
        }
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (task:TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}
export const updateTaskAC = (taskId: string, model:UpdateTaskModelType, todolistId: string): UpdateTaskActionType => {
    return {type: 'UPDATE-TASK', model, todolistId, taskId}
}
export const setTasksAC = ( todolistId: string, tasks:Array<TaskType>): SetTasksActionType => {
    return {type: 'SET-TASKS', todolistId, tasks}
}

export const FetchTasksThunk=(todoListId:string)=>(dispatch:Dispatch)=>{
    todolistsAPI.getTasks(todoListId)
    .then(res=>{
        dispatch(setTasksAC(todoListId,res.data.items))
    })
}
export const removeTaskThunk=(taskId: string,todolistId:string)=>(dispatch:Dispatch)=>{
    todolistsAPI.deleteTask(taskId,todolistId)
    .then(res=>{
        if(res.data.resultCode==0){
            dispatch(removeTaskAC(taskId,todolistId))
        }
    })
}
export const createTaskThunk=(todolistId:string, title:string)=>(dispatch:Dispatch)=>{
    todolistsAPI.createTask(todolistId,title)
    .then(res=>{
        if(res.data.resultCode==0){
            let task=res.data.data.item
            dispatch(addTaskAC( task))
        }
    })
}

export type UpdateTaskModelDomainType={
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export const UpdateTaskThunk=(id: string, modelDomain:UpdateTaskModelDomainType, todolistId: string)=>(dispatch:Dispatch, getState:()=>AppRootStateType)=>{
    const state=getState();
    const task=state.tasks[todolistId].find(task=>task.id==id)
    if(!task){
        return
    }
    const model:UpdateTaskModelType={
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        ...modelDomain
    }
    todolistsAPI.updateTask(todolistId, id, model)
    .then(res=>{
        if(res.data.resultCode==0){
            dispatch(updateTaskAC(id,model, todolistId))
        }
    })
}
