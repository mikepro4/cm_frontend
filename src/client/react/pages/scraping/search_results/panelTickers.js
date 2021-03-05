import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"

class PanelTickers extends Component {
	render() {
		return (
			<div className="panel tickers-container">
                <div className="panel-header">
                    <div className="panel-header-left">
                        <div className="panel-name">TICKERS</div>
                    </div>

                    <div className="panel-header-right">
                    </div>
                </div>
                <div className="panel-content">
                    content
                </div>
            </div>
        )
	}
}

function mapStateToProps(state) {
	return {
	};
}

export default connect(mapStateToProps, {})(PanelTickers);
