import React, { Component } from 'react';
import { connect } from 'react-redux';


export default function(ComposedComponent) {
  class Authentication extends Component {

    componentDidMount() {
      if (!this.props.authenticated) {
        console.log("navigate to sign in")
        this.props.history.push("/auth/signin")
      }
    }

    componentDidUpdate(nextProps) {
      if (!nextProps.authenticated) {
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

  function mapStateToProps(state) {
    return {};
  }
  return connect(mapStateToProps)(Authentication);

}
