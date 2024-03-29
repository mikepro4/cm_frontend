import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { routerReducer } from "connected-react-router";
import { appReducer } from "./appReducer";
import { authReducer } from "./authReducer";
import { connectRouter } from "connected-react-router";
import { tickersReducer } from "./library/tickersReducer";
import { videosReducer } from "./library/videosReducer";
import { proxiesReducer } from "./library/proxiesReducer";
import { modalsReducer } from "./modalsReducer";
import { scrapingSearchResults } from "./scraping/searchResultsReducer";
import { pricesReducer } from "./pricesReducer";

export default (history) => combineReducers({
	router: connectRouter(history),
	form: formReducer,
	app: appReducer,
	auth: authReducer,
	modals: modalsReducer,
	tickersLibrary: tickersReducer,
	videosLibrary: videosReducer,
	proxiesLibrary: proxiesReducer,
	scrapingSearchResults: scrapingSearchResults,
	prices: pricesReducer
})