import React from "react";
import PropTypes from "prop-types";
import { StateStore } from "scene-store-react";

export default class TodosState extends React.Component {
  static propTypes = {
    children: PropTypes.element,
  };

  initialState = {
    todos: [],
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
      case "ADD_TODO":
        return {
          ...state,
          todos: [...state.todos, { name: "ITEM" }],
        };
      default:
        return state;
    }
  };
}
