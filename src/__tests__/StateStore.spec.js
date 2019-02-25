import React from "react";
import { StateStore } from "../StateStore";
import ComponentTestSetup from "../testing-utils/ComponentTestSetup";
import { isFunc } from "../utils";

const getProps = (initialState = { counter: 0 }) => ({
  reducer: (state = initialState, action) => {
    switch (action.type) {
      case "INCREMENT_COUNTER":
        return { counter: state.counter + 1 };
      default:
        return state;
    }
  },
});

describe("<StateStore />", () => {
  it("store.getState() should produce the initialState", () => {
    let store = {};

    const ExampleStateStore = props => {
      return (
        <StateStore reducer={props.reducer}>
          {stateStore => {
            store = stateStore;
            return <div id="example-child">Hello StateStore</div>;
          }}
        </StateStore>
      );
    };

    const setup = new ComponentTestSetup(ExampleStateStore);
    setup.renderForTest(getProps());

    expect(store.getState()).toEqual({ counter: 0 });
  });

  it("Should accept a function for the children prop", () => {
    const ExampleStateStore = props => {
      return (
        <StateStore reducer={props.reducer}>
          {() => {
            return <div id="example-child">Hello StateStore</div>;
          }}
        </StateStore>
      );
    };

    const setup = new ComponentTestSetup(ExampleStateStore);
    const { getByText } = setup.renderForTest(getProps());

    expect(getByText("Hello StateStore")).toBeInTheDocument();
  });

  it("Should accept an element as a child also", () => {
    const ExampleStateStore = props => {
      return (
        <StateStore reducer={props.reducer}>
          <div id="example-child">Element child</div>
        </StateStore>
      );
    };

    const setup = new ComponentTestSetup(ExampleStateStore);
    const { getByText } = setup.renderForTest(getProps());

    expect(getByText("Element child")).toBeInTheDocument();
  });

  it("store.sendAction should be a function", () => {
    let store = {};

    const ExampleStateStore = props => {
      return (
        <StateStore reducer={props.reducer}>
          {stateStore => {
            store = stateStore;
            return <div id="example-child">Hello StateStore</div>;
          }}
        </StateStore>
      );
    };

    const setup = new ComponentTestSetup(ExampleStateStore);
    setup.renderForTest(getProps());

    expect(isFunc(store.sendAction)).toBe(true);
  });
});
