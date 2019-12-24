import React from "react";
import { connect } from "react-redux";

import { increment, decrement } from "../actions";

class App extends React.Component {
  render() {
    const props = this.props;

    return (
        <div className="App">
          <div>value: { props.value }</div>
          <button onClick={props.increment}>+1</button>
          <button onClick={props.decrement}>-1</button>
        </div>
    );
  }
}

const mapStateToProps = state => ({ value: state.count.value });

const mapDispatchToProps = dispatch => ({
  increment: () => dispatch(increment()),
  decrement: () => dispatch(decrement()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App)
