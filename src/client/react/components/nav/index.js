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
			},
			{
				url: "/library/videos",
				name: "Videos",
				collectionName: "videos"
			},
			{
				url: "/library/groups",
				name: "Groups",
			},
			{
				url: "/library/users",
				name: "Users",
				protected: true
			}
		]

		let scrapingLinks = [
			{
				url: "/scraping/search_results",
				name: "Search Results",
			},
			{
				url: "/scraping/proxies",
				name: "Proxies",
			}
		]

		return (
			<div className="nav-container">
                <NavGroup
                    links={mainLinks}
                />

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
