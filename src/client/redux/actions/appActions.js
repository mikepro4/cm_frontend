import {
	UPDATE_COLLECTION_STATS
} from "../actions/types";


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