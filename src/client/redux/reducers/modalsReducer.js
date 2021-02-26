import {
    SHOW_MODAL_TICKER_NEW,
    HIDE_MODAL_TICKER_NEW
} from "../actions/types";

export const initialState = {
	tickerNew: false,
};

export const modalsReducer = (state = initialState, action) => {
	switch (action.type) {
		case SHOW_MODAL_TICKER_NEW:
			return {
				...state,
				tickerNew: true
            }
        case HIDE_MODAL_TICKER_NEW:
			return {
				...state,
				tickerNew: false
			}
		default:
			return state;
	}
};
