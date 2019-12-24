import axios from 'axios'

export const READ_EVENTS = 'READ_EVENTS';
export const CREATE_EVENT = 'CREATE_EVENT';

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

export const postEvent = values => async dispatch => {
  const response = await axios.post(`${ROOT_URL}/events${QUERYSTRING}`, values);
  dispatch({ type: CREATE_EVENT, response })
};
