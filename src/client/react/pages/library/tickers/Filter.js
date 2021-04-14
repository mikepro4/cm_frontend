import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Button, Intent  } from "@blueprintjs/core";
import * as _ from 'lodash'

import FilterForm from "./FilterForm"

import {
	searchTickers,
	updateTickerFilters,
	resetTickerFilters
} from '../../../../redux/actions/library/tickersActions'

import {
	submitForm,
} from '../../../../redux/actions/formActions'

class Filter extends Component {
	handleSubmit = values => {
        this.props.onCloseDrawer()
	}

	render() {
		return (
			<div className="filters-container">
                <div className="filters-header">

					<div className="filters-header-section filters-header-left">
						<div className="filters-header-title">
							Ticker Filters
						</div>
					</div>

					<div className="filters-header-section filters-header-right">
						<Button
							text="Reset"
							minimal="true"
							onClick={()=>  {
								this.props.resetTickerFilters()
                                this.props.searchTickers()
                                this.props.onCloseDrawer()
							}}
						/>
						<Button
							intent={Intent.PRIMARY}
							minimal="true"
							text="Search"
							onClick={()=> {
                                this.props.submitForm("ticker_filters")
                                this.props.onCloseDrawer()
                                this.props.searchTickers()
                            }}
						/>
					</div>
				</div>

				<div className="filters-content">
					<FilterForm
						onSubmit={this.handleSubmit.bind(this)}
						enableReinitialize="true"
						initialValues={this.props.tickers ? this.props.tickers.collectionFilters : ""}
						onChange={(values) => { 
                            this.props.updateTickerFilters(values)
                            this.props.searchTickers()
                        }}
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
})(withRouter(Filter));
