import React, { Component } from "react";
import { connect } from "react-redux";
import { renderRoutes } from "react-router-config";
import { authUser } from "../client/redux/actions/auth_actions"

class App extends Component {
	componentDidMount() {
		const token = localStorage.getItem('token');
		if (token) {
			console.log("auth")
			this.props.authUser()
		}
	}
	render() {
		return (
			<div className="app">
				{renderRoutes(this.props.route.routes)}
			</div>
		)
	}
}
function mapStateToProps(state) {
	return {
		appReducer: state.appReducer
	};
}

export default {
	component: connect(mapStateToProps, {
		authUser
	})(App)
};