import React from "react";
import CounterState from "./CouterState";
import CounterController from "./CounterController";

export default class Counter extends React.Component {
  render() {
    return (
      <CounterState>
        <div>
          <CounterController />
        </div>
      </CounterState>
    );
  }
}
