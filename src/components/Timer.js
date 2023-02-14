import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Timer extends Component {
  state = {
    seconds: 30,
  };

  componentDidMount() {
    const ONE_SECOND = 1000;
    const { getSeconds } = this.props;
    this.intervalID = setInterval(() => {
      const { seconds } = this.state;
      this.setState({
        seconds: seconds - 1,
      }, getSeconds(seconds - 1));
    }, ONE_SECOND);
  }

  componentDidUpdate() {
    const { finishTime, isAnswered } = this.props;
    const { seconds } = this.state;
    if (seconds === 0) {
      clearInterval(this.intervalID);
      finishTime();
    } else if (isAnswered) {
      clearInterval(this.intervalID);
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
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
