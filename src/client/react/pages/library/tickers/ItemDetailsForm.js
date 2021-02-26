import React, {PropTypes} from 'react';
import { Field, reduxForm } from 'redux-form';
import classnames from 'classnames'
import {
  Button,
  Intent
} from "@blueprintjs/core";

import {
	validateSymbol
} from '../../../../redux/actions/library/tickersActions'

import RenderField from "../../../components/form/RenderField";

class TickerForm extends React.Component {

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
              label: "Symbol:",
              description: "Symbol...",
            }
          } 
        />

        <RenderField 
          property={
            {
              propertyName: "name",
              fieldType: "input",
              propertyType: "string",
              label: "Company name:",
              description: "Company name...",
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

    if (!values.symbol) {
        errors.symbol = 'Please enter a symbol';
    }

    if (!values.name) {
        errors.name = 'Please enter a name';
    }

    if (values.symbol) {
      let containsSpaces = values.symbol.indexOf(" ") >= 0;
      if (containsSpaces) {
        errors.symbol = "Can't contain spaces";
      }
    }

    return errors
}

export default reduxForm({
    form: 'tickerNew',
    validate,
    asyncValidate: validateSymbol,
	  asyncBlurFields: ["symbol"]
})(TickerForm);
