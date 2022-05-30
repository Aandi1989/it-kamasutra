import { ActionFromReducer, Dispatch } from 'redux'
import { authAPI } from '../../api/todolists-api'
import { SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType } from '../../app/app-reducer'
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-utils'

const initialState = {
   isLoggedIn: false,
   isInitialized:false
}
export type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
   switch (action.type) {
       case 'login/SET-IS-LOGGED-IN':
           return {...state, isLoggedIn: action.value}
        case 'auth/SET-IS-INITIALIZED-IN':
            return {...state, isInitialized: action.value}
       default:
           return state
   }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
   ({type: 'login/SET-IS-LOGGED-IN', value} as const)
   export const setInitializedAC = (value: boolean) =>
   ({type: 'auth/SET-IS-INITIALIZED-IN', value} as const)

// thunks
export const loginTC = (data: any) => (dispatch: Dispatch<ActionsType>) => {
   dispatch(setAppStatusAC('loading'))
   authAPI.login(data)
        .then(res=>{
            if(res.data.resultCode==0){
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            }   else{
                handleServerAppError(res.data, dispatch);
            }
        })
       
        .catch((error) => {
            handleServerNetworkError(error, dispatch);})
}

export const authTC=()=>(dispatch:Dispatch<ActionsType>)=>{
    dispatch(setAppStatusAC('loading'))
    authAPI.me()
    .then(res=>{
            if(res.data.resultCode==0){
                dispatch(setInitializedAC(true))
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            }else{
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch);})
}

export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
         .then(res=>{
             if(res.data.resultCode==0){
                 dispatch(setIsLoggedInAC(false))
                 dispatch(setAppStatusAC('succeeded'))
             }   else{
                 handleServerAppError(res.data, dispatch);
             }
         })
        
         .catch((error) => {
             handleServerNetworkError(error, dispatch);})
 }

// types
type ActionsType = ReturnType<typeof setIsLoggedInAC>| ReturnType<typeof setInitializedAC> | SetAppStatusActionType | SetAppErrorActionType