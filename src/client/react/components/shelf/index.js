import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"

import {
    hideShelf
} from '../../../redux/actions/appActions'

class Shelf extends Component {
    state = {
        transitionOut: false
    }

    componentDidMount() {
		let node = document.getElementById("results")
        window.addEventListener("resize", this.handleResize);
    }

    hide() {
        this.setState({
            transitionOut: true
        })
        this.props.hideShelf()

        setTimeout(() => { 
            this.setState({
                transitionOut: false
            })
        }, 200)
    }

    getHeight = () => {
		let node = document.getElementById("body")
		if(node) {
			return node.clientHeight
		}
	}
	
    computeStyle = () => {
        if(this.props.shelfOpen) {
            return {
                height: this.getHeight() + "px",
            }
        } else {
            return {
                height: 0,
            }
        }
    }

    renderShelfContent() {
        switch (this.props.shelfContent) {
            case "notifications":
                return(
                    <div className="placeholder">notifications</div>
                )
            case "search":
                return(
                    <div className="placeholder">search</div>
                )
            default:
                return ;
        }
    }

	render() {

        let drawerClasses = classNames({
            "shelf-container": true,
            "open": this.props.drawerOpen,
            "transition-out": this.state.transitionOut
        });


		return (
            <div 
                className={drawerClasses}
                style={this.computeStyle()}
            >
                
                <div className="close" onClick={() => this.hide()}>close</div>

                <div 
                    className="shelf-content-container" 
                    id="shelfContent"
                >
                    {this.renderShelfContent()}
                </div>
            </div>
        )
	}
}

function mapStateToProps(state) {
	return {
        shelfOpen: state.app.shelfOpen,
        shelfContent: state.app.shelfContent,
        authenticated: state.auth.authenticated,
		app: state.app
	};
}

export default connect(mapStateToProps, {
    hideShelf
})(Shelf);
