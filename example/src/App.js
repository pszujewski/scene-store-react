import React, { Component } from "react";
import { connect } from "react-redux";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Todos from "./Todos";
import Counter from "./Counter";

import Navigation from "./components/Navigation";
import SceneContainer from "./components/SceneContainer";
import { Layout } from "antd";
import { addUser } from "./reducer";

class App extends Component {
  render() {
    return (
      <Router>
        <div id="App-example">
          <Layout>
            <Navigation />
            <SceneContainer>
              <Switch>
                <Route exact path="/todos" component={Todos} />
                <Route exact path="/counter" component={Counter} />
                <Redirect to="/todos" />
              </Switch>
            </SceneContainer>
          </Layout>
        </div>
      </Router>
    );
  }

  componentDidMount() {
    if (!this.props.user) {
      this.props.dispatch(
        addUser({
          id: "1",
          name: "John Doe",
          lives: "Michigan",
          from: "Chicago",
        })
      );
    }
  }
}

export default connect(s => ({ user: s.user }))(App);
