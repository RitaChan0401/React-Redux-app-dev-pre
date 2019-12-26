import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Link } from 'react-router-dom'

import { postEvent } from "../actions";

class EventsNew extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  renderField(field) {
    // metaはredux-formの属性
    // touchedはフォームに触ったらtouched状態になる。
    const { input, label, type, meta: { touched, error } } = field;
    return (
        <div>
          <input {...input} placeholder={label} type={type} />
          {/*i 以下はtouched状態をみて、エラーを表示、非表示を制御*/}
          {touched && error && <span>{error}</span>}
        </div>
    );
  }

  // 非同期処理
  async onSubmit(values) {
    // ActionCreatorを呼び出す
    await this.props.postEvent(values);
    // historyに履歴を追加
    this.props.history.push('/')
  }

  render() {
    // これらは、redux-formが用意しているもの
    const { handleSubmit, pristine, submitting, invalid } = this.props;

    return (
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <div><Field label="Title" name="title" type="text" component={this.renderField} /></div>
          <div><Field label="Body" name="body" type="text" component={this.renderField} /></div>

          <div>
            <input type="submit" value="Submit" disabled={pristine || submitting || invalid} />
            <Link to="/" >Cancel</Link>
          </div>
        </form>
    );
  }
}

const validate = values => {
  // バリデーションのerrorsの情報をオブジェクトで管理
  const errors = {};

  if (!values.title) errors.title = "Enter a title, please";
  if (!values.body) errors.body = "Enter a body, please";

  // オブジェクトに入ったerrorsの情報をreturn返す
  return errors;
};

const mapDispatchToProps = ({ postEvent });

//引数には設定に関するオブジェクトを渡せる。formにはユニークな名前をつける。
export default connect(null, mapDispatchToProps)(reduxForm({ validate, form: 'eventNewForm' })(EventsNew))
