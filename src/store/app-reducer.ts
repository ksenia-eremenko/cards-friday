const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    openMenu: false
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    console.log(state);

    switch (action.type) {
        case 'APP/SET-STATUS':
            return { ...state, status: action.status }
        case 'APP/SET-ERROR':
            return { ...state, error: action.error }
        case 'APP/OPEN-MENU':
            return { ...state, openMenu: action.openMenu }
        default:
            return { ...state }
    }
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    openMenu: boolean
}

export const setAppErrorAC = (error: string | null) => ({ type: 'APP/SET-ERROR', error } as const)
export const setAppStatusAC = (status: RequestStatusType) => ({ type: 'APP/SET-STATUS', status } as const)
export const setAppOpenMenuAC = (openMenu: boolean) => ({ type: 'APP/OPEN-MENU', openMenu } as const)

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type setAppOpenMenuActionType = ReturnType<typeof setAppOpenMenuAC>

type ActionsType =
    | SetAppErrorActionType
    | SetAppStatusActionType
    | setAppOpenMenuActionType
