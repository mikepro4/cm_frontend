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
            <div className='page_container page_signin'>
                <Helmet title="Cash Machine – Sign In" />
                <div className='form_container'>
                    <div className='form_header'>
                        <Logo {...this.props} />
                    </div>
            
                    <div className='form_top_section'>
                        <h1 className='form_title'>Sign In</h1>
                    </div>
            
                    <SignInForm 
                        onSubmit={this.handleFormSubmit.bind(this)} 
                    />

                    <div className="footer_link">
                        <Link to="/auth/forgot" className="link link_small">Forgot password?</Link>
                    </div>
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