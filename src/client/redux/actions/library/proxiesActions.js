import * as _ from "lodash";
import axios from "axios";

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
	UPDATE_PROXY_COLLECTION_SETTINGS,
	LOAD_MORE_PROXYS,
	LOAD_MORE_PROXYS_SUCCESS,
	UPDATE_TOTAL_PROXYS_PIXELS,
	UPDATE_TOTAL_SCROLLED_PROXYS_PIXELS,
	TEST_PROXY,
	TEST_PROXY_SUCCESS
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

	let object = getState().proxiesLibrary

	dispatch({
		type: SEARCH_PROXYS
	});

	let criteria = getState().proxiesLibrary.collectionFilters

	const response = await api.post("/proxies/search", {
			criteria,
			sortProperty: object.collectionSettings.sortProperty.value,
			offset: 0,
			limit: 20,
			order: object.collectionSettings.order.value 
		}
	)

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
	limit = 10,
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

export const loadMoreProxies = (
	limit,
	offset,
	success
) => async (dispatch, getState, api) => {

	let object = getState().proxiesLibrary

	dispatch({
		type: LOAD_MORE_PROXYS
	});

	let criteria = getState().proxiesLibrary.collectionFilters

	const response = await api.post("/proxies/search", {
			criteria,
			offset,
			limit,
			sortProperty: object.collectionSettings.sortProperty.value,
			order: object.collectionSettings.order.value 
		}
	);


	if (response.status === 200) {
		console.log(response.data.all);
		dispatch({
			type: LOAD_MORE_PROXYS_SUCCESS,
			payload: response.data
		});
	}

	if (response.data && success) {
		success();
	}
};

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

export const validateIp = (values, dispatch, props, field)  => {
	if (props.initialValues && props.initialValues.ip == values.ip) {
		return Promise.resolve();
	} else {
		return axios
		.post("/api/proxies/validate_ip", {
			ip: values.ip
		})
		.then(response => {
			if (response.status === 200) {
			}
		})
		.catch(error => {
			throw { ip: "Already Exists" };
		});
	}
		
};

// =============================================================================


/////////////////////////////////////////////////

export const updateTotalProxiesPixels = (total, clientWidth, clientHeight) => async (dispatch, getState) => {
	dispatch({
		type: UPDATE_TOTAL_PROXYS_PIXELS,
		total: total,
		clientWidth: clientWidth,
		clientHeight: clientHeight,
	});
}

export const updateTotalScrolledProxiesPixels = (px) => async (dispatch, getState) => {
	dispatch({
		type: UPDATE_TOTAL_SCROLLED_PROXYS_PIXELS,
		pixels: px
	});
}

/////////////////////////////////////////////////

// =============================================================================

export const testProxy = (proxy, addProxy, bannedProxy, notWorkingProxy) => async (
	dispatch,
	getState,
	api
) => {

	dispatch({
		type: TEST_PROXY,
	});

    const response = await api.post("/proxies/test", { proxy });
    
    if(response.status == 200) {
        dispatch({
			type: TEST_PROXY_SUCCESS,
			payload: response.data 
		});

		if(response.data.working) {
			addProxy()
		}

		if(response.data.banned) {
			bannedProxy()
		}

		if(!response.data.banned  && !response.data.working) {
			notWorkingProxy()
		}
	}
};
