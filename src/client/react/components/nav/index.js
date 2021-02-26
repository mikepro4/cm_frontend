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
				count: 10
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
				count: 535
			},
			{
				url: "/inbox/channels",
				name: "Channels",
				count: 12
			}
		]

		let libraryLinks = [
			{
				url: "/library/tickers",
				name: "Tickers",
				count: 20435
			},
			{
				url: "/library/proxies",
				name: "Proxies",
				count: 1342
			},
			{
				url: "/library/channels",
				name: "Channels",
				count: 562
			},
			{
				url: "/library/videos",
				name: "Videos",
				count: 1356
			},
			{
				url: "/library/groups",
				name: "Groups",
				count: 10
			},
			{
				url: "/library/users",
				name: "Users",
				count: 100,
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
