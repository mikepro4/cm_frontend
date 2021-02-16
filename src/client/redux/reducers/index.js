import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { routerReducer } from "connected-react-router";
import { appReducer } from "./appReducer";
import { connectRouter } from "connected-react-router";


export default (history) => combineReducers({
	router: connectRouter(history),
	form: formReducer,
	appReducer: appReducer
})