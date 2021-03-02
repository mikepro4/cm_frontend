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

class ItemFiltersForm extends Component {

	render() {
		const { handleSubmit } = this.props;

		return (
            <div className="item-filters-form">
                <Form onSubmit={handleSubmit} autoComplete="off">
                    <Field
                        name="ip"
                        component={Input}
                        label="IP"
                        placeholder="Type IP..."
                        ref="ip"
                    />

                    <Field
                        name="port"
                        component={Input}
                        label="port"
                        placeholder="Port..."
                        ref="port"
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

ItemFiltersForm = reduxForm({
	form: "proxy_filters",
	validate,
})(ItemFiltersForm);

ItemFiltersForm = connect(state => {
	return {
	};
})(ItemFiltersForm);

export default ItemFiltersForm;
