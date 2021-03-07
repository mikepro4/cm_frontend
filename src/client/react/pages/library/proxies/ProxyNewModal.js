import React, { Component } from "react";
import * as _ from "lodash";
import { connect } from "react-redux";
import classNames from "classnames";

import { Dialog, Button, Intent, ButtonGroup, Position, Toaster, Classes } from "@blueprintjs/core";

import {
	createProxy,
	testProxy
} from '../../../../redux/actions/library/proxiesActions'

import {
	hideProxyNewModal
} from '../../../../redux/actions/modalActions'

import {
    submitForm
} from '../../../../redux/actions/formActions'

import ItemDetailsForm from "./ItemDetailsForm"


class OntologyLinker extends Component {
	state = {
	};

	componentDidUpdate = (prevProps, prevState) => {

	};

	onClose = () => {
		this.props.hideProxyNewModal();
    };

    createProxyToast = () => {
		this.refs.toaster.show({
			message: "Proxy successully created",
			intent: Intent.PRIMARY
		});
	}

	bannedProxy = () => {
		this.refs.toaster.show({
			message: "Banned proxy",
			intent: Intent.DANGER
		});
	}

	notWorkingProxy = () => {
		this.refs.toaster.show({
			message: "Not working proxy",
			intent: Intent.DANGER
		});
	}
    
    createProxy = () => {
        // this.props.validateForm("proxyNew")
        if(!this.props.proxyNewForm.syncErrors) {
			this.props.testProxy(this.props.proxyNewForm.values.ip, 
				() => {
					this.props.createProxy({
						ip: this.props.proxyNewForm.values.ip,
						source: this.props.proxyNewForm.values.source
					}, (data) => {
						this.onClose()
						this.createProxyToast()
					})
				},
				() =>  this.bannedProxy(),
				() =>  this.notWorkingProxy()
			)
        }
    }
    
	render() {
		return (
			<div>
				<Dialog
					iconName="link"
					isOpen={this.props.proxyNewOpen}
					onClose={this.onClose}
					title="New proxy"
					className="entity-type-linker"
				>
					<div className="bp3-dialog-body" className="linker-dialog">

						<div className="dialog-content">
                            <ItemDetailsForm 
                                onSubmit={this.createProxy.bind(this)} 
                            />
						</div>
					</div>
					<div className="bp3-dialog-footer">
						<div className="bp3-dialog-footer-actions">
							<Button text="Cancel" onClick={this.onClose} />
							<Button
								intent={Intent.SUCCESS}
								onClick={this.createProxy}
								text="Create Proxy"
							/>
						</div>
					</div>
				</Dialog>

                <Toaster position={Position.BOTTOM_RIGHT} ref="toaster" />
			</div>
		);
	}
}

const mapStateToProps = state => ({
    proxyNewOpen: state.modals.proxyNew,
    proxyNewForm: state.form.proxyNew
});

export default connect(mapStateToProps, {
    hideProxyNewModal,
    submitForm,
	createProxy,
	testProxy
})(OntologyLinker)
