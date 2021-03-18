import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { authUser, fetchCurrentUser, clearCurrentUser } from "../client/redux/actions/auth_actions"
import { getCollectionStats} from "../client/redux/actions/appActions"
import Logo from "./react/components/logo"
import classNames from "classnames";
import socketIOClient from "socket.io-client";

import Nav from './react/components/nav/'
import Menu from "./react/components/menu"

import { FocusStyleManager } from "@blueprintjs/core";

import { 
	updateTickersSearchResults,
	updateVideosSearchResults
} from "./redux/actions/scraping/searchResults";
import { io } from "./socket"

FocusStyleManager.onlyShowFocusOnTabs();

export let socket

class App extends Component {
	componentDidMount() {
		const token = localStorage.getItem('token');
		if (token) {
			this.props.authUser()
			this.props.fetchCurrentUser()
			this.props.getCollectionStats()

			setInterval(() => {
				this.props.getCollectionStats()
			}, 10000)
		}

		let socket = io()

		socket.on('tickerUpdate',(data)=> { 
			this.props.updateTickersSearchResults(data)
		})

		socket.on('videoUpdate',(data)=>{ 
			this.props.updateVideosSearchResults(data)
		})

	}

	render() {
		
		return (
			<div className="app">

				{/* {this.props.authenticated && <div className="app-sidebar">
					<div className="app-logo">
						<Logo />
					</div>

					<Nav />
					<div 
						className="user-email"
					>
						<div 
							className={classNames({
									"email": true,
									"bp3-skeleton": !this.props.app.user
								})
							}
						>
							{this.props.app.user && this.props.app.user.email}
						</div>

						<Link to="/auth/signout" className="signout">Sign out</Link>

					</div>
					

				</div>} */}

				<Menu/>
				

				<div className="app-route-container">
					{renderRoutes(this.props.route.routes)}
				</div>
			</div>
		)
	}
}
function mapStateToProps(state) {
	return {
		appReducer: state.appReducer,
		authenticated: state.auth.authenticated,
		app: state.app
	};
}

export default {
	component: connect(mapStateToProps, {
		authUser,
		fetchCurrentUser,
		clearCurrentUser,
		getCollectionStats,
		updateTickersSearchResults,
		updateVideosSearchResults
	})(App)
};