import React, {PropTypes} from 'react';
import { Field, reduxForm } from 'redux-form';
import classnames from 'classnames'
import {
  Button,
  Intent
} from "@blueprintjs/core";

class SignInForm extends React.Component {

  renderField({ input, label, type, meta: { touched, error } }) {
    let containerClassName = classnames({
      "input_container": true,
      "input_container_valid": touched && !error,
      "input_container_error": touched && error
    })
    return (
      <div className={containerClassName}>
          <input {...input} className="input input_big" placeholder={label} type={type}/>
          <div className="input_error">{touched && error && <span>{error}</span>}</div>
          <div className="input_valid">Check</div>
      </div>
    )
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field name="email"  component={this.renderField} label="Email" ref="email" />
        <Field name="password"  component={this.renderField} label="Password" />
        <Button
            type="submit"
            intent={Intent.PRIMARY}
            text="Create Relation"
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
