import _ from 'lodash'
import {
  READ_EVENTS,
  DELETE_EVENT,
} from "../actions";

export default (events = {}, action) => {
  switch (action.type) {
    case READ_EVENTS:
      //配列構造から
      // console.log(action.response.data);
      //オブジェクト構造に
      // console.log(_.mapKeys(action.response.data, 'id'));
      return _.mapKeys(action.response.data, 'id');

    // これがないとアプリケーション内部のメモリ上の情報が更新されなくなるため、
    // reducerの中で削除を行う必要がある。
    case DELETE_EVENT:
      // console.log(action.id)
      // eventsというオブジェクトからあるidのデータを削除する
      delete events[action.id]; // 該当のIDのイベント情報からeventsというオブジェクトから削除されてしまう
      // スプレット演算子、新しいメモリ空間上に更新後のアップデートされたイベントのオブジェクトをreducerが返す
      return {...events};

    default :
      return events;
  }
}
