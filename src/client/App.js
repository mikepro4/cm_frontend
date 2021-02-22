import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { authUser, getUser } from "../client/redux/actions/auth_actions"
import Logo from "./react/components/logo"

import Nav from './react/components/nav/'

class App extends Component {
	componentDidMount() {
		const token = localStorage.getItem('token');
		if (token) {
			console.log("auth")
			this.props.authUser()
			this.props.getUser()
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

					<Link to="/auth/signout" className="signout">Signout</Link>

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
		authenticated: state.auth.authenticated
	};
}

export default {
	component: connect(mapStateToProps, {
		authUser,
		getUser
	})(App)
};