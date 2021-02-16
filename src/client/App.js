import React, { Component } from "react";
import { connect } from "react-redux";
import { renderRoutes } from "react-router-config";

class App extends Component {
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
	component: connect(mapStateToProps, {})(App)
};