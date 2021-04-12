import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent  } from "@blueprintjs/core";

import {
    showMenu,
    hideMenu,
    showShelf
} from '../../../redux/actions/appActions'

import Shelf from "../shelf"

class Header extends Component {

	render() {

		return (
            <div>
                <Shelf/>

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
                                    onClick={() =>  {
                                        this.props.onShelfOpen()
                                        this.props.showShelf("notifications")}
                                    }
                                />
                            </li>

                            <li>
                                <Button 
                                    minimal="true"
                                    icon="search"
                                    onClick={() =>  {
                                        this.props.onShelfOpen()
                                        this.props.showShelf("search")}
                                    }
                                />
                            </li>
                        </ul>
                    </div>
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
    hideMenu,
    showShelf
})(Header);
