export type RequestStatusType='idle' | 'loading' | 'succeeded' | 'failed'

export type InitialType={
    status: RequestStatusType,
    error: null | string
}

const initialState:InitialType={
    status:'idle',
    error: null
}

export const appReducer = (state:InitialType=initialState, action:ActionType)=>{
    switch(action.type){
        case 'APP/SET-STATUS':
            return {...state, status:action.status}
        case 'APP/SET-ERROR':
            return {...state, error:action.error}
        default:
            return {...state}
    }
}

export type setAppErrorActionType= ReturnType<typeof setAppErrorAC>
export type setAppStatusActionType= ReturnType<typeof setAppStatusAC>

type ActionType=setAppStatusActionType | setAppErrorActionType

export const setAppStatusAC=(status:RequestStatusType)=>({
    type:'APP/SET-STATUS', status
} as const)
export const setAppErrorAC=(error:null | string)=>({
    type:'APP/SET-ERROR', error
} as const)
