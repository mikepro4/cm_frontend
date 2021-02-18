import React from "react";
import App from "../App";
import Home from "../react/pages/home";
import About from "../react/pages/about";

import RequireAuth from "../react/pages/auth/require_auth"
import Signin from "../react/pages/auth/signin"
const HomeAuth = RequireAuth(Home)

export default [
	{
		...App,
		routes: [
			{	
				component: HomeAuth,
				path: "/",
				exact: true,
				params: {
					name: "home"
				},

			},
			{
				...Signin,
				path: "/auth/signin",
				exact: true,
				params: {
					name: "signin"
				},

			},
			{
				...About,
				path: "/about",
				exact: true,
				params: {
					name: "about"
				},

			}
		]
	}
];