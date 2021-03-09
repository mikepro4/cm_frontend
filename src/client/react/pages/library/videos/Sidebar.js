import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Button, Intent  } from "@blueprintjs/core";
import * as _ from 'lodash'

import {
	searchVideos,
	updateVideoFilters,
	resetVideoFilters
} from '../../../../redux/actions/library/videosActions'

import {
	submitForm,
} from '../../../../redux/actions/formActions'

class Sidebar extends Component {
	handleSubmit = values => {
		this.props.searchVideos()
	}

	render() {
		return (
			<div className="route-sidebar">
                <div className="route-sidebar-header">

					<div className="route-sidebar-header-section route-sidebar-header-left">
						<div className="route-sidebar-header-title">
							Video Filters
						</div>
					</div>

					<div className="route-sidebar-header-section route-sidebar-header-right">
						<Button
							text="Reset"
							minimal="true"
							onClick={()=>  {
								this.props.resetVideoFilters()
								this.props.searchVideos()
							}}
						/>
						<Button
							intent={Intent.PRIMARY}
							minimal="true"
							text="Search"
							onClick={()=> this.props.submitForm("video_filters")}
						/>
					</div>
				</div>

				<div className="route-sidebar-content">
				
				</div>
            </div>
		);
	}
}

function mapStateToProps(state) {
	return {
		location: state.router.location,
		videos: state.videosLibrary,
	};
}

export default connect(mapStateToProps, {
	searchVideos,
	updateVideoFilters,
	resetVideoFilters,
	submitForm
})(withRouter(Sidebar));
