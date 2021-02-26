import React, { Component, useCallback, useEffect, useState, useRef, useMemo } from "react";
import { connect } from "react-redux";


class ProxiesLibrary extends Component {

	componentDidMount() {
	}

	componentDidUpdate(prevprops) {
	}

	render() {

		return (
     		<div>
				Proxies library
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		authenticated: state.auth.authenticated
	};
}

export default {
	component: connect(mapStateToProps, {
    })(ProxiesLibrary)
}