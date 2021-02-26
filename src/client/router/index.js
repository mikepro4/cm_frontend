import React from "react";
import App from "../App";
import Home from "../react/pages/home";
import About from "../react/pages/about";

import RequireAuth from "../react/pages/auth/require_auth"
import Signin from "../react/pages/auth/signin"
import Signup from "../react/pages/auth/signup"
import Signout from "../react/pages/auth/signout"

import TickersLibrary from "../react/pages/library/tickers"
import ProxiesLibrary from "../react/pages/library/proxies"

export default [
	{
		...App,
		routes: [
			{	
				component: RequireAuth(Home),
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
				...Signup,
				path: "/auth/signup",
				exact: true,
				params: {
					name: "signup"
				},

			},
			{
				...Signout,
				path: "/auth/signout",
				exact: true,
				params: {
					name: "signout"
				},

			},
			{
				...About,
				path: "/about",
				exact: true,
				params: {
					name: "about"
				},

			},
			{
				...TickersLibrary,
				path: "/library/tickers",
				exact: true,
				params: {
					name: "tickers_library"
				},

			},
			{
				...ProxiesLibrary,
				path: "/library/proxies",
				exact: true,
				params: {
					name: "proxies_library"
				},

			},
		]
	}
];