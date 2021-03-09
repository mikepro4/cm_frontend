import * as _ from "lodash";
import axios from "axios";

import {
  	SEARCH_VIDEOS,
  	SEARCH_VIDEOS_SUCCESS,
  	CREATE_VIDEO,
  	CREATE_VIDEO_SUCCESS,
  	DELETE_VIDEO,
  	LOAD_VIDEO_SUCCESS,
  	CLEAR_CURRENT_VIDEO,
  	UPDATE_VIDEO,
  	UPDATE_VIDEO_SUCCESS,
  	UPDATE_VIDEO_FILTERS,
	RESET_VIDEO_FILTERS,
	UPDATE_VIDEO_COLLECTION_SETTINGS,
	LOAD_MORE_VIDEOS,
	LOAD_MORE_VIDEOS_SUCCESS,
	UPDATE_TOTAL_VIDEOS_PIXELS,
	UPDATE_TOTAL_SCROLLED_VIDEOS_PIXELS
} from "../../actions/types";

import { reset } from "redux-form";

// =============================================================================

export const createVideo = (metadata, success) => async (dispatch, getState, api) => {

    dispatch({
        type: CREATE_VIDEO
    });

	const res = await api.post("/videos/create", {
        metadata: metadata
    });

	dispatch({
		type: CREATE_VIDEO_SUCCESS,
		payload: res.data
	})

  if (success) {
		success(res.data);
	}
}

// =============================================================================

export const searchVideos = (
	criteria,
	sortProperty,
	offset = 0,
	limit = 0,
	success
) => async (dispatch, getState, api) => {

	let object = getState().videosLibrary

	dispatch({
		type: SEARCH_VIDEOS
	});

	let criteria = getState().videosLibrary.collectionFilters

	const response = await api.post("/videos/search", {
			criteria,
			sortProperty: object.collectionSettings.sortProperty.value,
			offset: 0,
			limit: 20,
			order: object.collectionSettings.order.value 
		}
	)

	dispatch({
		type: SEARCH_VIDEOS_SUCCESS,
		payload: response.data
	});

	if (response.data && success) {
		success();
	}
};

export const searchVideosManual = (
	criteria,
	sortProperty,
	offset = 0,
	limit = 10,
	success
) => async (dispatch, getState, api) => {

	let order = -1 

	const response = await api.post("/videos/search", {
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

export const loadMoreVideos = (
	limit,
	offset,
	success
) => async (dispatch, getState, api) => {

	let object = getState().videosLibrary

	dispatch({
		type: LOAD_MORE_VIDEOS
	});

	let criteria = getState().videosLibrary.collectionFilters

	console.log({
		criteria,
		sortProperty: object.collectionSettings.sortProperty.value,
		offset: offset,
		limit: limit,
		order: object.collectionSettings.order.value 
	}
	)


	const response = await api.post("/videos/search", {
			criteria,
			offset,
			limit,
			sortProperty: object.collectionSettings.sortProperty.value,
			order: object.collectionSettings.order.value 
		}
	);


	// dispatch({
	// 	type: LOAD_MORE_VIDEOS_SUCCESS,
	// 	payload: response.data
	// });

	if (response.status === 200) {
		console.log(response.data.all);
		dispatch({
			type: LOAD_MORE_VIDEOS_SUCCESS,
			payload: response.data
		});
	}

	if (response.data && success) {
		success();
	}
};

// =============================================================================

export const deleteVideo = (videoId, success) => async (
	dispatch,
	getState,
	api
) => {

    const response = await api.post("/videos/delete", { videoId });
    
    if(response) {
        dispatch({
            type: DELETE_VIDEO
        });
    }

	if (success) {
		success(response.data);
	}
};

// =============================================================================

export const updateVideo = (videoId, newVideo, success) => async (
	dispatch,
	getState,
	api
) => {
  dispatch({
    type: UPDATE_VIDEO
  });

	const response = await api.post("/videos/update", {
		videoId,
		newVideo
	});

    if(response) {
        dispatch({
        type: UPDATE_VIDEO_SUCCESS,
        payload: response.data.video
        });
    }

	if (success) {
		success(response.data);
	}
};

// =============================================================================

export const loadVideo = (videoId, success) => async (
	dispatch,
	getState,
	api
) => {

    const response = await api.post("/videos/details", { videoId });
    
    if(response) {
        dispatch({
            type: LOAD_VIDEO_SUCCESS,
            payload: response.data
		});

		if (success) {
			success();
		}
    }

	
};

// =============================================================================

export const clearCurrentVideo = (success) => async (
	dispatch
) => {

    dispatch({
        type: CLEAR_CURRENT_VIDEO
    });

	if (success) {
		success(response.data);
	}
};

// =============================================================================

export const updateVideoFilters = (filters) => async (
	dispatch
) => {

    dispatch({
		type: UPDATE_VIDEO_FILTERS,
		payload: filters
	});
}

export const resetVideoFilters = () => async (
	dispatch
) => {

    dispatch({
		type: RESET_VIDEO_FILTERS,
	});

	dispatch(reset("video_filters"));
}

// =============================================================================

export const updateVideoCollectionSettings = (item, prop) => async (
	dispatch
) => {

    dispatch({
		type: UPDATE_VIDEO_COLLECTION_SETTINGS,
		payload: item,
		prop: prop
	});

	dispatch(searchVideos())
}

// =============================================================================

export const validateSymbol = (values, dispatch, props, field)  => {
	if (props.initialValues && props.initialValues.symbol == values.symbol) {
		return Promise.resolve();
	} else {
		return axios
		.post("/api//videos/validate_symbol", {
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

export const updateTotalVideosPixels = (total, clientWidth, clientHeight) => async (dispatch, getState) => {
	dispatch({
		type: UPDATE_TOTAL_VIDEOS_PIXELS,
		total: total,
		clientWidth: clientWidth,
		clientHeight: clientHeight,
	});
}

export const updateTotalScrolledVideosPixels = (px) => async (dispatch, getState) => {
	dispatch({
		type: UPDATE_TOTAL_SCROLLED_VIDEOS_PIXELS,
		pixels: px
	});
}

/////////////////////////////////////////////////