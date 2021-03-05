import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"

import PanelStatus from "./panelStatus"
import PanelTickers from "./panelTickers"
import PanelVideos from "./panelVideos"

class TabStatus extends Component {

	render() {

		return (
			<div className="status-container">
                <div className="status-panel">
                    <PanelStatus />
                </div>
                <div className="ticker-panel">
                    <PanelTickers />
                </div>
                <div className="video-panel">
                    <PanelVideos />
                </div>
            </div>
        )
	}
}

function mapStateToProps(state) {
	return {
	};
}

export default connect(mapStateToProps, {})(TabStatus);
