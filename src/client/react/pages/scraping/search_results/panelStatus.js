import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"

import ScrapingControls from "../../../components/scraping_controls"
import { 
	startScrapingSearchResults,
	stopScrapingSearchResults
} from "../../../../redux/actions/scraping/searchResults"


class PanelStatus extends Component {
	onStart = () => {
		console.log("start")
		this.props.startScrapingSearchResults()
	}
	onStop = () => {
		console.log("stop")
		this.props.stopScrapingSearchResults()
	}
	onPause = () => {
		console.log("pause")
	}
	onRestart = () => {
		console.log("restart")
	}
	render() {
		return (
			<div className="panel status-panel-container">
				<ScrapingControls
					active={this.props.scrapingSearchResults.active}
					paused={this.props.scrapingSearchResults.paused}
					loading={this.props.scrapingSearchResults.loading}
					start={() => this.onStart()}
					stop={() => this.onStop()}
					pause={() => this.onPause()}
					restart={() => this.onRestart()}
				/>
                <div>panel status</div>
            </div>
        )
	}
}

function mapStateToProps(state) {
	return {
		scrapingSearchResults: state.scrapingSearchResults
	};
}

export default connect(mapStateToProps, {
	startScrapingSearchResults,
	stopScrapingSearchResults
})(PanelStatus);
