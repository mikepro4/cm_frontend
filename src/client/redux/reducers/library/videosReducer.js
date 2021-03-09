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
  
  export const videosReducer = (state = initialState, action) => {
      switch (action.type) {
        case SEARCH_VIDEOS:
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
        case SEARCH_VIDEOS_SUCCESS:
            return {
                ...state,
                loading: false,
                loadedCollection: action.payload.all,
                loadedCollectionCount: action.payload.count,
            }
        case CREATE_VIDEO:
            return {
                ...state,
                loading: true,
            }
        case CREATE_VIDEO_SUCCESS:
            return {
                ...state,
                loading: false,
                updateCollection: true
            }
        case DELETE_VIDEO:
            return {
                ...state,
                updateCollection: true
            }
        case LOAD_VIDEO_SUCCESS:
            return {
                ...state,
                current: action.payload
            }
        case CLEAR_CURRENT_VIDEO:
            return {
                ...state,
                current: {}
            };
        case UPDATE_VIDEO:
            return {
                ...state,
                loading: true,
            }
        case UPDATE_VIDEO_SUCCESS:
            return {
                ...state,
                loading: false,
                current: action.payload,
                updateCollection: true
            }
        case UPDATE_VIDEO_FILTERS:
            return {
                ...state,
                collectionFilters: action.payload
            }
        case RESET_VIDEO_FILTERS:
            return {
                ...state,
                collectionFilters: {}
            }
        case LOAD_MORE_VIDEOS:
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
        case LOAD_MORE_VIDEOS_SUCCESS:
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
        case UPDATE_VIDEO_COLLECTION_SETTINGS:
            let newColelctionSettings = _.merge({}, state.collectionSettings, {
                [action.prop]: action.payload
            })
            return {
                ...state,
                collectionSettings: newColelctionSettings
            }
        case UPDATE_TOTAL_VIDEOS_PIXELS:
            return _.assign({}, state, {
                totalPixels: action.total,
                clientWidth: action.clientWidth,
                clientHeight: action.clientHeight
            });
        case UPDATE_TOTAL_SCROLLED_VIDEOS_PIXELS:
            return _.assign({}, state, {
                totalScrolledPixels: action.pixels
            }); 
        default:
            return state;
        }
  };
  