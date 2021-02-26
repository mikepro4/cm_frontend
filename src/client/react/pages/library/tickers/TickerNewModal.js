import React, { Component } from "react";
import * as _ from "lodash";
import { connect } from "react-redux";
import classNames from "classnames";

import { Dialog, Button, Intent, ButtonGroup, Position, Toaster, Classes } from "@blueprintjs/core";

import {
	createTicker
} from '../../../../redux/actions/library/tickersActions'

import {
	hideTickerNewModal
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
		this.props.hideTickerNewModal();
    };

    createTickerToast = () => {
		this.refs.toaster.show({
			message: "Ticker successully created",
			intent: Intent.PRIMARY
		});
	}
    
    createTicker = () => {
        // this.props.validateForm("tickerNew")
        if(!this.props.tickerNewForm.syncErrors) {
            this.props.createTicker({
                symbol: this.props.tickerNewForm.values.symbol,
                name: this.props.tickerNewForm.values.name
            }, (data) => {
                this.onClose()
                this.createTickerToast()
            })
        }
    }
    
	render() {
		return (
			<div>
				<Dialog
					iconName="link"
					isOpen={this.props.tickerNewOpen}
					onClose={this.onClose}
					title="New ticker"
					className="entity-type-linker"
				>
					<div className="bp3-dialog-body" className="linker-dialog">

						<div className="dialog-content">
                            <ItemDetailsForm 
                                onSubmit={this.createTicker.bind(this)} 
                            />
						</div>
					</div>
					<div className="bp3-dialog-footer">
						<div className="bp3-dialog-footer-actions">
							<Button text="Cancel" onClick={this.onClose} />
							<Button
								intent={Intent.SUCCESS}
								onClick={this.createTicker}
								text="Create Ticker"
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
    tickerNewOpen: state.modals.tickerNew,
    tickerNewForm: state.form.tickerNew
});

export default connect(mapStateToProps, {
    hideTickerNewModal,
    submitForm,
    createTicker
})(OntologyLinker)
