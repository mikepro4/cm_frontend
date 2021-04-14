import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import commaNumber from 'comma-number'
import {Button, MenuItem, Icon, IconName } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";

import {
	updateTickerCollectionSettings
} from '../../../../redux/actions/library/tickersActions'

class Sort extends Component {
	renderItem = (item, {handleClick, modifiers }) => {
		return (
			<MenuItem
				key={item.value}
				text={item.label}
				onClick={handleClick}
			/>
		)
	}
	render() {
		const format = commaNumber.bindWith(',', '.');
		
		return (
			<div className="list-header">

                <div className="list-header-right">
					<div className="sort-control">
						<Select
							items={[
								{
									value: -1,
									label: "DESC"
								},
								{
									value: 1,
									label: "ASC"
								}
							]}
							itemRenderer={this.renderItem}
							filterable={false}
							onItemSelect={(item) => this.props.updateTickerCollectionSettings(item, "order")}
						>
							<span className="sort-label">Order:</span> 
							<span className="sort-value">
								{this.props.collection.collectionSettings.order.label}
								<Icon icon="caret-down"/>
							</span>
						</Select>
					</div>
					<div className="sort-control">
						<Select
							items={this.props.sortProperties}
							itemRenderer={this.renderItem}
							filterable={false}
							onItemSelect={(item) => this.props.updateTickerCollectionSettings(item, "sortProperty")}
						>
							<span className="sort-label">Sort by:</span> 
							<span className="sort-value">
								{this.props.collection.collectionSettings.sortProperty.label}
								<Icon icon="caret-down"/>
							</span>
						</Select>
					</div>
                </div>
            </div>
		);
	}
}

function mapStateToProps(state) {
	return {
        location: state.router.location,
        collection: state.tickersLibrary
	};
}

export default connect(mapStateToProps, {
    updateTickerCollectionSettings
})(withRouter(Sort));
