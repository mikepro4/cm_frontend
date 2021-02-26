import * as _ from "lodash";

import {
  	SEARCH_PROXYS,
  	SEARCH_PROXYS_SUCCESS,
  	CREATE_PROXY,
  	CREATE_PROXY_SUCCESS,
  	DELETE_PROXY,
  	LOAD_PROXY_SUCCESS,
  	CLEAR_CURRENT_PROXY,
  	UPDATE_PROXY,
  	UPDATE_PROXY_SUCCESS,
  	UPDATE_PROXY_FILTERS,
	RESET_PROXY_FILTERS,
	UPDATE_PROXY_COLLECTION_SETTINGS
} from "../../actions/types";

import { reset } from "redux-form";

// =============================================================================

export const createProxy = (metadata, success) => async (dispatch, getState, api) => {

    dispatch({
        type: CREATE_PROXY
    });

	const res = await api.post("/proxies/create", {
        metadata: metadata
    });

	dispatch({
		type: CREATE_PROXY_SUCCESS,
		payload: res.data
	})

  if (success) {
		success(res.data);
	}
}

// =============================================================================

export const searchProxies = (
	criteria,
	sortProperty,
	offset = 0,
	limit = 0,
	success
) => async (dispatch, getState, api) => {

	let object = getState().proxies

	dispatch({
		type: SEARCH_PROXYS
	});

	let criteria = getState().proxies.collectionFilters

	const response = await api.post("/proxies/search", {
			criteria,
			sortProperty: object.collectionSettings.sortProperty.value,
			offset: object.collectionSettings.offset,
			limit: object.collectionSettings.limit,
			order: object.collectionSettings.order.value 
		}
	);

	dispatch({
		type: SEARCH_PROXYS_SUCCESS,
		payload: response.data
	});

	if (response.data && success) {
		success();
	}
};

export const searchProxiesManual = (
	criteria,
	sortProperty,
	offset = 0,
	limit = 0,
	success
) => async (dispatch, getState, api) => {

	let order = -1 

	const response = await api.post("/proxies/search", {
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

export const deleteProxy = (proxyId, success) => async (
	dispatch,
	getState,
	api
) => {

    const response = await api.post("/proxies/delete", { proxyId });
    
    if(response) {
        dispatch({
            type: DELETE_PROXY
        });
    }

	if (success) {
		success(response.data);
	}
};

// =============================================================================

export const updateProxy = (proxyId, newProxy, success) => async (
	dispatch,
	getState,
	api
) => {
  dispatch({
    type: UPDATE_PROXY
  });

	const response = await api.post("/proxies/update", {
		proxyId,
		newProxy
	});

    if(response) {
        dispatch({
        type: UPDATE_PROXY_SUCCESS,
        payload: response.data.proxy
        });
    }

	if (success) {
		success(response.data);
	}
};

// =============================================================================

export const loadProxy = (proxyId, success) => async (
	dispatch,
	getState,
	api
) => {

    const response = await api.post("/proxies/details", { proxyId });
    
    if(response) {
        dispatch({
            type: LOAD_PROXY_SUCCESS,
            payload: response.data
		});

		if (success) {
			success();
		}
    }

	
};

// =============================================================================

export const clearCurrentProxy = (success) => async (
	dispatch
) => {

    dispatch({
        type: CLEAR_CURRENT_PROXY
    });

	if (success) {
		success(response.data);
	}
};

// =============================================================================

export const updateProxyFilters = (filters) => async (
	dispatch
) => {

    dispatch({
		type: UPDATE_PROXY_FILTERS,
		payload: filters
	});
}

export const resetProxyFilters = () => async (
	dispatch
) => {

    dispatch({
		type: RESET_PROXY_FILTERS,
	});

	dispatch(reset("proxy_filters"));
}

// =============================================================================

export const updateProxyCollectionSettings = (item, prop) => async (
	dispatch
) => {

    dispatch({
		type: UPDATE_PROXY_COLLECTION_SETTINGS,
		payload: item,
		prop: prop
	});

	dispatch(searchProxies())
}

// =============================================================================
