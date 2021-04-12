import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import commaNumber from 'comma-number'
import {Button, MenuItem, Icon, IconName } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";
import moment from 'moment'

class DefaultView extends Component {

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
    

	render() {
        let item = this.props.item
		return (
            <div className="list-result-item">
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


                </Link>

            </div>
		);
	}
}

function mapStateToProps(state) {
	return {
		location: state.router.location
	};
}

export default connect(mapStateToProps, {})(withRouter(DefaultView));
