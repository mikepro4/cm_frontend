import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import moment from 'moment'
import { Button } from "@blueprintjs/core";

class ListResults extends Component {

	renderMainProps = (item) => {
		return (
			<div className="item-main-details">
				<div className="item-main-details-small">
					{item.metadata[this.props.mainDisplayPropSmall]}
				</div>
				<div className="item-main-details-big">
					{item.metadata[this.props.mainDisplayPropBig]}
				</div>
			</div>
		)
	}

	renderSecondaryProps = (item) => {
		return (
			<div className="item-secondary-details">
				{this.props.secondaryDisplayProps.map(prop => {
					return (
						<div className="item-secondary-detail" key={prop.property}>
							<div className="detail-label">
								{prop.label}
							</div>
							<div className="detail-value">
								{String(item.metadata[prop.property])}
							</div>
						</div>
					)
				})}
			</div>
		)
	}
	render() {
		return (
			<div className="list-results">
				{this.props.collection.map(item => {
					return (
						<div className="list-result-item" key={item._id}>
							<Link to={`${this.props.itemUrl}/${item._id}`}>

								<div className="list-result-item-top">
									<div className="list-result-item-top-left">
										{this.renderMainProps(item)}
									</div>

									<div className="list-result-item-top-right">
											<div className="created-date">
												Created {moment(item.createdAt).fromNow()}
											</div>
											<Button
												rightIcon="arrow-right"
												minimal="true"
												large="true"
												text="View item"
											/>
									</div>

								</div>

								<div className="list-result-item-bottom">
									{this.renderSecondaryProps(item)}
								</div>

							</Link>

						</div>
					)
				})}
            </div>
		);
	}
}

function mapStateToProps(state) {
	return {
		location: state.router.location
	};
}

export default connect(mapStateToProps, {})(withRouter(ListResults));
