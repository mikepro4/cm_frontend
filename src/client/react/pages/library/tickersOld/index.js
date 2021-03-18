import React, { Component } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { Icon, Button, Position, Toaster, Classes, Intent, Spinner } from "@blueprintjs/core";

import {
	createTicker
} from '../../../../redux/actions/library/tickersActions'

import {
	showTickerNewModal
} from '../../../../redux/actions/modalActions'

import TickerNewModal from "./TickerNewModal"

import Content from './Content'
import Sidebar from './Sidebar'

class TickersLibrary extends Component {
	state = {
	};

	createTicker = () => {
		
		// this.props.createTicker({
		// 	symbol: "AAPL",
		// 	name: "Apple"
		// }, (data) => {
		// 	// this.props.history.push(`/manager/tickers/${data._id}`);
		// 	this.createTickerToast()
		// })
	}

	createTickerToast = () => {
		this.refs.toaster.show({
			message: "Ticker successully created",
			intent: Intent.PRIMARY
		});
	}

	renderHead = () => (
		<Helmet>
			<title>Tickers Page</title>
			<meta property="og:title" content="Homepage" />
		</Helmet>
	)

	render() {
		if(this.props.authenticated) {
			return (
				<div className="route-container route-tickers">
					<Toaster position={Position.BOTTOM_RIGHT} ref="toaster" />
					<div className="route-header">
						<div className="route-header-left">
							<div className="route-title">Tickers</div>
						</div>
	
						<div className="route-header-right">
							<ul className="route-actions">
								<li>
									<Button
										icon="add"
										intent="primary"
										text="Add new ticker"
										onClick={() => this.props.showTickerNewModal()}
									/>
								</li>
							</ul>
						</div>
					</div>
	
					<div className="route-content-container">
						<Content />
						<Sidebar />
					</div>

					<TickerNewModal/>
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
		createTicker,
		showTickerNewModal
	})(TickersLibrary)
}
