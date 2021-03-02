import {
    SHOW_MODAL_TICKER_NEW,
	HIDE_MODAL_TICKER_NEW,
	SHOW_MODAL_PROXY_NEW,
    HIDE_MODAL_PROXY_NEW
} from "../actions/types";

export const initialState = {
	tickerNew: false,
	proxyNew: false,
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
		case SHOW_MODAL_PROXY_NEW:
			return {
				...state,
				proxyNew: true
			}
		case HIDE_MODAL_PROXY_NEW:
			return {
				...state,
				proxyNew: false
			}
		default:
			return state;
	}
};
