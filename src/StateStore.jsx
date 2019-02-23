import React from "react";
import PropTypes from "prop-types";
import { StateStoreProvider } from "./connect";
import { isFunc } from "./utils";

export class StateStore extends React.Component {
  static propTypes = {
    reducer: PropTypes.func.isRequired, // (state, action) => nextState object
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  };

  constructor(props) {
    super(props);
    this.initialState = props.reducer(undefined, { type: "@INIT@" });
    this.state = this.initialState;
  }

  render() {
    const { children } = this.props;
    const stateStore = this.getStateStore();

    return (
      <StateStoreProvider value={stateStore}>
        {isFunc(children) ? children(stateStore) : children}
      </StateStoreProvider>
    );
  }

  getStateStore = () => ({
    getState: () => this.state,
    sendAction: action => this.updateState(action),
  });

  updateState = action => {
    this.setState(state => this.internalReducer(state, action));
  }

  internalReducer = (state, action) => {
    if (action.type === "RESET_LOCAL_STATE") {
      return this.props.reduer(undefined, { type: "@INIT@" });
    }
    return this.props.reducer(state, action);
  }
}
