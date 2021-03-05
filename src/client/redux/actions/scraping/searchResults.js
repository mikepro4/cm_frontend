import {
    START_SCRAPING_SEARCH_RESULTS,
    START_SCRAPING_SEARCH_RESULTS_SUCCESS,
    STOP_SCRAPING_SEARCH_RESULTS,
    STOP_SCRAPING_SEARCH_RESULTS_SUCCESS,
    PAUSE_SCRAPING_SEARCH_RESULTS,
    PAUSE_SCRAPING_SEARCH_RESULTS_SUCCESS,
    LOAD_SCRAPING_SEARCH_RESULTS_STATUS,
    LOAD_SCRAPING_SEARCH_RESULTS_STATUS_SUCCESS,
    UPDATE_CURRENT_CYCLE_SEARCH_RESULTS,
    UPDATE_PREVIOUS_CYCLE_SEARCH_RESULTS,
    UPDATE_TICKERS_SEARCH_RESULTS,
    UPDATE_VIDEOS_SEARCH_RESULTS
} from "../../actions/types";

// =============================================================================

export const startScrapingSearchResults = (success) => async (dispatch, getState, api) => {

    dispatch({
        type: START_SCRAPING_SEARCH_RESULTS
    });

	const res = await api.get("/scraping/search_results/start");

	dispatch({
		type: START_SCRAPING_SEARCH_RESULTS_SUCCESS,
		payload: res.data
	})

    if (success) {
		success(res.data);
	}
}

// =============================================================================

export const stopScrapingSearchResults = (success) => async (dispatch, getState, api) => {

    dispatch({
        type: STOP_SCRAPING_SEARCH_RESULTS
    });

	const res = await api.get("/scraping/search_results/stop");

	dispatch({
		type: STOP_SCRAPING_SEARCH_RESULTS_SUCCESS,
		payload: res.data
	})

    if (success) {
		success(res.data);
	}
}

// =============================================================================

export const pauseScrapingSearchResults = (success) => async (dispatch, getState, api) => {

    dispatch({
        type: PAUSE_SCRAPING_SEARCH_RESULTS
    });

	const res = await api.get("/scraping/search_results/pause");

	dispatch({
		type: PAUSE_SCRAPING_SEARCH_RESULTS_SUCCESS,
		payload: res.data
	})

    if (success) {
		success(res.data);
	}
}

// =============================================================================

export const loadScrapingSearchResultsStatus = (success) => async (dispatch, getState, api) => {

    dispatch({
        type: LOAD_SCRAPING_SEARCH_RESULTS_STATUS
    });

	const res = await api.get("/scraping/search_results/status");

	dispatch({
		type: LOAD_SCRAPING_SEARCH_RESULTS_STATUS_SUCCESS,
		payload: res.data
	})

    if (success) {
		success(res.data);
	}
}

// =============================================================================

export const updateTickersSearchResults = (videos, success) => async (dispatch, getState, api) => {

    dispatch({
        type: UPDATE_VIDEOS_SEARCH_RESULTS,
        payload: cycle
    });

    if (success) {
		success(res.data);
	}
}

// =============================================================================

export const updateVideosSearchResults = (tickers, success) => async (dispatch, getState, api) => {

    dispatch({
        type: UPDATE_TICKERS_SEARCH_RESULTS,
        payload: cycle
    });

    if (success) {
		success(res.data);
	}
}

// =============================================================================

export const updateCurrentCycleSearchResults = (cycle, success) => async (dispatch, getState, api) => {

    dispatch({
        type: UPDATE_CURRENT_CYCLE_SEARCH_RESULTS,
        payload: cycle
    });

    if (success) {
		success(res.data);
	}
}

// =============================================================================

export const updatePreviousCycleSearchResults = (cycle, success) => async (dispatch, getState, api) => {

    dispatch({
        type: UPDATE_PREVIOUS_CYCLE_SEARCH_RESULTS,
        payload: cycle
    });

    if (success) {
		success(res.data);
	}
}

