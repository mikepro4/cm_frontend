import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import ListHeader from '../../../components/list/list_header'
import ListResults from '../../../components/list/list_results'

import {
	searchVideos,
	updateVideoCollectionSettings,
	loadMoreVideos,
	updateTotalVideosPixels,
	updateTotalScrolledVideosPixels
} from '../../../../redux/actions/library/videosActions'

class Content extends Component {

	render() {
		return (
			<div className="route-content">
				<ListHeader
                    count={this.props.videos.loadedCollectionCount}
                    collection={this.props.videos}
					updateCollectionSettings={(item, prop) => this.props.updateVideoCollectionSettings(item, prop)}
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
					mainCollection={this.props.videos}
					searchCollection={()=> this.props.searchVideos()}
					loadMoreCollectionResults={(limit, offset)=> this.props.loadMoreVideos(limit, offset)}
					updateTotalPixels={(pixels) => this.props.updateTotalVideosPixels(pixels)}
					updateTotalScrolledPixels={(pixels) => this.props.updateTotalScrolledVideosPixels(pixels)}
					mainDisplayPropBig="title"
					mainDisplayPropSmall="channel.name"
					secondaryDisplayProps={[
					]}
					itemUrl="/library/videos"
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
		collection: state.videosLibrary.loadedCollection,
		videos: state.videosLibrary,
	};
}

export default connect(mapStateToProps, {
	updateVideoCollectionSettings,
	searchVideos,
	loadMoreVideos,
	updateTotalVideosPixels,
	updateTotalScrolledVideosPixels
})(withRouter(Content));
