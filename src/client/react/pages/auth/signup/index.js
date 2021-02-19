import React, { Component, useCallback, useEffect, useState, useRef, useMemo } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";
import Logo from "../../../components/logo"
import SignUpForm from "./signup_form"
import { signupUser } from '../../../../redux/actions/auth_actions'

class Signup extends Component {

    handleFormSubmit({ email, password }) {
        this.props.signupUser({ 
            email, 
            password,
            history: this.props.history
        })
    }
 
	render() {

		return (
            <div className="route-content page-auth page-signin">
                <Helmet title="Cash Machine – Sign Up" />
                <div className="form-container">
                    <div className="form-header">
                        <Logo {...this.props} />
                    </div>
            
                    <div className="form-navigation">
                        <Link to="/auth/signin" className="form-nav-item">Sign in</Link>
                        <Link to="/auth/signup" className="form-nav-item active">Sign up</Link>
                    </div>
            
                    <SignUpForm 
                        onSubmit={this.handleFormSubmit.bind(this)} 
                    />
                </div>
            </div>
		);
	}
}

function mapStateToProps({ app }) {
	return {
	};
}

export default {
	component: connect(mapStateToProps, {
        signupUser
    })(Signup)
}