import React, { Component } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { Icon, Button, Position, Toaster, Classes, Intent, Spinner } from "@blueprintjs/core";

import {
	createVideo
} from '../../../../redux/actions/library/videosActions'


import Content from './Content'
import Sidebar from './Sidebar'

class VideosLibrary extends Component {
	state = {
	};

	createVideo = () => {
		
		// this.props.createVideo({
		// 	symbol: "AAPL",
		// 	name: "Apple"
		// }, (data) => {
		// 	// this.props.history.push(`/manager/videos/${data._id}`);
		// 	this.createVideoToast()
		// })
	}

	createVideoToast = () => {
		this.refs.toaster.show({
			message: "Video successully created",
			intent: Intent.PRIMARY
		});
	}

	renderHead = () => (
		<Helmet>
			<title>Videos Page</title>
			<meta property="og:title" content="Homepage" />
		</Helmet>
	)

	render() {
		if(this.props.authenticated) {
			return (
				<div className="route-container route-videos">
					<Toaster position={Position.BOTTOM_RIGHT} ref="toaster" />
					<div className="route-header">
						<div className="route-header-left">
							<div className="route-title">Videos</div>
						</div>
	
						<div className="route-header-right">
							<ul className="route-actions">
								<li>
									
								</li>
							</ul>
						</div>
					</div>
	
					<div className="route-content-container">
						<Content />
						<Sidebar />
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
		authenticated: state.auth.authenticated
	};
}

export default {
	component: connect(mapStateToProps, {
		createVideo
	})(VideosLibrary)
}
