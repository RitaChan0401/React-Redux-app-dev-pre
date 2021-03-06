import React from 'react';
import ReactDOM from 'react-dom';
//redux-thunkはミドルウェアに該当するもの。これを適用するために'applyMiddleware'が必要
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from "./reducers"
import EventsIndex from './components/events_index';
import EventsNew from './components/events_new'
import EventsShow from "./components/events_show";
import * as serviceWorker from './serviceWorker';

// development環境ではredux-devtools-extensionでデバックできる状態に
const enhancer = process.env.NODE_ENV === 'development' ?
    composeWithDevTools(applyMiddleware(thunk)) : applyMiddleware(thunk);
const store = createStore(reducer, enhancer);

ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          {/*exactはpathに完全にマッチするもののみマッピングさせるもの。*/}
          <Route path="/events/new" component={EventsNew} />
          {/*以下のidは様々な数字が対応してくるために ':' が必要*/}
          <Route path="/events/:id" component={EventsShow} />
          <Route exact path="/" component={EventsIndex} />
          <Route exact path="/events" component={EventsIndex} />
        </Switch>
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
serviceWorker.unregister();
