import { Dispatch } from "react"
import { SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType } from "../../app/app-reducer"
import { TasksStateType } from "../TodolistsList/tasks-reducer"
import { SetTodolistsActionType } from "../TodolistsList/todolists-reducer"
// import {LoginParamsType} from "../../api/todolists-api"
import {authAPI} from "../../api/todolists-api"
import { handleServerAppError, handleServerNetworkError } from "../../utils/error-utils"

let initialState: InitialStateType = {}

export const loginReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        default:
            return state
    }
}

// actions
export const removeTaskAC = (taskId: string, todolistId: string) => ({type: 'REMOVE-TASK', taskId, todolistId} as const)


// thunks
export const loginTC = (email:string,password:string,rememberMe:boolean) => (dispatch:any) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(email,password,rememberMe)
    .then(res => {
        console.log(res)
        if (res.data.resultCode === 0) {
            alert("yo")
        } else {
            handleServerAppError(res.data, dispatch);
        }
    })
    .catch((error) => {
        handleServerNetworkError(error, dispatch)
    })
}
// types
type ActionsType=any
type InitialStateType={}

type ThunkDispatch = Dispatch<ActionsType> | SetAppStatusActionType | SetAppErrorActionType
