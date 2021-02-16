import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";


class AboutPage extends Component {

	render() {

		return (
     		<div>
				  This is about
			</div>
		);
	}
}

function mapStateToProps({ app }) {
	return {
	};
}

export default {
	component: connect(mapStateToProps, {})(AboutPage)
}