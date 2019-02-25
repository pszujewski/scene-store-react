import React from "react";
import { render } from "react-testing-library";

export default class ComponentTestSetup {
  constructor(Component) {
    this.Component = Component;
    this.defaultProps = null; // optional
  }

  setDefaultProps(defaultProps) {
    this.defaultProps = defaultProps;
  }

  renderForTest(props) {
    const Component = this.Component;

    if (!this.defaultProps && props) {
      return render(<Component {...props} />);
    }

    if (!this.defaultProps && !props) {
      return render(<Component />);
    }

    return render(<Component {...this.mergeProps(props)} />);
  }

  mergeProps(propsOverride) {
    const props = this.defaultProps;
    return Object.assign({}, props, propsOverride);
  }
}
