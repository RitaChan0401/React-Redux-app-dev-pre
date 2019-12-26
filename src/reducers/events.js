// 新規作成時、イベントの取得時、イベントの更新時、削除時、それぞれAPIサーバーから応答として返ってくる。
// そのAPIサーバーからのデータを下に、手元で持っている状態を更新して全体を以下のReducerを管理している

import _ from 'lodash'
import {
  CREATE_EVENT,
  READ_EVENTS,
  READ_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
} from "../actions";

//eventsの初期状態は空のオブジェクト
export default (events = {}, action) => {
  switch (action.type) {
    case READ_EVENTS:
      //配列構造から
      // console.log(action.response.data);
      //オブジェクト構造に
      // console.log(_.mapKeys(action.response.data, 'id'));
      return _.mapKeys(action.response.data, 'id');

    // READ_EVENTが検出された場合は、データの更新を行いたい
    // eventsオブジェクトにevent情報が入っている。
    case CREATE_EVENT:
    case READ_EVENT:
    case UPDATE_EVENT:
      // console.log(action); // consoleを見ると、action.responseでデータが拾えるとわかる
      // console.log(action.response.data); // id,title,bodyが返ってきているとわかる。

      // event情報を該当のものだけ更新する。
      // 以下では、"action.response.data"を手元に持っているdataに対して最新の情報で更新する
      const data = action.response.data;
      // スプレット演算子で、eventsのオブジェクトを全て展開
      // dataのidをキーにしたdataオブジェクトでもって上書きした情報を返す。
      return {...events, [data.id]: data};

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
