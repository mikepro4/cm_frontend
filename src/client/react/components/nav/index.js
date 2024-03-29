import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"

import NavGroup from "./nav_group"

class Nav extends Component {

	render() {

        let mainLinks = [
			{
			  	url: "/trending",
				name: "Trending",
			},
			{
			  	url: "/stocktube",
				name: "Stocktube"
			},
			{
			  	url: "/watchlists",
				name: "Watchlists",
			}
		]

		let inboxLinks = [
			{
				url: "/inbox/videos",
				name: "Videos",
			},
			{
				url: "/inbox/channels",
				name: "Channels",
			}
		]

		let libraryLinks = [
			{
				url: "/library/tickers",
				name: "Tickers",
				collectionName: "tickers"
			},
			{
				url: "/library/proxies",
				name: "Proxies",
				collectionName: "proxies"
			},
			{
				url: "/library/channels",
				name: "Channels",
				collectionName: "channels"
			},
			{
				url: "/library/videos",
				name: "Videos",
				collectionName: "videos"
			},
			{
				url: "/library/groups",
				name: "Groups",
				collectionName: "groups"
			}
		]

		let scrapingLinks = [
			{
				url: "/scraping/search_results",
				name: "Search Results",
			}
		]

		return (
			<div className="nav-container">

                <NavGroup
                    name="Inbox"
                    links={inboxLinks}
                />

                <NavGroup
                    name="Library"
                    links={libraryLinks}
                />

                <NavGroup
                    name="Scraping"
                    links={scrapingLinks}
                />
            </div>
        )
	}
}

function mapStateToProps(state) {
	return {
	};
}

export default connect(mapStateToProps, {})(Nav);
