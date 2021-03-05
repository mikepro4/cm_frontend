import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"

class PanelStatus extends Component {
	render() {
		return (
			<div className="panel status-container">
                <div>panel status</div>
            </div>
        )
	}
}

function mapStateToProps(state) {
	return {
	};
}

export default connect(mapStateToProps, {})(PanelStatus);
