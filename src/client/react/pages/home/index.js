import React, { Component, useCallback, useEffect, useState, useRef, useMemo } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
const REACT_VERSION = React.version;
import { fetchCurrentUser } from "../../../../client/redux/actions/auth_actions"


class HomePage extends Component {

	componentDidMount() {
		
		if(this.props.authenticated) {
			this.props.history.push("/library/tickers")
		}
	}

	componentDidUpdate(prevprops) {
		if(this.props.authenticated !== prevprops.authenticated) {
			location.reload();

			if(this.props.authenticated) {
				this.props.history.push("/library/tickers")
			}
		}
	}


	render() {

		return (
     		<div>
				
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		authenticated: state.auth.authenticated
	};
}

export default connect(mapStateToProps, {
	fetchCurrentUser
})(HomePage)