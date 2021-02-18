import {
    AUTH_USER,
    AUTH_USER_SUCCESS,
    SIGNUP_USER,
    SIGNUP_USER_SUCCESS,
    UNAUTH_USER,
    AUTH_ERROR
} from './types';

/////////////////////////////////////////////////

export const authError = (error, success) => async (
    dispatch,
	getState,
	api
) => {
    dispatch({
        type: AUTH_ERROR,
        payload: error,
    });

	if (success) {
		success(error);
	}
};

export const authUser = (success) => async (
    dispatch,
	getState,
	api
) => {
    dispatch({
        type: AUTH_USER_SUCCESS,
    });

	if (success) {
		success();
	}
};

/////////////////////////////////////////////////

export const signinUser = ({ email, password, history, success }) => async (
    dispatch,
	getState,
	api
) => {

    dispatch({
        type: AUTH_USER,
    });

    api
        .post("/signin", { email, password })
		.then(response => {
			dispatch({
                type: AUTH_USER_SUCCESS,
            });
			if (success) {
				success(response.data);
            }
            localStorage.setItem('token', response.data.token);
            history.push("/")
		})
		.catch(() => {
            dispatch(authError('Bad Login Info'));
        });
}

/////////////////////////////////////////////////

export const signupUser = ({  email, password, history, success }) => async (
    dispatch,
	getState,
	api
) => {

    dispatch({
        type: SIGNUP_USER
    });

    api
        .post("/signup", { email, password })
        .then(response => {
            dispatch({
                type: SIGNUP_USER_SUCCESS,
            });
            if (success) {
                success(response.data);
            }
            localStorage.setItem('token', response.data.token);
            history.push("/")
        })
        .catch(() => {
            dispatch(authError('Bad Login Info'));
        });
}

/////////////////////////////////////////////////

export const signoutUser = (success) => async (
    dispatch,
	getState,
	api
) => {
    dispatch({
        type: UNAUTH_USER
    });

    localStorage.removeItem('token');
    console.log('sign out')

	if (success) {
		success(error);
	}
};

/////////////////////////////////////////////////

export const getUser = () => async (
    dispatch,
	getState,
	api
) => {

    api
        .get("/user_details")
		.then(response => {
			console.log(response.data)
		})
		.catch(() => {
            console.log("gail")
        });
}