import * as _ from "lodash";

import {
    SHOW_MODAL_TICKER_NEW,
    HIDE_MODAL_TICKER_NEW
} from "../actions/types";

/////////////////////////////////////////////////

export const showTickerNewModal = () => async (dispatch, getState, api) => {
	dispatch({
		type: SHOW_MODAL_TICKER_NEW,
	})
}

export const hideTickerNewModal = () => async (dispatch, getState, api) => {
	dispatch({
		type: HIDE_MODAL_TICKER_NEW,
	})
}

/////////////////////////////////////////////////