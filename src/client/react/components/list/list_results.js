import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import moment from 'moment'
import { Button } from "@blueprintjs/core";

class ListResults extends Component {

	componentDidMount() {
		// if(this.props.user) {
		//   this.loadCollection()
		// }
	}

	componentDidUpdate(prevprops) {
		if(prevprops.user !== this.props.user) {
			this.loadCollection()
		}

		if(prevprops.mainCollection.updateCollection !== this.props.mainCollection.updateCollection && this.props.mainCollection.updateCollection) {
			this.loadCollection()
		}

		// if(prevprops.location.pathname !== this.props.location.pathname) {
		// 	this.loadCollection()
		// }
	}

	loadCollection = () => {
		this.props.searchCollection();
	}

	loadMoreResults = () => {
		this.props.loadMoreCollectionResults(
			this.props.mainCollection.collectionSettings.limit + 20,
			this.props.mainCollection.collectionSettings.offset + 20
		)
	};

	renderLoadMoreButton = () => {
		if (
			this.props.mainCollection.loadedCollectionCount >
			this.props.mainCollection.collectionSettings.limit 
		) {
			return (
				<a className="anchor-button" onClick={() => this.loadMoreResults()}>
					Load More
				</a>
			);
		}
	};

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
		return (
			<div className="list-results">
				{this.props.mainCollection.loadedCollection.map(item => {
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
								</div>

							</Link>

						</div>
					)
				})}

				{this.renderLoadMoreButton()}
            </div>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.app.user,
		location: state.router.location,
	};;
}

export default connect(mapStateToProps, {
})(withRouter(ListResults));
