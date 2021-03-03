import React, { Component } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { Icon, Button, Position, Toaster, Classes, Intent, Spinner } from "@blueprintjs/core";

class Scraping extends Component {
	state = {
	};



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
