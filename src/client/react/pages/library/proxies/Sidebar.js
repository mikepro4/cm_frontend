import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Button, Intent  } from "@blueprintjs/core";
import * as _ from 'lodash'

import ItemFiltersForm from "./ItemFiltersForm"

import {
	searchProxies,
	updateProxyFilters,
	resetProxyFilters
} from '../../../../redux/actions/library/proxiesActions'

import {
	submitForm,
} from '../../../../redux/actions/formActions'

class Sidebar extends Component {
	handleSubmit = values => {
		this.props.searchProxies()
	}

	render() {
		return (
			<div className="route-sidebar">
                <div className="route-sidebar-header">

					<div className="route-sidebar-header-section route-sidebar-header-left">
						<div className="route-sidebar-header-title">
							Proxy Filters
						</div>
					</div>

					<div className="route-sidebar-header-section route-sidebar-header-right">
						<Button
							text="Reset"
							minimal="true"
							onClick={()=>  {
								this.props.resetProxyFilters()
								this.props.searchProxies()
							}}
						/>
						<Button
							intent={Intent.PRIMARY}
							minimal="true"
							text="Search"
							onClick={()=> this.props.submitForm("proxy_filters")}
						/>
					</div>
				</div>

				<div className="route-sidebar-content">
					<ItemFiltersForm
						onSubmit={this.handleSubmit.bind(this)}
						enableReinitialize="true"
						initialValues={this.props.proxies ? this.props.proxies.collectionFilters : ""}
						onChange={(values) => this.props.updateProxyFilters(values)}
					/>
				</div>
            </div>
		);
	}
}

function mapStateToProps(state) {
	return {
		location: state.router.location,
		proxies: state.proxiesLibrary,
	};
}

export default connect(mapStateToProps, {
	searchProxies,
	updateProxyFilters,
	resetProxyFilters,
	submitForm
})(withRouter(Sidebar));
