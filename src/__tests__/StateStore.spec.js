import React from "react";
import { StateStore } from "../StateStore";
import ComponentTestSetup from "../testing-utils/ComponentTestSetup";

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
  it("Should accept a function for the children prop", () => {
    let store = {};
    
    const ExampleStateStore1 = props => {
      return (
        <StateStore reducer={props.reducer}>
          {stateStore => {
            store = stateStore;
            return <div id="example-child">Hello StateStore</div>
          }}  
        </StateStore>
      );
    };

    const setup = new ComponentTestSetup(ExampleStateStore1);
    const { getByText } = setup.renderForTest(getProps());

    expect(store.getState()).toEqual({ counter: 0 });
    expect(getByText("Hello StateStore")).toBeInTheDocument();
  });
});
