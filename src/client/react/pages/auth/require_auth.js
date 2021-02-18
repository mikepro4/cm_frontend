import React, { Component } from 'react';
import { connect } from 'react-redux';


export default function(ComposedComponent) {
  class Authentication extends Component {

    navigatetoSignIn() {
      console.log("navigate to sign in")
      this.props.history.push("/auth/signin")
    }

    componentDidMount() {
      const token = localStorage.getItem('token');

      if (!this.props.authenticated && !token) {
        this.navigatetoSignIn()
      }

    }

    componentDidUpdate(nextProps) {
      console.log(nextProps)
      const token = localStorage.getItem('token')
      if (!nextProps.authenticated && !token) {
        this.navigatetoSignIn()
      } 
    }

    render() {
      if (!this.props.authenticated) {
        return <div/>
      } else {
        return <ComposedComponent {...this.props} />
      }
    }
  }

  function mapStateToProps(app) {
    return {
      authenticated: app.auth.authenticated
    };
  }
  return connect(mapStateToProps)(Authentication);

}
