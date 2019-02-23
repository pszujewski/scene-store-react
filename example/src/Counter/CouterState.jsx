import React from "react";
import PropTypes from "prop-types";
import { StateStore } from "scene-store-react";

export default class CounterState extends React.Component {
  static propTypes = {
    children: PropTypes.element,
  };

  initialState =  {
    totalPresses: 0,
    counter: 0,
  };

  render() {
    return (
      <StateStore reducer={this.reducer}>
        {this.props.children}
      </StateStore>
    );
  }

  reducer = (state = this.initialState, action) => {
    switch (action.type) {
      case "INCREMENT_COUNTER":
      return {
        ...state,
        totalPresses: state.totalPresses + 1,
        counter: state.counter + 1
      };
      case "DECREMENT_COUNTER":
        return {
          ...state,
          totalPresses: state.totalPresses + 1,
          counter: state.counter - 1
        };
      default:
        return state;
    }
  };
}
