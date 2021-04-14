import React, { Component } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { Icon, Button, Position, Toaster, Classes, Intent, Spinner } from "@blueprintjs/core";

import qs from "qs";
import * as _ from "lodash"
import { updateQueryString } from "../../../../redux/actions/appActions";

import Header from "./../../../components/header"
import TabBar from "./../../../components/tab_bar"
import OptionsBar from "./../../../components/options_bar"
import Drawer from "./../../../components/drawer"

import Filter from "./Filter"
import Sort from "./Sort"

import { resetForm } from "../../../../redux/actions/formActions"

import { hideDrawer } from "../../../../redux/actions/appActions"

import Content from "./Content"

import {
	searchTickers,
	updateTickerSearchQuery,
	clearTickerSearchQuery
} from '../../../../redux/actions/library/tickersActions'

class TickersLibrary extends Component {
	state = {
		selectedTabId: "1",
		tabs: [
			"All Tickers",
			"Top 100",
			"New activity",
			"Add New",
			"Import"
		]
	};

	resetOptionsBar() {
		this.setState({
			filterOpen: false,
			sortOpen: false,
			viewOpen: false
		})
		// this.props.resetForm("queryForm")
		this.props.hideDrawer()
	}

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

		this.resetOptionsBar()

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

		this.resetOptionsBar()
	};

	renderTab = () => {
		switch (this.state.selectedTabId) {
			case "1":
				return(<Content/>)
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
	
	loadCollection = () => {
		this.props.searchTickers()
	}

	clearSearchQuery = () => {
		this.props.searchTickers()
	}

	renderOptionsBar = () => {
		switch (this.state.selectedTabId) {
			case "1":
				return(
					<OptionsBar
						propertyName="symbol"
						filterOn={true}
						sortOn={true}
						viewOn={false}
						onFilterClick={() =>  {
								if(this.state.filterOpen) {
									this.resetOptionsBar()
								} else {
									this.setState({
										filterOpen: true,
										sortOpen: false,
										viewOpen: false
									})
								}
							}
						}

						onSortClick={() =>  {
								if(this.state.sortOpen) {
									this.resetOptionsBar()
								} else {
									this.setState({
										filterOpen: false,
										sortOpen: true,
										viewOpen: false
									})
								}
							}
						}

						onViewClick={() =>  {
								if(this.state.viewOpen) {
									this.resetOptionsBar()
								} else {
									this.setState({
										filterOpen: false,
										sortOpen: false,
										viewOpen: true
									})
								}
							}
						}
						onChange={(value) => {
							this.props.updateTickerSearchQuery(value)
							this.loadCollection()
						}}
						onSubmit={(value) => this.loadCollection()}
						onSearchClear={(value) => {
							this.props.clearTickerSearchQuery()
							this.loadCollection()
						}}
					/>
				)
			default:
				return ;
		}
	}

	renderSelectedOtionContent = () => {

		if(this.state.filterOpen) {
			return(
				<div className="filter-drawer" id="drawer">
					<Filter
						onCloseDrawer={() => {
							this.resetOptionsBar()
						}}
					/>
				</div>)
		}

		if(this.state.sortOpen) {
			return(
				<div className="sort-drawer" id="drawer">
					<Sort
						sortProperties={[
							{
								value: "last24hours",
								label: "Last 24 hours"
							},
							{
								value: "last48hours",
								label: "Last 48 hours"
							},
							{
								value: "createdAt",
								label: "Date Created"
							},
							{
								value: "previousWeek",
								label: "Previous Week"
							},
							{
								value: "thisWeek",
								label: "This Week"
							},
							{
								value: "thisWeek",
								label: "This Week"
							},
							{
								value: "previousWeek",
								label: "Previous Week"
							},
							{
								value: "growthRate24",
								label: "Growth Rate 24 hours"
							},
							{
								value: "growthRate48",
								label: "Growth Rate 48 hours"
							},
							{
								value: "growthRate72",
								label: "Growth Rate 72 hours"
							},
							{
								value: "score",
								label: "Score"
							},
							{
								value: "symbol",
								label: "Symbol"
							}
						]}
					/>
				</div>
			)
		}
		if(this.state.viewOpen) {
			return(<div className="view-drawer" id="drawer">View</div>)
		}
	}

	maybeSearchOnDrawerClose = () => {
		console.log(this.props.form.ticker_filters)
		if(this.props.tickers && this.props.form && this.props.form.ticker_filters) {
			if(!_.isEqual(this.props.form.ticker_filters.values, this.props.tickers.collectionFilters)) {
				this.loadCollection()
			} else {
			}
		}
	}

	render() {
		if(this.props.authenticated) {

			return (
				<div className="route-container route-tickers">
                    {this.renderHead()}
					<Toaster position={Position.BOTTOM_RIGHT} ref="toaster" />

                    <div className="route-header-container" id="header">

                        <Header 
							title="Tickers"
							onShelfOpen={() => this.resetOptionsBar()}
                        />

						<TabBar
							tabs={this.state.tabs}
							activeTab={this.state.selectedTabId}
							onTabChange={(tab) => this.handleTabChange(tab)}
						/>

						{this.renderOptionsBar()}

                    </div>

					<div className="route-content-container">
						{this.renderTab()}

						<Drawer
							onCLose={() => {
								this.resetOptionsBar()
							}}
						>
							{this.renderSelectedOtionContent()}
						</Drawer>
						
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
		authenticated: state.auth.authenticated,
		tickers: state.tickersLibrary,
		form: state.form
	};
}

export default {
	component: connect(mapStateToProps, {
		updateQueryString,
		resetForm,
		hideDrawer,
		searchTickers,
		updateTickerSearchQuery,
		clearTickerSearchQuery
	})(TickersLibrary)
}
