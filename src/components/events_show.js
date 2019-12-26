import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Link } from 'react-router-dom'

import {  deleteEvent, getEvent, putEvent } from "../actions";

class EventsShow extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  // レンダリングが完了したら"getEvent"というアクションでevent情報を拾う
  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      this.props.getEvent(id)
    }
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
    await this.props.putEvent(values);
    this.props.history.push('/')
  }

  async onDeleteClick() {
    // console.log(this.props.match); // どんなパラメータを持っているか確認
    const { id } = this.props.match.params; //なぜオブジェクトなのかはconsoleを見ればわかる。
    await this.props.deleteEvent(id);
    this.props.history.push('/')
  }

  render() {
    // pristine: フォームが初期状態の場合はtrue(何も書かれていないとバリデーションエラー)
    // submitting:
    // invalid: バリデーションエラー時はsubmitがdisabledになるように追加
    const { handleSubmit, pristine, submitting, invalid } = this.props;

    return (
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <div><Field label="Title" name="title" type="text" component={this.renderField} /></div>
          <div><Field label="Body" name="body" type="text" component={this.renderField} /></div>

          <div>
            <input type="submit" value="Submit" disabled={pristine || submitting || invalid} />
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

// Reducer側のevent情報をbind
// 第一引数は、「現在のstate」。第二引数は、「このコンポーネントが持っているprops」
const mapStateToProps = ( state, ownProps ) => {
  // 一つの詳細ページを表示する中で、そのeventの各種情報を表示したいので、eventのオブジェクトを渡す。
  const event = state.events[ownProps.match.params.id];
  return { initialValues: event, event }
};

const mapDispatchToProps = ({  deleteEvent, getEvent, putEvent });

export default connect(mapStateToProps, mapDispatchToProps)(
  // enableReinitializeは "initialValues" が変わるたびに初期化される
  // APIサーバーに保管してある、titleとbodyを表示したい場合はtrueにする。
  reduxForm({validate, form: 'eventNewForm', enableReinitialize: true })(EventsShow)
)
