const SET_GLOBAL_DATA = 'SET_GLOBAL_DATA'

const initialState = {

}


export const dataToolsReducer = ( state = initialState, action) => {
    switch (action.type) {
        case SET_GLOBAL_DATA:{
            return {
                ...state,...action.data
            }
        }
        default: return state
    }
}

export const setData = (data) => {return { type: SET_GLOBAL_DATA, data }}


