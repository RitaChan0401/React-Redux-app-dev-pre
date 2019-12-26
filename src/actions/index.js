import axios from 'axios'

// 他にも渡せるようにexportする
export const READ_EVENTS = 'READ_EVENTS';
export const READ_EVENT = 'READ_EVENT';
export const CREATE_EVENT = 'CREATE_EVENT';
export const UPDATE_EVENT = 'UPDATE_EVENT';
export const DELETE_EVENT = 'DELETE_EVENT';

const ROOT_URL = 'https://udemy-utils.herokuapp.com/api/v1';
const QUERYSTRING = '?token=token123';

// Redux thunk(アクションではなく、関数を返すことができる。)
// axiosだと非同期処理(promise)になるので "async" で戻り値を扱う
export const readEvents = () => async dispatch => {
  // axiosによるHTTPリクエストの送信によるHTTPリクエストの送信
  const response = await axios.get(`${ROOT_URL}/events${QUERYSTRING}`);
  // console.log(response);

  // responseを含めたアクションをdispatchでReducerに渡す
  dispatch({ type: READ_EVENTS, response })
};

export const getEvent = id => async dispatch => {
  const response = await axios.get(`${ROOT_URL}/events/${id}${QUERYSTRING}`);
  dispatch({ type: READ_EVENT, response })
};

export const postEvent = values => async dispatch => {
  const response = await axios.post(`${ROOT_URL}/events${QUERYSTRING}`, values);
  dispatch({ type: CREATE_EVENT, response })
};

export const putEvent = values => async dispatch => {
  // 更新内容をvaluesとして渡してあげる。
  const response = await axios.put(`${ROOT_URL}/events/${values.id}${QUERYSTRING}`, values);
  dispatch({ type: UPDATE_EVENT, response })
};

export const deleteEvent = id => async dispatch => {
  await axios.delete(`${ROOT_URL}/events/${id}${QUERYSTRING}`);
  dispatch({ type: DELETE_EVENT, id })
};
