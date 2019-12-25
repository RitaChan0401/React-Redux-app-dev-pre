import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Link } from 'react-router-dom'

// 左から、詳細を得る、削除、送信
import {  deleteEvent } from "../actions";

class EventsShow extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  renderField(field) {
    const { input, label, type, meta: { touched, error } } = field;
    return (
        <div>
          <input {...input} placeholder={label} type={type} />
          {touched && error && <span>{error}</span>}
        </div>
    );
  }

  async onSubmit(values) {
    // await this.props.postEvent(values);
    this.props.history.push('/')
  }

  async onDeleteClick() {
    // console.log(this.props.match); // どんなパラメータを持っているか確認
    const { id } = this.props.match.params; //なぜオブジェクトなのかはconsoleを見ればわかる。
    await this.props.deleteEvent(id);
    this.props.history.push('/')
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props;

    return (
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <div><Field label="Title" name="title" type="text" component={this.renderField} /></div>
          <div><Field label="Body" name="body" type="text" component={this.renderField} /></div>

          <div>
            <input type="submit" value="Submit" disabled={pristine || submitting} />
            <Link to="/" >Cancel</Link>
            <Link to="/" onClick={this.onDeleteClick}>Delete</Link>
          </div>
        </form>
    );
  }
}

const validate = values => {
  const errors = {};

  if (!values.title) errors.title = "Enter a title, please";
  if (!values.body) errors.body = "Enter a body, please";
  return errors;
};

const mapDispatchToProps = ({  deleteEvent });

export default connect(null, mapDispatchToProps)(reduxForm({ validate, form: 'eventNewForm' })(EventsShow))
