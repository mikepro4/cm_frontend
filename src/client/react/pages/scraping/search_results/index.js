import React, { Component } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";

import { Alignment, Classes, H3, H5, Position, Toaster, Intent, Spinner, InputGroup, Navbar, Switch, Tab, TabId, Tabs, Tab2, Tabs2,  } from "@blueprintjs/core";

import qs from "qs";
import { updateQueryString } from "../../../../redux/actions/appActions";
import { 
	loadScrapingSearchResultsStatus,
	updateTickersSearchResults,
	updateVideosSearchResults
} from "../../../../redux/actions/scraping/searchResults";
import { io } from "../../../../socket"

import TabStatus from "./tabStatus"

class ScrapingSearchResults extends Component {
	constructor() {
		super();
		this.state = {
        	selectedTabId: "1"
		};
	}

    componentDidUpdate = (prevProps, prevState) => {
		if (prevState.selectedTabId !== this.getQueryParams().selectedTabId) {
			this.setState({
				selectedTabId: this.getQueryParams().selectedTabId
			});
		}
    };
    
    getQueryParams = () => {
		return qs.parse(this.props.location.search.substring(1));
    };
    
    componentDidMount = () => {

		this.props.loadScrapingSearchResultsStatus()
		let socket = io()

		// KEY TO SOCKETS
		
		socket.on('tickerUpdate',(data)=> { 
			this.props.updateTickersSearchResults(data)
		})

		socket.on('videoUpdate',(data)=>{ 
			this.props.updateVideosSearchResults(data)
		})

		if (this.props.location.search) {
			let queryParams = this.getQueryParams();
			this.setState({
				selectedTabId: queryParams.selectedTabId
			});
		}
	};

	handleTabChange = value => {
		this.setState({
			selectedTabId: value
		});

		this.props.updateQueryString(
			{ selectedTabId: value },
			this.props.location,
			this.props.history
		);
	};


	renderHead = () => (
		<Helmet>
			<title>Proxys Page</title>
			<meta property="og:title" content="Homepage" />
		</Helmet>
	)

	render() {
		if(this.props.authenticated) {
			return (
				<div className="route-container route-scraping">
					<Toaster position={Position.BOTTOM_RIGHT} ref="toaster" />

					<div className="route-title-tabs">Scraping / <span>Search Results</span></div>
	
					<div className="route-content-container">
                        <Tabs
                            id="Tabs2Example"
                            onChange={this.handleTabChange}
                            selectedTabId={this.state.selectedTabId}
                            large={true}
                        >
                            <Tab id="1" title="Status" panel={<TabStatus/>} />

                            <Tab id="2" title="Cycle history" panel={<div>Cycle history</div>} />
                            <Tab id="3" title="Proxy log" panel={<div>Proxy log</div>} />
                        </Tabs>
					</div>

				</div>
			);
		} else {
			return <div className="spinner-container"><Spinner intent={Intent.NONE} size={50} /></div>
		}
		
	}
}

function mapStateToProps(state) {
	return {
		authenticated: state.auth.authenticated
	};
}

export default {
	component: connect(mapStateToProps, {
		updateQueryString,
		loadScrapingSearchResultsStatus,
		updateTickersSearchResults,
		updateVideosSearchResults
	})(ScrapingSearchResults)
}
