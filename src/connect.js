import React from "react";
import { isFunc } from "./utils";

const {
  Provider: StateStoreProvider,
  Consumer: StateStoreConsumer,
} = React.createContext();

const hasMapFuncs = (fn1, fn2) => isFunc(fn1) || isFunc(fn2);

const connect = (mapState, mapUpdater) => Component => {
  const applyMapsToStore = (stateStore, outerProps) => {
    let fromState = {};
    let fromUpdater = {};

    if (isFunc(mapState)) {
      fromState = {
        sendAction: stateStore.sendAction,
        ...mapState(stateStore.getState()),
      };
    }

    if (isFunc(mapUpdater)) {
      fromUpdater = mapUpdater(stateStore.sendAction);
    }

    return <Component {...fromState} {...fromUpdater} {...outerProps} />;
  };

  const getChildConsumer = (stateStore, outerProps) => {
    if (hasMapFuncs(mapState, mapUpdater)) {
      return applyMapsToStore(stateStore, outerProps);
    }
    return <Component stateStore={stateStore} {...outerProps} />;
  };

  return outerProps => {
    return (
      <StateStoreConsumer>
        {stateStore => getChildConsumer(stateStore, outerProps)}
      </StateStoreConsumer>
    );
  };
}

export {
  connect,
  StateStoreProvider,
  StateStoreConsumer,
};
