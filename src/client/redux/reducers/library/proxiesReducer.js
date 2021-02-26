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
        limit: 0
    }
  };
  
  export const proxiesReducer = (state = initialState, action) => {
      switch (action.type) {
        case SEARCH_PROXYS:
            return {
                ...state,
                loading: true,
                updateCollection: false
            }
        case SEARCH_PROXYS_SUCCESS:
            return {
                ...state,
                loading: false,
                loadedCollection: action.payload.all,
                loadedCollectionCount: action.payload.count
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
                current: action.payload
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
        case UPDATE_PROXY_COLLECTION_SETTINGS:
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
  