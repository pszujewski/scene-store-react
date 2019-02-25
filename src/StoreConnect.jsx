import React from "react";
import PropTypes from "prop-types";
import { StateStoreConsumer } from "./context";
import { isFunc } from "./utils";

export class StoreConnect extends React.Component {
  static propTypes = {
    mapState: PropTypes.func, // not required
    children: PropTypes.func.isRequired,
  };

  render() {
    const { children } = this.props;
    return (
      <StateStoreConsumer>
        {stateStore => children(this.getPropsToPassDown(stateStore))}
      </StateStoreConsumer>
    );
  }

  getPropsToPassDown(stateStore) {
    const { mapState } = this.props;

    if (!isFunc(mapState)) {
      return stateStore;
    }

    return {
      sendAction: stateStore.sendAction,
      ...mapState(stateStore.getState()),
    };
  }
}
