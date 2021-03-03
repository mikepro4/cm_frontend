import React, { Component } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { Icon, Button, Position, Toaster, Classes, Intent, Spinner } from "@blueprintjs/core";

import socketIOClient from "socket.io-client";

import { io } from "../../../socket"

class Scraping extends Component {
	constructor() {
		super();
		this.state = {
		  videoUpdates: []
		};
	}

	componentDidMount() {
		let socket = io()
		socket.on('videoupdate',(data)=>{ 
			let newVideos = [...this.state.videoUpdates, data]
			this.setState({
				videoUpdates: newVideos
			})
			console.log(data)
		})
	}


	renderHead = () => (
		<Helmet>
			<title>Proxys Page</title>
			<meta property="og:title" content="Homepage" />
		</Helmet>
	)

	render() {
		if(this.props.authenticated) {
			return (
				<div className="route-container route-scraping">
					<Toaster position={Position.BOTTOM_RIGHT} ref="toaster" />
					<div className="route-header">
						<div className="route-header-left">
							<div className="route-title">Scraping</div>
						</div>
	
						<div className="route-header-right">
							<ul className="route-actions">
								<li>
									
								</li>
							</ul>
						</div>
					</div>
	
					<div className="route-content-container">
						{this.state.videoUpdates.map(video => {
							return(<div>
								{video.status} {video.ticker} {video.video.metadata.title}
							</div>)
						})}
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
	})(Scraping)
}
