import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent  } from "@blueprintjs/core";

import {
    showMenu,
    hideMenu
} from '../../../redux/actions/appActions'

class Header extends Component {

	render() {

		return (
            <div className="route-header">
                <div className="route-header-left">
                    <Button 
                        minimal="true"
                        icon="menu"
                        onClick={() => this.props.showMenu()}
                    />
                    <div className="route-title">{this.props.title}</div>
                </div>

                <div className="route-header-right">
                    <ul className="route-actions">
                        <li>
                            <Button 
                                minimal="true"
                                icon="notifications"
                                text="2"
                            />
                        </li>

                        <li>
                            <Button 
                                minimal="true"
                                icon="search"
                            />
                        </li>
                    </ul>
                </div>
            </div>

        )
	}
}

function mapStateToProps(state) {
	return {
	};
}

export default connect(mapStateToProps, {
    showMenu,
    hideMenu
})(Header);
