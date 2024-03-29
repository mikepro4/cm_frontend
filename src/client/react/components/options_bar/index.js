import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent  } from "@blueprintjs/core";

import { resetForm } from "../../../redux/actions/formActions"

import { showDrawer, hideDrawer } from "../../../redux/actions/appActions"



import QueryForm from "./query_form"

class OptionsBar extends Component {
    state = {
    }

    componentWillUnmount() {
        this.props.resetForm("queryForm")
    }

    toggleDrawer() {
        // this.props.app.drawerOpen ? this.props.hideDrawer() : this.props.showDrawer()
        if(!this.props.app.drawerOpen) {
            this.props.showDrawer()
        }
    }

	render() {

        let filterClasses = classNames({
            "filter-container": true,
            "open": this.props.filterOpen
        });

        let sortClasses = classNames({
            "sort-container": true,
            "open": this.props.sortOpen
        });

        let viewClasses = classNames({
            "view-container": true,
            "open": this.props.viewOpen
        });

		return (
            <div className="options-bar-container">

                <div className="options-query-container">
                    <QueryForm 
                        ref="QueryForm"
                        enableReinitialize="true"
                        onChange={this.props.onChange.bind(this)}
                        onSubmit={this.props.onSubmit.bind(this)}
                    />

                    {this.props.queryForm 
                        && this.props.queryForm.values 
                        && this.props.queryForm.values[this.props.propertyName] 
                        && <div className="query-reset-button">
                            <Button
                                minimal="true"
                                icon="cross"
                                small="true"
                                onClick={() =>  {
                                    this.props.resetForm("queryForm")
                                    this.props.onSearchClear()
                                }}
                            />
                        </div>}

                </div>

                <div className="options-actions">
                    <ul className="options-action-list">
                        {this.props.filterOn && (
                            <li className={filterClasses}>
                                <Button 
                                    minimal="true"
                                    text="Filter"
                                    small="true"
                                    onClick={() =>  {
                                            this.props.onFilterClick()
                                            this.toggleDrawer()
                                        }
                                    }
                                />
                            </li>
                        )}

                        {this.props.sortOn && (
                            <li className={sortClasses}>
                                <Button 
                                    minimal="true"
                                    text="Sort"
                                    small="true"
                                    onClick={() =>  {
                                        this.props.onSortClick()
                                        this.toggleDrawer()
                                    }
                                }
                                />
                            </li>
                        )}

                        {this.props.viewOn && (
                            <li className={viewClasses}>
                                <Button 
                                    minimal="true"
                                    text="View"
                                    small="true"
                                    onClick={() =>  {
                                        this.props.onViewClick()
                                        this.toggleDrawer()
                                    }}
                                />
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        )
	}
}

function mapStateToProps(state) {
	return {
        app: state.app,
        queryForm: state.form.queryForm
	};
}

export default connect(mapStateToProps, {
    resetForm,
    showDrawer,
    hideDrawer
})(OptionsBar);
