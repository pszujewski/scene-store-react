import React from "react";
import ComponentTestSetup from "../testing-utils/ComponentTestSetup";
import { StateStore } from "../StateStore";
import { StoreConnect } from "../StoreConnect";
import { isFunc } from "../utils";

const ExampleStoreConnect = props => {
  const reducer = (state = { counter: 1 }, action) => {
    switch (action.type) {
      case "INCREMENT_COUNTER":
        return { counter: state.counter + 1 };
      default:
        return state;
    }
  };
  return (
    <StateStore reducer={reducer}>
      <StoreConnect mapState={props.mapState}>
        {stateStoreProps => props.children(stateStoreProps)}
      </StoreConnect>
    </StateStore>
  );
};

describe("<StoreConnect />", () => {
  it("Should supply the entire store to child if no mapState func is given", () => {
    let store = {};

    const props = {
      children: stateStore => {
        store = stateStore;
        return <div id="example-child">Hello StoreConnect</div>;
      },
    };

    const setup = new ComponentTestSetup(ExampleStoreConnect);
    setup.renderForTest(props);

    expect(isFunc(store.getState)).toBe(true);
    expect(isFunc(store.sendAction)).toBe(true);
  });

  it("Should render the given child into the document", () => {
    const props = {
      children: () => <div id="example-child">Hello</div>,
    };

    const setup = new ComponentTestSetup(ExampleStoreConnect);
    const { getByText } = setup.renderForTest(props);

    expect(getByText("Hello")).toBeInTheDocument();
  });

  it("Should apply mapState func to the store state if given", () => {
    // The piece of state required should be directly placed on the props
    const props = {
      mapState: state => {
        return { counter: state.counter };
      },
      children: storeProps => {
        return <div>{`Count: ${storeProps.counter}`}</div>;
      },
    };

    const setup = new ComponentTestSetup(ExampleStoreConnect);
    const { getByText } = setup.renderForTest(props);

    expect(getByText("Count: 1")).toBeDefined();
  });
});
