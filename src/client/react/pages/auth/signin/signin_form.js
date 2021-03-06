import React, {PropTypes} from 'react';
import { Field, reduxForm } from 'redux-form';
import classnames from 'classnames'
import {
  Button,
  Intent
} from "@blueprintjs/core";

import RenderField from "../../../components/form/RenderField";

class SignInForm extends React.Component {

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <RenderField 
          property={
            {
              propertyName: "email",
              fieldType: "input",
              icon: "envelope",
              propertyType: "string",
              large: true,
              description: "Email address",
            }
          } 
        />

        <RenderField 
          property={
            {
              propertyName: "password",
              fieldType: "input",
              icon: "lock",
              large: true,
              propertyType: "protected",
              description: "Password",
            }
          } 
        />
        <Button
            type="submit"
            intent={Intent.PRIMARY}
            text="Sign in"
            large={true}
          />
      </form>
    );
  }
}

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Email is required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.password) {
    errors.password = 'Please enter a password';
  }

  return errors
}

export default reduxForm({
  form: 'signin',
  validate
})(SignInForm);
