import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import moment from 'moment'
import { Button } from "@blueprintjs/core";

class ListResults extends Component {

	componentDidMount() {
		let node = document.getElementById("results")
		node.addEventListener('scroll', this.handleScroll);
		window.addEventListener("resize", this.handleResize);

		this.props.updateTotalPixels(node.scrollHeight, node.clientWidth, node.clientHeight)

		setTimeout(() => {
			this.forceUpdate()
		  }, 1)

		  if(this.props.mainCollection.totalScrolledPixels) {
			node.scrollTop = this.props.mainCollection.totalScrolledPixels
		  }

		if(this.props.mainCollection && this.props.mainCollection.loadedCollectionCount == null) {
			this.loadCollection()
		}
    
	}

	handleScroll = (event) => {
		this.props.updateTotalScrolledPixels(document.getElementById("results").scrollTop)
	}

	handleResize = () => {
		let node = document.getElementById("results")
		this.props.updateTotalPixels(node.scrollHeight, node.clientWidth, node.clientHeight)
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.handleResize);
	}

	componentDidUpdate(prevprops) {

		if(prevprops.mainCollection.updateCollection !== this.props.mainCollection.updateCollection && this.props.mainCollection.updateCollection) {
			this.loadCollection()
		}

		const loadMore = document.getElementById("loadmore")

		if(loadMore && !this.props.mainCollection.loading) { 
			if((this.props.mainCollection.totalScrolledPixels + 200)  > (loadMore.offsetTop - this.props.mainCollection.totalPixels)) {
				this.loadMoreResults()
			}
 		}

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
				<a className="anchor-button" id="loadmore" onClick={() => this.loadMoreResults()}>
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
			<div className="list-results" id="results">
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
