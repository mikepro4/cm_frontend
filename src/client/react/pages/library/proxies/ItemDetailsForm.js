import React, {PropTypes} from 'react';
import { Field, reduxForm } from 'redux-form';
import classnames from 'classnames'
import {
  Button,
  Intent
} from "@blueprintjs/core";

import {
	validateIp
} from '../../../../redux/actions/library/proxiesActions'

import RenderField from "../../../components/form/RenderField";

class ProxyForm extends React.Component {

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <RenderField 
          property={
            {
              propertyName: "ip",
              fieldType: "input",
              propertyType: "string",
              label: "IP:",
              description: "IP...",
              autoFocus: true
            }
          } 
        />

        <RenderField 
          property={
            {
              propertyName: "source",
              fieldType: "input",
              propertyType: "string",
              label: "Source:",
              description: "Source...",
            }
          } 
        />
        <Button
            type="submit"
            style={{display: "none"}}
        />
      </form>
    );
  }
}

const validate = values => {
    const errors = {}

    if (!values.ip) {
        errors.ip = 'Please enter proxy';
    }

    if (values.ip) {
      let containsSpaces = values.ip.indexOf(" ") >= 0;
      if (containsSpaces) {
        errors.ip = "Can't contain spaces";
      }
    }

    return errors
}

export default reduxForm({
    form: 'proxyNew',
    validate,
    asyncValidate: validateIp,
	  asyncBlurFields: ["ip"]
})(ProxyForm);
