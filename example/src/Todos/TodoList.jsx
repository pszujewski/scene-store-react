import React from "react";
import { connect } from "react-redux";
import { StoreConnect } from "scene-store-react";
import { Button } from 'antd';

class TodoList extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <StoreConnect mapState={this.mapState}>
        {todoProps => {
          const { todos } = todoProps;
          return (
            <div id="todo-list">
              {user && <h3>{`Hi ${user.name}, would you like to add todo list items?`}</h3>}
              <div style={{ paddingBottom: "1rem" }}>
                <Button
                  type="primary"
                  onClick={this.addTodo(todoProps)}>
                  Add todo item
                </Button>
              </div>
              <ul>
                {todos.map((t, i) => <li key={i}>{t.name}</li>)}
              </ul>
            </div>
          );
        }}
      </StoreConnect>
    );
  }

  mapState = state => {
    return { todos: state.todos };
  }

  addTodo = todoProps => () => {
    todoProps.sendAction({ type: "ADD_TODO" });
  }
}

export default connect(s => ({ user: s.user }))(TodoList);
