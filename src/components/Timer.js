import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Timer extends Component {
  state = {
    seconds: 30,
  };

  componentDidMount() {
    const ONE_SECOND = 1000;
    this.intervalID = setInterval(() => {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }));
    }, ONE_SECOND);
  }

  componentDidUpdate(_, prevState) {
    const { finishTime } = this.props;
    if (prevState.seconds === 1) {
      clearInterval(this.intervalID);
      finishTime();
    }
  }

  render() {
    const { seconds } = this.state;
    return (
      <div>
        { seconds }
      </div>
    );
  }
}

Timer.propTypes = {
  finishTime: PropTypes.func,
}.isRequired;

export default Timer;
