import React, {PropTypes} from 'react';
import { Field, reduxForm } from 'redux-form';
import classnames from 'classnames'
import {
  Button,
  Intent
} from "@blueprintjs/core";

import RenderField from "../../components/form/RenderField";

class QueryForm extends React.Component {

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <RenderField 
          property={
            {
              propertyName: "symbol",
              fieldType: "input",
              propertyType: "string",
              description: "Type symbol...",
              icon: "search",
              minimal: true
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

    return errors
}

export default reduxForm({
    form: 'queryForm',
    validate,
})(QueryForm);
