import { createStore } from 'redux';


const initialState = [
    'Test', 'Test2'
    ];


function dataTools( state = initialState, action){
    if (action.type === 'ADD_TOOL') {
        return [
            ...state,
            action.toolName
        ];
        }
    return state;
}

const store = createStore(dataTools);


store.subscribe(() => {
    //console.log('subscribe' ,store.getState())
} )


store.dispatch({type: 'ADD_TOOL', toolName: 'Компост' })
store.dispatch({type: 'ADD_TOOL', toolName: 'Диспачер' })

const addToolBtn = document


window.store = store;

export default store;
