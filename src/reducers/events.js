import _ from 'lodash'
import {READ_EVENTS} from "../actions";

export default (events = {}, action) => {
  switch (action.type) {
    case READ_EVENTS:
      //配列構造
      // console.log(action.response.data);
      //オブジェクト構造
      // console.log(_.mapKeys(action.response.data, 'id'));
      return _.mapKeys(action.response.data, 'id');
    default :
      return events;
  }
}
