import React, { Component } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { Icon, Button, Position, Toaster, Classes, Intent, Spinner } from "@blueprintjs/core";

import qs from "qs";
import { updateQueryString } from "../../../../redux/actions/appActions";

import Header from "./../../../components/header"
import TabBar from "./../../../components/tab_bar"

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
		if (this.props.location.search) {
			if (prevState.selectedTabId !== this.getQueryParams().selectedTabId) {
				this.setState({
					selectedTabId: this.getQueryParams().selectedTabId
				});
			}
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

	renderTab = () => {
		switch (this.state.selectedTabId) {
			case "1":
				return(
                        <div className="placeholder"></div>
				)
			case "2":
				return(
					<div className="placeholder">2</div>
				)
			case "3":
				return(
					<div className="placeholder">3</div>
				)
			case "4":
				return(
					<div className="placeholder">4</div>
				)
			default:
				return ;
		}
	}

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

						<TabBar
							tabs={[
								"All Tickers",
								"Top 100",
								"Add New",
								"Import"
							]}
							activeTab={this.state.selectedTabId}
							onTabChange={(tab) => this.handleTabChange(tab)}
						/>

                    </div>

					<div className="route-content-container">
						{this.renderTab()}
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
