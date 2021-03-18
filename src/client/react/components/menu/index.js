import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent  } from "@blueprintjs/core";

import Nav from "../nav/"

import Logo from "../logo/"

import {
    hideMenu
} from '../../../redux/actions/appActions'

class Menu extends Component {
    state = {
        transitionOut: false
    }

    hide() {
        this.setState({
            transitionOut: true
        })

        setTimeout(() => { 
            this.props.hideMenu()

            this.setState({
                transitionOut: false
            })
        }, 200)
    }

	render() {

        let menuClasses = classNames({
            "menu-container": true,
            "open": this.props.menuOpen,
            "transition-out": this.state.transitionOut
        });

		return (
            <div className={menuClasses}>
                
                <div className="menu-background" onClick={() => this.hide()}>

                </div>

                <div className="menu-links-container">

                    <div className="app-logo">
						<Logo />

                        <Button 
                            minimal="true"
                            icon="cross"
                            onClick={() => this.hide()}
                        />
					</div>

                    <Nav/>

                    <div 
						className="user-email"
					>
						<div 
							className={classNames({
									"email": true,
									"bp3-skeleton": !this.props.app.user
								})
							}
						>
							{this.props.app.user && this.props.app.user.email}
						</div>

						<Link to="/auth/signout" className="signout">Sign out</Link>

					</div>
                </div>
            </div>
        )
	}
}

function mapStateToProps(state) {
	return {
        menuOpen: state.app.menuOpen,
        authenticated: state.auth.authenticated,
		app: state.app
	};
}

export default connect(mapStateToProps, {
    hideMenu
})(Menu);
