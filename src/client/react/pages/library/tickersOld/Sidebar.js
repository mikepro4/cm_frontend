import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Button, Intent  } from "@blueprintjs/core";
import * as _ from 'lodash'

import ItemFiltersForm from "./ItemFiltersForm"

import {
	searchTickers,
	updateTickerFilters,
	resetTickerFilters
} from '../../../../redux/actions/library/tickersActions'

import {
	submitForm,
} from '../../../../redux/actions/formActions'

class Sidebar extends Component {
	handleSubmit = values => {
		this.props.searchTickers()
	}

	render() {
		return (
			<div className="route-sidebar">
                <div className="route-sidebar-header">

					<div className="route-sidebar-header-section route-sidebar-header-left">
						<div className="route-sidebar-header-title">
							Ticker Filters
						</div>
					</div>

					<div className="route-sidebar-header-section route-sidebar-header-right">
						<Button
							text="Reset"
							minimal="true"
							onClick={()=>  {
								this.props.resetTickerFilters()
								this.props.searchTickers()
							}}
						/>
						<Button
							intent={Intent.PRIMARY}
							minimal="true"
							text="Search"
							onClick={()=> this.props.submitForm("ticker_filters")}
						/>
					</div>
				</div>

				<div className="route-sidebar-content">
					<ItemFiltersForm
						onSubmit={this.handleSubmit.bind(this)}
						enableReinitialize="true"
						initialValues={this.props.tickers ? this.props.tickers.collectionFilters : ""}
						onChange={(values) => this.props.updateTickerFilters(values)}
					/>
				</div>
            </div>
		);
	}
}

function mapStateToProps(state) {
	return {
		location: state.router.location,
		tickers: state.tickersLibrary,
	};
}

export default connect(mapStateToProps, {
	searchTickers,
	updateTickerFilters,
	resetTickerFilters,
	submitForm
})(withRouter(Sidebar));
