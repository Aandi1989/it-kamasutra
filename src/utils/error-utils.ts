import { setAppErrorAC, setAppErrorActionType, setAppStatusAC, setAppStatusActionType } from "../app/app-reducer"
import { ResponseType } from '../api/todolists-api'
import { Dispatch } from "redux"

export const handleServerAppError=<D>(data:ResponseType<D>, dispatch:Dispatch<setAppErrorActionType|setAppStatusActionType>)=>{
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error'))
    }
    dispatch(setAppStatusAC('failed')) 
}

export const handleNetworkAppError=(error:any, dispatch:Dispatch<setAppErrorActionType|setAppStatusActionType>)=>{
    dispatch(setAppErrorAC(error.message ? error.message : 'Some error occurred'))
                dispatch(setAppStatusAC('failed'))
}