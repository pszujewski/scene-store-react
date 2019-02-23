import React from "react";
import PropTypes from "prop-types";
import { Layout } from "antd";

const { Content, Footer } = Layout;

export default class SceneContainer extends React.Component {
  static propTypes = {
    children: PropTypes.element,
  };

  render() {
    return (
      <React.Fragment>
        <Content style={{ padding: "0 50px", marginTop: 64 }}>
          <div
            style={{
              background: "#fff",
              padding: 24,
              minHeight: 820,
            }}>
            {this.props.children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Software development capstone by Peter Szujewski
        </Footer>
      </React.Fragment>
    );
  }
}
