import React, { Component } from "react";
import { Field, reduxForm, formValueSelector } from "redux-form";
import classnames from "classnames";
import { Form } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@blueprintjs/core";

import Input from "../../../components/form/Input";
import Select from "../../../components/form/Select";
import Textarea from "../../../components/form/Textarea";

class FilterForm extends Component {

	render() {
		const { handleSubmit } = this.props;

		return (
            <div className="item-filters-form">
                <Form onSubmit={handleSubmit} autoComplete="off">
                    <Field
                        name="symbol"
                        component={Input}
                        label="Symbol"
                        placeholder="Type ticker symbol..."
                        ref="symbol"
                    />

                    <Field
                        name="name"
                        component={Input}
                        label="Company name"
                        placeholder="Type ticker company name..."
                        ref="companyname"
                    />
                    
		            <Button
                        style={{display: "none"}}
                        loading={this.props.loading}
                        type="submit"
                    />
                </Form>
            </div>
		);
	}
}

const validate = values => {
    const errors = {};
	return errors;
};

FilterForm = reduxForm({
	form: "ticker_filters",
	validate,
})(FilterForm);

FilterForm = connect(state => {
	return {
	};
})(FilterForm);

export default FilterForm;
