import React from "react";

export default class ClassClock extends React.Component {
  state = { now: new Date() };

  componentDidMount() {
    this.timer = setInterval(() => this.setState({ now: new Date() }), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return <small style={
      { opacity: .75 }}>
      {this.props.label || "Hora:"} 
      {this.state.now.toLocaleTimeString()}
    </small>;
  }
}
