import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import ListHeader from '../../../components/list/list_header'
import ListResults from '../../../components/list/list_results'

import {
	searchProxies,
	updateProxyCollectionSettings,
	loadMoreProxies,
	updateTotalProxiesPixels,
	updateTotalScrolledProxiesPixels
} from '../../../../redux/actions/library/proxiesActions'

class Content extends Component {

	render() {
		return (
			<div className="route-content">
				<ListHeader
                    count={this.props.proxies.loadedCollectionCount}
                    collection={this.props.proxies}
					updateCollectionSettings={(item, prop) => this.props.updateProxyCollectionSettings(item, prop)}
					sortProperties={[
						{
							value: "createdAt",
							label: "Date Created"
						},
						{
							value: "ip",
							label: "IP"
						},
						{
							value: "source",
							label: "Source"
						}
					]}
				/>
				<ListResults
					mainCollection={this.props.proxies}
					searchCollection={()=> this.props.searchProxies()}
					loadMoreCollectionResults={(limit, offset)=> this.props.loadMoreProxies(limit, offset)}
					updateTotalPixels={(pixels) => this.props.updateTotalProxiesPixels(pixels)}
					updateTotalScrolledPixels={(pixels) => this.props.updateTotalScrolledProxiesPixels(pixels)}
					mainDisplayPropBig="ip"
					mainDisplayPropSmall="source"
					secondaryDisplayProps={[
					]}
					itemUrl="/library/proxies"
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
		collection: state.proxiesLibrary.loadedCollection,
		proxies: state.proxiesLibrary,
	};
}

export default connect(mapStateToProps, {
	updateProxyCollectionSettings,
	searchProxies,
	loadMoreProxies,
	updateTotalProxiesPixels,
	updateTotalScrolledProxiesPixels
})(withRouter(Content));
