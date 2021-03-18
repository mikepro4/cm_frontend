import { assign } from "lodash";
import update from "immutability-helper";

import {
	FETCH_AUTH,
	AUTH_CLEAR,
	UPDATE_COLLECTION_STATS,
	SHOW_APP_MENU,
	HIDE_APP_MENU
} from "../actions/types";

export const initialState = {
	user: null,
	collectionCounts: {},
	menuOpen: false
};

export const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_AUTH:
			return {
				...state,
				user: action.payload
			}
		case AUTH_CLEAR:
			return {
				...state,
				user: null
			}
		case UPDATE_COLLECTION_STATS:
			return {
				...state,
				collectionCounts: action.payload
			}
		case SHOW_APP_MENU:
			return {
				...state,
				menuOpen: true
			}
		case HIDE_APP_MENU:
			return {
				...state,
				menuOpen: false
			}
		default:
			return state;
	}
};

