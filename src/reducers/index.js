import { combineReducers } from "redux";
// redux-formが提供しているreducerは分かりにくいので "form" に名前を変更
import { reducer as form } from 'redux-form'
import events from './events.js'

// このAppに存在するreducerの一部としてくみこむ
export default combineReducers({events, form})
