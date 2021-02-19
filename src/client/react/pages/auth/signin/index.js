import React, { Component, useCallback, useEffect, useState, useRef, useMemo } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";
import Logo from "../../../components/logo"
import SignInForm from "./signin_form"
import { signinUser } from '../../../../redux/actions/auth_actions'

class Singin extends Component {

    handleFormSubmit({ email, password }) {
        this.props.signinUser({ 
            email, 
            password,
            history: this.props.history
        })
    }
 
	render() {

		return (
            <div className="route-content page-auth page-signin">
                <Helmet title="Cash Machine – Sign In" />
                <div className="form-container">
                    <div className="form-header">
                        <Logo {...this.props} />
                    </div>
            
                    <div className="form-navigation">
                        <Link to="/auth/signin" className="form-nav-item active">Sign in</Link>
                        <Link to="/auth/signup" className="form-nav-item">Sign up</Link>
                    </div>
            
                    <SignInForm 
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
        signinUser
    })(Singin)
}