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
	LOAD_MORE_TICKERS_SUCCESS
  } from "../../actions/types";

  import * as _ from "lodash";
  
  export const initialState = {
    loading: false,
    current: {},
    loadedCollection: [],
    loadedCollectionCount: null,
    updateCollection: false,
    collectionFilters: {},
    collectionSettings: {
        order: {
            label: "DESC",
            value: -1,
        },
        sortProperty: {
            label: "Date Created",
            value: "createdAt"
        },
        offset: 0,
        limit: 20
    }
  };
  
  export const tickersReducer = (state = initialState, action) => {
      switch (action.type) {
        case SEARCH_TICKERS:
            let newColSetSearch = _.merge({}, state.collectionSettings, {
                limit: 20,
                offset: 0
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
        case CREATE_TICKER:
            return {
                ...state,
                loading: true,
            }
        case CREATE_TICKER_SUCCESS:
            return {
                ...state,
                loading: false,
                updateCollection: true
            }
        case DELETE_TICKER:
            return {
                ...state,
                updateCollection: true
            }
        case LOAD_TICKER_SUCCESS:
            return {
                ...state,
                current: action.payload
            }
        case CLEAR_CURRENT_TICKER:
            return {
                ...state,
                current: {}
            };
        case UPDATE_TICKER:
            return {
                ...state,
                loading: true,
            }
        case UPDATE_TICKER_SUCCESS:
            return {
                ...state,
                loading: false,
                current: action.payload
            }
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
        case LOAD_MORE_TICKERS:
            let loadMoreColSet = _.merge({}, state.collectionSettings, {
                limit: state.collectionSettings.limit + 20,
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
                limit: state.collectionSettings.limit + 20,
                offset: state.collectionSettings.offset + 20
            })
            console.log({
                limit: action.payload.limit,
                offset: action.payload.offset
            })
            
            return {
                ...state,
                loading: false,
                loadedCollection: newCollection,
                loadedCollectionCount: action.payload.count,
                collectionSettings: newColSet
            }
        case UPDATE_TICKER_COLLECTION_SETTINGS:
            let newColelctionSettings = _.merge({}, state.collectionSettings, {
                [action.prop]: action.payload
            })
            return {
                ...state,
                collectionSettings: newColelctionSettings
            }
        default:
            return state;
        }
  };
  