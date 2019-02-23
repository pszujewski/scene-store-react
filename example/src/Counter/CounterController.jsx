import React from "react";
import { connect } from "react-redux";
import { StoreConnect } from "scene-store-react";
import { Button } from 'antd';

class CounterController extends React.Component {
  render() {
    return (
      <StoreConnect>
        {counterStore => {
          const { user } = this.props;
          const s = counterStore.getState();
          return (
            <div className="counter-controller">
              {user && <h3>{`${user.name}, you control the counter!`}</h3>}
              <Button type="primary" onClick={this.increment(counterStore)}>Increment</Button>
              <Button type="danger" onClick={this.decrement(counterStore)}>Decrement</Button>
              <div style={{ paddingTop: "1rem" }}>
                <p style={{ fontWeight: "bold" }}>{`Counter: ${s.counter}`}</p>
                <p>{`Total presses: ${s.totalPresses}`}</p>
              </div>
            </div>
          );
        }}
      </StoreConnect>
    );
  }

  increment = counterStore => () => {
    counterStore.sendAction({ type: "INCREMENT_COUNTER" });
  };

  decrement = counterStore => () => {
    counterStore.sendAction({ type: "DECREMENT_COUNTER" });
  };
}

export default connect(s => ({ user: s.user }))(CounterController);
