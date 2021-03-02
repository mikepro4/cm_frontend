import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import ListHeader from '../../../components/list/list_header'
import ListResults from '../../../components/list/list_results'

import {
	searchTickers,
	updateTickerCollectionSettings,
	loadMoreTickers
} from '../../../../redux/actions/library/tickersActions'

class Content extends Component {

	componentDidMount() {
		if(this.props.user) {
		  this.loadCollection()
		}
	}

	componentDidUpdate(prevprops) {
		if(prevprops.user !== this.props.user) {
			this.loadCollection()
		}

		if(prevprops.tickers.updateCollection !== this.props.tickers.updateCollection && this.props.tickers.updateCollection) {
			this.loadCollection()
		}

		if(prevprops.location.pathname !== this.props.location.pathname) {
			this.loadCollection()
		}
	}

	loadCollection = () => {
		this.props.searchTickers();
	}

	loadMoreResults = () => {
		console.log("this.props.tickers.collectionSettings: ", this.props.tickers.collectionSettings)
		this.props.loadMoreTickers(
			this.props.tickers.collectionSettings.limit + 20,
			this.props.tickers.collectionSettings.offset + 20
		);
	};

	renderLoadMoreButton = () => {
		if (
			this.props.tickers.loadedCollectionCount >
			this.props.tickers.collectionSettings.limit 
		) {
			return (
				<a className="anchor-button" onClick={() => this.loadMoreResults()}>
					Load More
				</a>
			);
		}
	};

	render() {
		return (
			<div className="route-content">
				<ListHeader
                    count={this.props.tickers.loadedCollectionCount}
                    collection={this.props.tickers}
					updateCollectionSettings={(item, prop) => this.props.updateTickerCollectionSettings(item, prop)}
					sortProperties={[
						{
							value: "createdAt",
							label: "Date Created"
						},
						{
							value: "symbol",
							label: "Symbol"
						},
						{
							value: "name",
							label: "Company name"
						}
					]}
				/>
				<ListResults
					collection={this.props.tickers.loadedCollection}
					mainDisplayPropBig="symbol"
					mainDisplayPropSmall="name"
					secondaryDisplayProps={[
					]}
					itemUrl="/library/tickers"
					loading={this.props.tickers.loading}
					displayImage={true}
					deleteItem={(id) => this.props.deleteItem(id)}
				/>

				{this.renderLoadMoreButton()}
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
	searchTickers, 
	updateTickerCollectionSettings,
	loadMoreTickers
})(withRouter(Content));
