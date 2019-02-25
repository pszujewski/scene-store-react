# scene-store-react

> State management solution

[![NPM](https://img.shields.io/npm/v/scene-store-react.svg)](https://www.npmjs.com/package/scene-store-react) [![Travis CI](https://img.shields.io/travis/pszujewski/scene-store-react.svg)](https://travis-ci.org)

## Install

```bash
npm install --save scene-store-react
```

## Usage

Define your state and reducer function using the `StateStore` component.

```jsx
import React from "react";
import { StateStore } from "scene-store-react";

export default class CounterState extends React.Component {
  initialState = {
    totalPresses: 0,
    counter: 0,
  };

  render() {
    return (
      <StateStore reducer={this.reducer}>{this.props.children}</StateStore>
    );
  }

  reducer = (state = this.initialState, action) => {
    switch (action.type) {
      case "INCREMENT":
        return {
          totalPresses: state.totalPresses + 1,
          counter: state.counter + 1,
        };
      case "DECREMENT":
        return {
          totalPresses: state.totalPresses + 1,
          counter: state.counter - 1,
        };
      default:
        return state;
    }
  };
}
```

Define a consumer of your local state and connect to the store using the `StoreConnect` component.

```jsx
import React from "react";
import { StoreConnect } from "scene-store-react";

export default class CounterController extends React.Component {
  render() {
    return (
      <StoreConnect>
        {counterStore => {
          const state = counterStore.getState();
          const sendAction = counterStore.sendAction; // will update the state using your reducer

          return (
            <div className="counter-controller">
              <button onClick={() => sendAction({ type: "INCREMENT" })}>
                Increment counter
              </button>
              <p>{`Counter: ${state.counter}`}</p>
              <p>{`Total presses: ${state.totalPresses}`}</p>
            </div>
          );
        }}
      </StoreConnect>
    );
  }
```

Bring it all together

```jsx
import React from "react";
import CounterState from "./CouterState";
import CounterController from "./CounterController";

export default class CounterPage extends React.Component {
  render() {
    return (
      <CounterState>
        <div className="page-container">
          <CounterController />
        </div>
      </CounterState>
    );
  }
}
```

[View a small demo that uses these components](https://pszujewski.github.io/scene-store-react)

## License

MIT © [pszujewski](https://github.com/pszujewski)
