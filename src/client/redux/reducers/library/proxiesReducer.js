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
    UPDATE_TOTAL_SCROLLED_PROXYS_PIXELS
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
    },
    totalPixels: 0,
	clientWidth: 0,
	clientHeight: 0,
	totalScrolledPixels: 0,
  };
  
  export const proxiesReducer = (state = initialState, action) => {
      switch (action.type) {
        case SEARCH_PROXYS:
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
        case SEARCH_PROXYS_SUCCESS:
            return {
                ...state,
                loading: false,
                loadedCollection: action.payload.all,
                loadedCollectionCount: action.payload.count,
            }
        case CREATE_PROXY:
            return {
                ...state,
                loading: true,
            }
        case CREATE_PROXY_SUCCESS:
            return {
                ...state,
                loading: false,
                updateCollection: true
            }
        case DELETE_PROXY:
            return {
                ...state,
                updateCollection: true
            }
        case LOAD_PROXY_SUCCESS:
            return {
                ...state,
                current: action.payload
            }
        case CLEAR_CURRENT_PROXY:
            return {
                ...state,
                current: {}
            };
        case UPDATE_PROXY:
            return {
                ...state,
                loading: true,
            }
        case UPDATE_PROXY_SUCCESS:
            return {
                ...state,
                loading: false,
                current: action.payload,
                updateCollection: true
            }
        case UPDATE_PROXY_FILTERS:
            return {
                ...state,
                collectionFilters: action.payload
            }
        case RESET_PROXY_FILTERS:
            return {
                ...state,
                collectionFilters: {}
            }
        case LOAD_MORE_PROXYS:
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
        case LOAD_MORE_PROXYS_SUCCESS:
            let newCollection = _.concat(state.loadedCollection, action.payload.all)
            let newColSet = _.merge({}, state.collectionSettings, {
                limit: state.collectionSettings.limit + 20,
                offset: state.collectionSettings.offset + 20
            })    
            return {
                ...state,
                loading: false,
                loadedCollection: newCollection,
                loadedCollectionCount: action.payload.count,
                collectionSettings: newColSet
            }
        case UPDATE_PROXY_COLLECTION_SETTINGS:
            let newColelctionSettings = _.merge({}, state.collectionSettings, {
                [action.prop]: action.payload
            })
            return {
                ...state,
                collectionSettings: newColelctionSettings
            }
        case UPDATE_TOTAL_PROXYS_PIXELS:
            return _.assign({}, state, {
                totalPixels: action.total,
                clientWidth: action.clientWidth,
                clientHeight: action.clientHeight
            });
        case UPDATE_TOTAL_SCROLLED_PROXYS_PIXELS:
            return _.assign({}, state, {
                totalScrolledPixels: action.pixels
            }); 
        default:
            return state;
        }
  };
  