import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"
import commaNumber from 'comma-number'
import {Tag, Intent } from "@blueprintjs/core";

class NavLinks extends Component {
    isActivePath = (pathname) => {
		return this.props.location.pathname.indexOf(pathname) !== -1
	}

	render() {

        

		const {links} = this.props

		const format = commaNumber.bindWith(',', '.');

		return (
			<div className="nav-links-container">
                <div
                    className={classNames({"active": !(this.props.location.pathname == "/")}, "nav-links")}
                >
                    {links.map(link => {
                        let count 

                        if(this.props.collectionCounts[link.collectionName]) {
                            count = this.props.collectionCounts[link.collectionName]
                        }

                        return (
                            <li key={link.url} className={classNames("nav-link-container", {
                                    "nav-link-active": this.isActivePath(link.url)
                                })}
                            >
                                <div className="link-wrapper">
                                    <Link to ={link.url} className="nav-link">
                                        <div className="nav-link-left">
                                            <span className="nav-link-label">{link.name}</span>
                                        </div>

                                        {count && <div className="nav-link-right">
                                            <span className="nav-link-right-label">
                                                <Tag
                                                    intent={this.isActivePath(link.url) ? Intent.PRIMARY : Intent.NONE}
                                                    minimal={this.isActivePath(link.url) ? false : true}
                                                >
                                                    {format(count)}
                                                </Tag>
                                            </span>
                                        </div>
                                        }

                                        
                                    </Link>
                                </div>
                            </li>
                        )
                    })}
                </div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
        location: state.router.location,
        collectionCounts: state.app.collectionCounts
	};
}

export default connect(mapStateToProps, {})(NavLinks);
