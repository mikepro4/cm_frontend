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

  import * as _ from "lodash";
  import moment from "moment";
  
  export const initialState = {
    active: false,
    paused: false,
    loading: false,
    scrapingStatus: {},
    currentCycle: {},
    previousCycle: {},
    tickers: [],
    videos: [],
    pausedOnTicker: {}
  };
  
  export const scrapingSearchResults = (state = initialState, action) => {
    switch (action.type) {
        case START_SCRAPING_SEARCH_RESULTS:
            return {
                ...state,
                loading: true,
            }
        case START_SCRAPING_SEARCH_RESULTS_SUCCESS:
            return {
                ...state,
                loading: false,
                active: true
            }
        case STOP_SCRAPING_SEARCH_RESULTS:
            return {
                ...state,
                loading: true,
            }
        case STOP_SCRAPING_SEARCH_RESULTS_SUCCESS:
            return {
                ...state,
                loading: false,
                active: false,
                paused: false
            }
        case PAUSE_SCRAPING_SEARCH_RESULTS:
            return {
                ...state,
                loading: true,
            }
        case PAUSE_SCRAPING_SEARCH_RESULTS_SUCCESS:
            return {
                ...state,
                loading: false,
                active: false,
                paused: true
            }
        case LOAD_SCRAPING_SEARCH_RESULTS_STATUS:
            return {
                ...state,
                loading: true,
            }
        case LOAD_SCRAPING_SEARCH_RESULTS_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                scrapingStatus: action.payload,
                active: action.payload.scrapingSearchActive
            }
        case UPDATE_CURRENT_CYCLE_SEARCH_RESULTS:
            return {
                ...state,
                loading: false,
                currentCycle: action.payload
            }
        case UPDATE_PREVIOUS_CYCLE_SEARCH_RESULTS:
            return {
                ...state,
                loading: false,
                previousCycle: action.payload
            }
        case UPDATE_TICKERS_SEARCH_RESULTS:
            let newTickersCollection = _.concat(state.tickers, action.payload).slice(0, 100)
            return {
                ...state,
                loading: false,
                tickers: newTickersCollection
            }
        case UPDATE_VIDEOS_SEARCH_RESULTS:
            let newVideosCollection = _.concat(state.videos, action.payload).slice(0, 100)
            return {
                ...state,
                loading: false,
                videos: newVideosCollection
            }
        default:
            return state;
        }
  };
  