import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import ListHeader from '../../../components/list/list_header'
import ListResults from '../../../components/list/List_results'

import {
	searchTickers,
	updateTickerCollectionSettings
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

		if(prevprops.tickers.updateCollection !== this.props.tickers.updateCollection) {
			this.loadCollection()
		}

		if(prevprops.location.pathname !== this.props.location.pathname) {
			this.loadCollection()
		}
	}

	loadCollection = () => {
		this.props.searchTickers();
	}

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
	updateTickerCollectionSettings
})(withRouter(Content));
