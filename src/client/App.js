import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { authUser, fetchCurrentUser, clearCurrentUser } from "../client/redux/actions/auth_actions"
import Logo from "./react/components/logo"
import classNames from "classnames";

import Nav from './react/components/nav/'

class App extends Component {
	componentDidMount() {
		const token = localStorage.getItem('token');
		if (token) {
			this.props.authUser()
			this.props.fetchCurrentUser()
		}
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
		clearCurrentUser
	})(App)
};