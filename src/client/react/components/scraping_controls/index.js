import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent  } from "@blueprintjs/core";

class ScrapingControls extends Component {
	render() {
		return (
			<div className="scraping-controls-container">
                <ul className="route-actions">
                    {(!this.props.paused && !this.props.active) && (
                        <li>
                            <Button
                                icon="play"
                                text="Start"
                                onClick={() => this.props.start()}
                            />
                        </li>
                    )}

                    {(this.props.active) && (
                        <li>
                            <Button
                                icon="stop"
                                text="Stop"
                                onClick={() => this.props.stop()}
                            />
                        </li>
                    )}

                    {(this.props.active) && (
                        <li>
                            <Button
                                icon="pause"
                                text="Pause"
                                onClick={() => this.props.pause()}
                            />
                        </li>
                    )}

                    {(this.props.active) && (
                        <li>
                            <Button
                                icon="refresh"
                                text="Restart"
                                onClick={() => this.props.restart()}
                            />
                        </li>
                    )}
                    
                </ul>
            </div>
        )
	}
}

function mapStateToProps(state) {
	return {
	};
}

export default connect(mapStateToProps, {
})(ScrapingControls);
