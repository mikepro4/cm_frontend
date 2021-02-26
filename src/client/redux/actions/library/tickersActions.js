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
	UPDATE_TICKER_COLLECTION_SETTINGS
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
			offset: object.collectionSettings.offset,
			limit: object.collectionSettings.limit,
			order: object.collectionSettings.order.value 
		}
	);

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
	limit = 0,
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

export const validateSymbol = values => {
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
};

// =============================================================================
