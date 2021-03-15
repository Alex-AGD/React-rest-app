import { combineReducers } from "redux";

import { dataToolsReducer } from './toolsReducer'
import { dataPriceReducer } from "./toolPriceReducer";

export default combineReducers ({
    tools: dataToolsReducer,
    price: dataPriceReducer

})