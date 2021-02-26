import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { routerReducer } from "connected-react-router";
import { appReducer } from "./appReducer";
import { authReducer } from "./authReducer";
import { connectRouter } from "connected-react-router";
import { tickersReducer } from "./library/tickersReducer";
import { proxiesReducer } from "./library/proxiesReducer";


export default (history) => combineReducers({
	router: connectRouter(history),
	form: formReducer,
	app: appReducer,
	auth: authReducer,
	tickersLibrary: tickersReducer,
	proxiesLibrary: proxiesReducer
})