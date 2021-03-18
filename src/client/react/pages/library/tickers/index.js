import React, { Component } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { Icon, Button, Position, Toaster, Classes, Intent, Spinner, Tab, Tabs } from "@blueprintjs/core";

import qs from "qs";
import { updateQueryString } from "../../../../redux/actions/appActions";

import Header from "./../../../components/header"

class TickersLibrary extends Component {
	state = {
        selectedTabId: "1"
	};

	renderHead = () => (
		<Helmet>
			<title>Tickers – Cash Machine</title>
			<meta property="og:title" content="Homepage" />
		</Helmet>
    )

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

	render() {
		if(this.props.authenticated) {
			return (
				<div className="route-container route-tickers">
                    {this.renderHead()}
					<Toaster position={Position.BOTTOM_RIGHT} ref="toaster" />

                    <div className="route-header-container">
                        <Header 
                            title="Tickers"
                        />
                    </div>
                    

                    {/* <Tabs
                        id="Tabs2Example"
                        onChange={this.handleTabChange}
                        selectedTabId={this.state.selectedTabId}
                        large={true}
                    >
                        <Tab id="1" title="Status" panel={
                            } 
                        />

                        <Tab id="2" title="Cycle history" panel={<div>Cycle history</div>} />
                        <Tab id="3" title="Proxy log" panel={<div>Proxy log</div>} />
                    </Tabs> */}

                    <div className="route-content-container">
                        <div className="placeholder"></div>
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
        updateQueryString
	})(TickersLibrary)
}
