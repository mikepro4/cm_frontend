import React, { Component } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { Icon, Button, Position, Toaster, Classes, Intent, Spinner } from "@blueprintjs/core";

import {
	createProxy
} from '../../../../redux/actions/library/proxiesActions'

import {
	showProxyNewModal
} from '../../../../redux/actions/modalActions'

import ProxyNewModal from "./ProxyNewModal"

import Content from './Content'
import Sidebar from './Sidebar'

class ProxysLibrary extends Component {
	state = {
	};

	createProxy = () => {
		
		// this.props.createProxy({
		// 	symbol: "AAPL",
		// 	name: "Apple"
		// }, (data) => {
		// 	// this.props.history.push(`/manager/proxys/${data._id}`);
		// 	this.createProxyToast()
		// })
	}

	createProxyToast = () => {
		this.refs.toaster.show({
			message: "Proxy successully created",
			intent: Intent.PRIMARY
		});
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
				<div className="route-container route-proxys">
					<Toaster position={Position.BOTTOM_RIGHT} ref="toaster" />
					<div className="route-header">
						<div className="route-header-left">
							<div className="route-title">Proxys</div>
						</div>
	
						<div className="route-header-right">
							<ul className="route-actions">
								<li>
									<Button
										icon="add"
										intent="primary"
										text="Add new proxy"
										onClick={() => this.props.showProxyNewModal()}
									/>
								</li>
							</ul>
						</div>
					</div>
	
					<div className="route-content-container">
						<Content />
						<Sidebar />
					</div>

					<ProxyNewModal/>
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
		createProxy,
		showProxyNewModal
	})(ProxysLibrary)
}
