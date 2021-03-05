import {
	UPDATE_COLLECTION_STATS
} from "../actions/types";

import moment from "moment";
import * as _ from "lodash";
import qs from "qs";


/////////////////////////////////////////////////

export const getCollectionStats = () => async (
    dispatch,
	getState,
	api
) => {

    api
        .get("/collections/counts")
		.then(response => {
            dispatch({
                type: UPDATE_COLLECTION_STATS,
                payload: response.data
            });
		})
		.catch(() => {
            console.log("gail")
        });
}

/////////////////////////////////////////////////


export const updateQueryString = (
	updatedState,
	location,
	history
) => dispatch => {
	let queryParams = qs.parse(location.search.substring(1));
	const updatedQuery = _.assign({}, queryParams, updatedState);
	const str = qs.stringify(updatedQuery);
	history.push({
		search: "?" + str
	});
};
