import { createStore } from 'redux';
import reducers from "./reducers/reducers";


const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__&&
    window.__REDUX_DEVTOOLS_EXTENSION__());


store.subscribe(() => {
    //console.log('subscribe' ,store.getState())
} )


store.dispatch({type: 'ADD_TOOL', toolName: 'Компост' })
store.dispatch({type: 'ADD_TOOL', toolName: 'Диспачер' })


window.store = store;

export default store;
