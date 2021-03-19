import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent  } from "@blueprintjs/core";

import {
    hideDrawer
} from '../../../redux/actions/appActions'

class Drawer extends Component {
    state = {
        transitionOut: false
    }

    hide() {
        this.setState({
            transitionOut: true
        })
        this.props.hideDrawer()


        setTimeout(() => { 

            this.setState({
                transitionOut: false
            })
            this.props.onCLose()
        }, 200)
    }

    getHeight = () => {
		let node = document.getElementById("header")
		if(node) {
			return node.clientHeight
		}
    }

    getViewPortSize = () => {
		let node = document.getElementById("drawerBackground")
		if(node) {
			return node.clientHeight
		}
    }
    
    getContentHeight = () => {
        let node = document.getElementById("drawer")
        
        if(node) {
            if(node.clientHeight > (this.getViewPortSize() - 20)) {
                return this.getViewPortSize() - 20
            } else {
                return node.clientHeight
            }
        }
    }
    
    computeStyle = () => {
        if(this.props.drawerOpen) {
            return {
                top: 0 + "px",
            }
        } else {
            return {
                top: -this.getContentHeight() + "px",
            }
        }
        
    }

	render() {

        let drawerClasses = classNames({
            "drawer-container": true,
            "open": this.props.drawerOpen,
            "transition-out": this.state.transitionOut
        });


		return (
            <div 
                className={drawerClasses}
                style={{ 
                    top: this.getHeight() -1 + "px"
                }}
            >
                
                <div 
                    className="drawer-background" 
                    id="drawerBackground"
                    onClick={() => this.hide()}
                    style={{ 
                        top: this.getHeight() + 1 + "px"
                    }}
                >
                </div>

                <div 
                    className="drawer-content-container" 
                    id="drawerContent"
                    style={this.computeStyle()}
                >
                    {this.props.children}
                </div>
            </div>
        )
	}
}

function mapStateToProps(state) {
	return {
        drawerOpen: state.app.drawerOpen,
        authenticated: state.auth.authenticated,
		app: state.app
	};
}

export default connect(mapStateToProps, {
    hideDrawer
})(Drawer);
