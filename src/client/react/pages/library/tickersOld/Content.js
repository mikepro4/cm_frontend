import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import ListHeader from '../../../components/list/list_header'
import ListResults from '../../../components/list/list_results'

import {
	searchTickers,
	updateTickerCollectionSettings,
	loadMoreTickers,
	updateTotalTickersPixels,
	updateTotalScrolledTickersPixels
} from '../../../../redux/actions/library/tickersActions'

class Content extends Component {

	render() {
		return (
			<div className="route-content">
				<ListHeader
                    count={this.props.tickers.loadedCollectionCount}
                    collection={this.props.tickers}
					updateCollectionSettings={(item, prop) => this.props.updateTickerCollectionSettings(item, prop)}
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
							value: "symbol",
							label: "Symbol"
						}
					]}
				/>
				<ListResults
					mainCollection={this.props.tickers}
					searchCollection={()=> this.props.searchTickers()}
					loadMoreCollectionResults={(limit, offset)=> this.props.loadMoreTickers(limit, offset)}
					updateTotalPixels={(pixels) => this.props.updateTotalTickersPixels(pixels)}
					updateTotalScrolledPixels={(pixels) => this.props.updateTotalScrolledTickersPixels(pixels)}
					mainDisplayPropBig="symbol"
					mainDisplayPropSmall="name"
					secondaryDisplayProps={[
					]}
					itemUrl="/library/tickers"
					deleteItem={(id) => this.props.deleteItem(id)}
				/>
				
            </div>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.app.user,
		location: state.router.location,
		collection: state.tickersLibrary.loadedCollection,
		tickers: state.tickersLibrary,
	};
}

export default connect(mapStateToProps, {
	updateTickerCollectionSettings,
	searchTickers,
	loadMoreTickers,
	updateTotalTickersPixels,
	updateTotalScrolledTickersPixels
})(withRouter(Content));
