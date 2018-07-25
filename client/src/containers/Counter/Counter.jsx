import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { incrementCounter, decrementCounter, resetCounter } from 'store/actions/counter';
import icon from 'assets/images/checked.svg';

const Counter = ({
  counter, incrementCounter, decrementCounter, resetCounter,
}) => (
  <div>
    <h3>Counter: {counter.counter}</h3>
    <h3>Last action: {counter.lastAction ? counter.lastAction : 'None'}</h3>
    <button type="button" onClick={incrementCounter}>Increment</button>
    <button type="button" onClick={decrementCounter}>Decrement</button>
    <button type="button" onClick={resetCounter}>Reset</button>
    <svg
      viewBox={icon.viewBox}
      style={{
        width: '2rem',
      }}
    >
      <use xlinkHref={icon} />
    </svg>
  </div>
);

Counter.propTypes = {
  counter: PropTypes.objectOf(PropTypes.any).isRequired,
  incrementCounter: PropTypes.func.isRequired,
  decrementCounter: PropTypes.func.isRequired,
  resetCounter: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  counter: state.counter,
});

export default connect(mapStateToProps, {
  incrementCounter, decrementCounter, resetCounter,
})(Counter);
