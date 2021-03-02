import { assign } from "lodash";
import update from "immutability-helper";

import {
	FETCH_AUTH,
	AUTH_CLEAR,
	UPDATE_COLLECTION_STATS
} from "../actions/types";

export const initialState = {
	user: null,
	collectionCounts: {}
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
		default:
			return state;
	}
};

