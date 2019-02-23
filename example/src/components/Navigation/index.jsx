import React from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu } from "antd";

const { Header } = Layout;

export class Navigation extends React.Component {
  static propTypes = {
    match: PropTypes.object,
    location: PropTypes.object,
    history: PropTypes.object,
  };

  render() {
    return (
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        {this.props.children}
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[this.getSelectedKey()]}
          style={{ lineHeight: "64px" }}>
          {this.getNavAnchor("todos", "Todo list")}
          {this.getNavAnchor("counter", "Counter")}
        </Menu>
      </Header>
    );
  }

  getNavAnchor(key, label) {
    const tId = `${key}-anchor`;
    return (
      <Menu.Item data-testid={tId} key={key}>
        <Link to={`/${key}`}>{label}</Link>
      </Menu.Item>
    );
  }

  getSelectedKey() {
    const { location: l } = this.props;
    if (l.pathname.indexOf("todos") > -1) {
      return "todos";
    }
    return "counter";
  }
}

export default withRouter(Navigation);
