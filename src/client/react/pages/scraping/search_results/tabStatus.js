import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"

class TabStatus extends Component {

	render() {

		return (
			<div className="status-container">
                <div className="status-panel">status</div>
                <div className="ticker-panel">tidker</div>
                <div className="video-panel">videos</div>
            </div>
        )
	}
}

function mapStateToProps(state) {
	return {
	};
}

export default connect(mapStateToProps, {})(TabStatus);
