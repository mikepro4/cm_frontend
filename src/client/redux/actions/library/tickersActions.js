import * as _ from "lodash";
import axios from "axios";

import {
  	SEARCH_TICKERS,
  	SEARCH_TICKERS_SUCCESS,
  	CREATE_TICKER,
  	CREATE_TICKER_SUCCESS,
  	DELETE_TICKER,
  	LOAD_TICKER_SUCCESS,
  	CLEAR_CURRENT_TICKER,
  	UPDATE_TICKER,
  	UPDATE_TICKER_SUCCESS,
  	UPDATE_TICKER_FILTERS,
	RESET_TICKER_FILTERS,
	UPDATE_TICKER_COLLECTION_SETTINGS,
	LOAD_MORE_TICKERS,
	LOAD_MORE_TICKERS_SUCCESS,
	UPDATE_TOTAL_TICKERS_PIXELS,
	UPDATE_TOTAL_SCROLLED_TICKERS_PIXELS
} from "../../actions/types";

import { reset } from "redux-form";

// =============================================================================

export const createTicker = (metadata, success) => async (dispatch, getState, api) => {

    dispatch({
        type: CREATE_TICKER
    });

	const res = await api.post("/tickers/create", {
        metadata: metadata
    });

	dispatch({
		type: CREATE_TICKER_SUCCESS,
		payload: res.data
	})

  if (success) {
		success(res.data);
	}
}

// =============================================================================

export const searchTickers = (
	criteria,
	sortProperty,
	offset = 0,
	limit = 0,
	success
) => async (dispatch, getState, api) => {

	let object = getState().tickersLibrary

	dispatch({
		type: SEARCH_TICKERS
	});

	let criteria = getState().tickersLibrary.collectionFilters

	const response = await api.post("/tickers/search", {
			criteria,
			sortProperty: object.collectionSettings.sortProperty.value,
			offset: 0,
			limit: 20,
			order: object.collectionSettings.order.value 
		}
	)

	dispatch({
		type: SEARCH_TICKERS_SUCCESS,
		payload: response.data
	});

	if (response.data && success) {
		success();
	}
};

export const searchTickersManual = (
	criteria,
	sortProperty,
	offset = 0,
	limit = 10,
	success
) => async (dispatch, getState, api) => {

	let order = -1 

	const response = await api.post("/tickers/search", {
			criteria,
			sortProperty,
			offset,
			limit,
			order
		}
	);

	if (success) {
		success(response.data);
	}
};
// =============================================================================

export const loadMoreTickers = (
	limit,
	offset,
	success
) => async (dispatch, getState, api) => {

	let object = getState().tickersLibrary

	dispatch({
		type: LOAD_MORE_TICKERS
	});

	let criteria = getState().tickersLibrary.collectionFilters

	console.log({
		criteria,
		sortProperty: object.collectionSettings.sortProperty.value,
		offset: offset,
		limit: limit,
		order: object.collectionSettings.order.value 
	}
	)


	const response = await api.post("/tickers/search", {
			criteria,
			offset,
			limit,
			sortProperty: object.collectionSettings.sortProperty.value,
			order: object.collectionSettings.order.value 
		}
	);


	// dispatch({
	// 	type: LOAD_MORE_TICKERS_SUCCESS,
	// 	payload: response.data
	// });

	if (response.status === 200) {
		console.log(response.data.all);
		dispatch({
			type: LOAD_MORE_TICKERS_SUCCESS,
			payload: response.data
		});
	}

	if (response.data && success) {
		success();
	}
};

// =============================================================================

export const deleteTicker = (tickerId, success) => async (
	dispatch,
	getState,
	api
) => {

    const response = await api.post("/tickers/delete", { tickerId });
    
    if(response) {
        dispatch({
            type: DELETE_TICKER
        });
    }

	if (success) {
		success(response.data);
	}
};

// =============================================================================

export const updateTicker = (tickerId, newTicker, success) => async (
	dispatch,
	getState,
	api
) => {
  dispatch({
    type: UPDATE_TICKER
  });

	const response = await api.post("/tickers/update", {
		tickerId,
		newTicker
	});

    if(response) {
        dispatch({
        type: UPDATE_TICKER_SUCCESS,
        payload: response.data.ticker
        });
    }

	if (success) {
		success(response.data);
	}
};

// =============================================================================

export const loadTicker = (tickerId, success) => async (
	dispatch,
	getState,
	api
) => {

    const response = await api.post("/tickers/details", { tickerId });
    
    if(response) {
        dispatch({
            type: LOAD_TICKER_SUCCESS,
            payload: response.data
		});

		if (success) {
			success();
		}
    }

	
};

// =============================================================================

export const clearCurrentTicker = (success) => async (
	dispatch
) => {

    dispatch({
        type: CLEAR_CURRENT_TICKER
    });

	if (success) {
		success(response.data);
	}
};

// =============================================================================

export const updateTickerFilters = (filters) => async (
	dispatch
) => {

    dispatch({
		type: UPDATE_TICKER_FILTERS,
		payload: filters
	});
}

export const resetTickerFilters = () => async (
	dispatch
) => {

    dispatch({
		type: RESET_TICKER_FILTERS,
	});

	dispatch(reset("ticker_filters"));
}

// =============================================================================

export const updateTickerCollectionSettings = (item, prop) => async (
	dispatch
) => {

    dispatch({
		type: UPDATE_TICKER_COLLECTION_SETTINGS,
		payload: item,
		prop: prop
	});

	dispatch(searchTickers())
}

// =============================================================================

export const validateSymbol = (values, dispatch, props, field)  => {
	if (props.initialValues && props.initialValues.symbol == values.symbol) {
		return Promise.resolve();
	} else {
		return axios
		.post("/api//tickers/validate_symbol", {
			symbol: values.symbol
		})
		.then(response => {
			if (response.status === 200) {
			}
		})
		.catch(error => {
			throw { symbol: "Already Exists" };
		});
	}
		
};

// =============================================================================


/////////////////////////////////////////////////

export const updateTotalTickersPixels = (total, clientWidth, clientHeight) => async (dispatch, getState) => {
	dispatch({
		type: UPDATE_TOTAL_TICKERS_PIXELS,
		total: total,
		clientWidth: clientWidth,
		clientHeight: clientHeight,
	});
}

export const updateTotalScrolledTickersPixels = (px) => async (dispatch, getState) => {
	dispatch({
		type: UPDATE_TOTAL_SCROLLED_TICKERS_PIXELS,
		pixels: px
	});
}

/////////////////////////////////////////////////