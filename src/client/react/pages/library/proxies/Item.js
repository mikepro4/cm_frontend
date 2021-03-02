import React, { Component } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { Icon, Button, Position, Toaster, Classes, Intent  } from "@blueprintjs/core";
import { Link } from "react-router-dom";
import * as _ from 'lodash'

import {
	loadProxy,
	deleteProxy,
	clearCurrentProxy,
	updateProxy,
	resetProxyFilters,
} from '../../../../redux/actions/library/proxiesActions'

import ItemDetailsForm from "./ItemDetailsForm"

import {
	submitForm
} from '../../../../redux/actions/formActions'


class ProxyPage extends Component {
	static loadData(store, match) {
		return store.dispatch(loadProxy(match.params.proxyId));
	}

	state = {
	
	};

	componentDidMount() {
		this.props.loadProxy(this.props.match.params.proxyId, () => {
			console.log('load')
		})
	}

	componentWillUnmount() {
		this.props.clearCurrentProxy()
	}

	componentDidUpdate(prevprops) {
		if(prevprops.match.params.proxyId !== this.props.match.params.proxyId) {
			this.props.loadProxy(this.props.match.params.proxyId)
		}
	}

	saveProxy = () => {
        this.props.submitForm("proxyNew")
        this.props.loadProxy(this.props.match.params.proxyId)
        // this.props.history.push(`/library/proxies/`);
	}

	saveProxyToast = () => {
		this.refs.toaster.show({
		  message: "Proxy successully saved",
		  intent: Intent.PRIMARY
		});
	}

	deleteProxyToast = () => {
		this.refs.toaster.show({
		  message: "Proxy successully deleted",
		  intent: Intent.SUCCESS
		});
	}

	deleteProxy = () => {
		this.props.deleteProxy(this.props.current._id)
		this.props.history.push(`/library/proxies/`);
		this.deleteProxyToast()
	}
	

	renderHead = () => (
		<Helmet>
			<title>proxy Details Page</title>
			<meta property="og:title" content="Homepage" />
		</Helmet>
    )
    
    handleSubmit = values => {
		let newProxyValues = _.merge({}, this.props.current.metadata, values)
		this.props.updateProxy(this.props.current._id, newProxyValues, () => {
            this.saveProxyToast()
            this.props.history.push(`/library/proxies/`);
        })
	}

	render() {
		return (
            <div className="route-container route-details">
				<Toaster position={Position.BOTTOM_RIGHT} ref="toaster" />
                <div className="route-header">
					<div className="route-header-left">
                        <div className="route-header-back">
							<Button
								icon="arrow-left"
								minimal="true"
								large="true"
								text="Back"
								onClick={() => {
										this.props.history.goBack()
									}
								}
							/>
                        </div>
						<div className="route-title">
                            {this.props.current && this.props.current.metadata && this.props.current.metadata.ip}
                        </div>
					</div>

					<div className="route-header-right">
						<ul className="route-actions">
							<li>
								<Button
									icon="floppy-disk"
									intent="primary"
									text="Save proxy"
									onClick={() => this.saveProxy()}
								/>
							</li>
							<li>
								<Button
									icon="trash"
									intent="danger"
									text="Delete proxy"
									onClick={() => this.deleteProxy()}
								/>
							</li>
						</ul>
					</div>
				</div>

				<div className="route-content-container">
					<div className="item-container">
						<div className="item-details-container">
                            <ItemDetailsForm 
                                ref="ItemDetails"
                                enableReinitialize="true"
                                initialValues={this.props.current ? this.props.current.metadata : ""}
                                onSubmit={this.handleSubmit.bind(this)}
                            />
						</div>
					</div>
				</div>

            </div>
		);
	}
}

function mapStateToProps(state) {
	return {
		current: state.proxiesLibrary.current
	};
}

export default {
	component: connect(mapStateToProps, {
		loadProxy,
		clearCurrentProxy,
		updateProxy,
		deleteProxy,
		submitForm,
		resetProxyFilters,
	})(ProxyPage)
}
