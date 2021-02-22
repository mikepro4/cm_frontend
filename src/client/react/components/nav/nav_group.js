import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"

import NavLinks from "./nav_links"

class NavGroup extends Component {

	render() {

		const {name, links} = this.props

		return (
			<div className="nav-group-container">
				{name && <div className="nav-group-title">
                    {name}
                </div>}
                

                <NavLinks 
                    links={links}
                />
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
	};
}

export default connect(mapStateToProps, {})(NavGroup);
