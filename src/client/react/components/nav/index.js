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

		let systemLinks = [
			{
				url: "/system/scraping",
				name: "Scraping",
			},
			{
				url: "/system/settings",
				name: "Settings",
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
                    name="System"
                    links={systemLinks}
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
