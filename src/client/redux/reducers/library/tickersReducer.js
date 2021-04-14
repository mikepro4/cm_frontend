import {
    SEARCH_TICKERS,
    SEARCH_TICKERS_SUCCESS,
    LOAD_TICKER_SUCCESS,
    LOAD_MORE_TICKERS,
    LOAD_MORE_TICKERS_SUCCESS,
    UPDATE_TOTAL_TICKERS_PIXELS,
    UPDATE_TOTAL_SCROLLED_TICKERS_PIXELS,
    UPDATE_TICKER_SEARCH_QUERY,
    CLEAR_TICKER_SEARCH_QUERY,
    UPDATE_TICKER_FILTERS,
    RESET_TICKER_FILTERS
  } from "../../actions/types";

  import * as _ from "lodash";
  
  export const initialState = {
    loading: false,
    current: null,
    loadedCollection: [],
    loadedCollectionCount: null,
    updateCollection: false,
    collectionFilters: {},
    collectionSearchQuery: null,
    collectionSettings: {
        order: {
            label: "DESC",
            value: -1,
        },
        sortProperty: {
            label: "Last 24 hours",
            value: "last24hours"
        },
        offset: 0,
        limit: 20
    },
    totalPixels: 0,
	clientWidth: 0,
	clientHeight: 0,
	totalScrolledPixels: 0,
  };
  
  export const tickersReducer = (state = initialState, action) => {
      switch (action.type) {
        case SEARCH_TICKERS:
            let newColSetSearch = _.merge({}, state.collectionSettings, {
                offset: 0,
                limit: 20
            })
            return {
                ...state,
                loading: true,
                updateCollection: false,
                collectionSettings: newColSetSearch,
                loadedCollection: []
            }
        case SEARCH_TICKERS_SUCCESS:
            return {
                ...state,
                loading: false,
                loadedCollection: action.payload.all,
                loadedCollectionCount: action.payload.count,
            }
        case LOAD_TICKER_SUCCESS:
            return {
                ...state,
                current: action.payload
            }
        case LOAD_MORE_TICKERS:
            let loadMoreColSet = _.merge({}, state.collectionSettings, {
                offset: state.collectionSettings.offset + 20
            })
            return {
                ...state,
                loading: true,
                updateCollection: false,
                collectionSettings: loadMoreColSet
            }
        case LOAD_MORE_TICKERS_SUCCESS:
            let newCollection = _.concat(state.loadedCollection, action.payload.all)
            let newColSet = _.merge({}, state.collectionSettings, {
            })    
            return {
                ...state,
                loading: false,
                loadedCollection: newCollection,
                loadedCollectionCount: action.payload.count,
                collectionSettings: newColSet
            }
        case UPDATE_TOTAL_TICKERS_PIXELS:
            return _.assign({}, state, {
                totalPixels: action.total,
                clientWidth: action.clientWidth,
                clientHeight: action.clientHeight
            });
        case UPDATE_TOTAL_SCROLLED_TICKERS_PIXELS:
            return _.assign({}, state, {
                totalScrolledPixels: action.pixels
            }); 
        case UPDATE_TICKER_SEARCH_QUERY:
            return _.assign({}, state, {
                collectionSearchQuery: action.payload
            })
        case CLEAR_TICKER_SEARCH_QUERY:
            return _.assign({}, state, {
                collectionSearchQuery: null
            }); 
        case UPDATE_TICKER_FILTERS:
            return {
                ...state,
                collectionFilters: action.payload
            }
        case RESET_TICKER_FILTERS:
            return {
                ...state,
                collectionFilters: {}
            }
        default:
            return state;
        }
  };
  