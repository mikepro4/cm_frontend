import React, { Component } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { Icon, Button, Position, Toaster, Classes, Intent  } from "@blueprintjs/core";
import { Link } from "react-router-dom";
import * as _ from 'lodash'

import {
	loadTicker,
	deleteTicker,
	clearCurrentTicker,
	updateTicker,
	resetTickerFilters,
} from '../../../../redux/actions/library/tickersActions'

import ItemDetailsForm from "./ItemDetailsForm"

import {
	submitForm
} from '../../../../redux/actions/formActions'


class TickerPage extends Component {
	static loadData(store, match) {
		return store.dispatch(loadTicker(match.params.tickerId));
	}

	state = {
	
	};

	componentDidMount() {
		this.props.loadTicker(this.props.match.params.tickerId, () => {
			console.log('load')
		})
	}

	componentWillUnmount() {
		this.props.clearCurrentTicker()
	}

	componentDidUpdate(prevprops) {
		if(prevprops.match.params.tickerId !== this.props.match.params.tickerId) {
			this.props.loadTicker(this.props.match.params.tickerId)
		}
	}

	saveTicker = () => {
        this.props.submitForm("tickerNew")
		this.props.loadTicker(this.props.match.params.tickerId)
		this.props.history.push(`/library/tickers/`);
	}

	saveTickerToast = () => {
		this.refs.toaster.show({
		  message: "Ticker successully saved",
		  intent: Intent.PRIMARY
		});
	}

	deleteTickerToast = () => {
		this.refs.toaster.show({
		  message: "Ticker successully deleted",
		  intent: Intent.SUCCESS
		});
	}

	deleteTicker = () => {
		this.props.deleteTicker(this.props.current._id)
		this.props.history.push(`/library/tickers/`);
		this.deleteTickerToast()
	}
	

	renderHead = () => (
		<Helmet>
			<title>ticker Details Page</title>
			<meta property="og:title" content="Homepage" />
		</Helmet>
    )
    
    handleSubmit = values => {
		let newTickerValues = _.merge({}, this.props.current.metadata, values)
		this.props.updateTicker(this.props.current._id, newTickerValues, () => {
			this.saveTickerToast()
			this.props.history.push(`/library/tickers/`);
        })
	}

	render() {
		return (
            <div className="route-container route-details">
				<Toaster position={Position.BOTTOM_RIGHT} ref="toaster" />
                <div className="route-header">
					<div className="route-header-left">
                        <div className="route-header-back">
							<Button
								icon="arrow-left"
								minimal="true"
								large="true"
								text="Back"
								onClick={() => {
										this.props.history.goBack()
									}
								}
							/>
                        </div>
						<div className="route-title">
                            {this.props.current && this.props.current.metadata && this.props.current.metadata.symbol}
                        </div>
					</div>

					<div className="route-header-right">
						<ul className="route-actions">
							<li>
								<Button
									icon="floppy-disk"
									intent="primary"
									text="Save ticker"
									onClick={() => this.saveTicker()}
								/>
							</li>
							<li>
								<Button
									icon="trash"
									intent="danger"
									text="Delete ticker"
									onClick={() => this.deleteTicker()}
								/>
							</li>
						</ul>
					</div>
				</div>

				<div className="route-content-container">
					<div className="item-container">
						<div className="item-details-container">
                            <ItemDetailsForm 
                                ref="ItemDetails"
                                enableReinitialize="true"
                                initialValues={this.props.current ? this.props.current.metadata : ""}
                                onSubmit={this.handleSubmit.bind(this)}
                            />
						</div>
					</div>
				</div>

            </div>
		);
	}
}

function mapStateToProps(state) {
	return {
		current: state.tickersLibrary.current
	};
}

export default {
	component: connect(mapStateToProps, {
		loadTicker,
		clearCurrentTicker,
		updateTicker,
		deleteTicker,
		submitForm,
		resetTickerFilters,
	})(TickerPage)
}
