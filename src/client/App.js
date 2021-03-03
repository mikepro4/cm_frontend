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

const BASE_API_URL = "http://cashmachineapi.herokuapp.com:3100" || "http://localhost:3100";

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
	}
	constructor() {
		super();
		this.state = {
		  endpoint: BASE_API_URL // Update 3001 with port on which backend-my-app/server.js is running.
		};
	
		socket = socketIOClient(this.state.endpoint);
	  }
	render() {
		
		return (
			<div className="app">

				{this.props.authenticated && <div className="app-sidebar">
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
					

				</div>}
				

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
		getCollectionStats
	})(App)
};