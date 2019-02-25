import React from "react";
import { connect } from "react-redux";
import { StoreConnect } from "scene-store-react";
import { Button } from "antd";
import { Formik, Form, Field } from "formik";

/**
 * This component uses three different Contexts:
 * - Global: Redux
 * - intermediate scene state: scene-store-react
 * - Form state: Formik
 */

class TodoList extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <StoreConnect mapState={this.mapState}>
        {todoProps => {
          const { todos } = todoProps;
          return (
            <div id="todo-list">
              {user && (
                <h3>{`Hi ${
                  user.name
                }, would you like to add todo list items? (name from redux)`}</h3>
              )}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ fontWeight: "bold" }}>
                  This is local state managed by state-scene-react
                </p>
                <ul>
                  {todos.map((t, i) => (
                    <li key={i}>{t.name}</li>
                  ))}
                </ul>
                <div>
                  <Formik
                    initialValues={{ todoName: "TODO" }}
                    onSubmit={values => {
                      todoProps.sendAction({
                        type: "ADD_TODO",
                        payload: values.todoName,
                      });
                    }}>
                    {() => {
                      return (
                        <Form>
                          <Field name="todoName" />
                          <Button
                            style={{ marginBottom: "1rem", marginLeft: "1rem" }}
                            htmlType="submit"
                            type="primary">
                            Add todo item
                          </Button>
                        </Form>
                      );
                    }}
                  </Formik>
                </div>
              </div>
            </div>
          );
        }}
      </StoreConnect>
    );
  }

  mapState = state => {
    return { todos: state.todos };
  };
}

export default connect(s => ({ user: s.user }))(TodoList);
