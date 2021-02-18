import React, { Component } from "react";
import { connect } from "react-redux";
import { signoutUser } from '../../../../redux/actions/auth_actions'

class Signout extends Component {

    componentDidMount() {
        this.props.signoutUser()
        this.props.history.push("/")
    }
 
	render() {
		return <div/>
	}
}

function mapStateToProps({ app }) {
	return {
	};
}

export default {
	component: connect(mapStateToProps, {
        signoutUser
    })(Signout)
}