import React, { Component, useCallback, useEffect, useState, useRef, useMemo } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
const REACT_VERSION = React.version;


class HomePage extends Component {

	componentDidMount() {
		if(this.props.authenticated) {
			this.props.history.push("/trending")
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

export default connect(mapStateToProps, {})(HomePage)