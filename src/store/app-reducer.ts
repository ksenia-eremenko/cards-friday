const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return { ...state, status: action.status }
        case 'APP/SET-ERROR':
            return { ...state, error: action.error }
        case 'APP/SET-IS-INITIALIZED':
            return { ...state, isInitialized: action.value }
        default:
            return { ...state }
    }
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = typeof initialState

export const setAppError = (error: string | null) => ({ type: 'APP/SET-ERROR', error } as const)
export const setAppStatus = (status: RequestStatusType) => ({ type: 'APP/SET-STATUS', status } as const)
export const setIsInitialized = (value: boolean) => ({ type: 'APP/SET-IS-INITIALIZED', value } as const)


export type SetAppErrorActionType = ReturnType<typeof setAppError>
export type SetAppStatusActionType = ReturnType<typeof setAppStatus>
export type setIsInitializedType = ReturnType<typeof setIsInitialized>


type ActionsType =
    | SetAppErrorActionType
    | SetAppStatusActionType
    | setIsInitializedType
