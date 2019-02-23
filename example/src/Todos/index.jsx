import React from "react";
import TodosState from "./TodosState";
import TodoList from "./TodoList";

export default class Todos extends React.Component {
  render() {
    return (
      <TodosState>
        <div>
          <TodoList />
        </div>
      </TodosState>
    );
  }
}
