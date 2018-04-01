import React from 'react';
import PropTypes from 'prop-types';
import MainLoop from 'mainloop.js';

const FPS = 60;
const TIMESTEP = 1000 / FPS;
const MAX_FPS = 60;

const noop = () => {};

/**
 * A wrapper to animate a given component.
 * All props are passed down to the child component.
 *
 * The getUpdate callback takes a reference to the animated component's backing instance,
 * and returns the update function.
 *
 * The update function takes the elapsed time (in milliseconds) since the last update,
 * and returns the props and context for the animated component.
 *
 * @param  {ReactComponent} AnimatedComponent
 * @param  {function} userUpdate
 * @param {function} userBegin
 * @return {ReactComponent} An animated version of the given component.
 */
export default (timestep = TIMESTEP, maxFPS = MAX_FPS) => (AnimatedComponent) => {

  class Animator extends React.Component {
    componentDidMount() {
      const { userUpdate, userBegin } = this.props;
      const begin = userBegin || noop;
      const update = (delta) => userUpdate(delta);
      const draw = (/* interpolationPercentage */) => this.forceUpdate();
      const endOfFrame = (/*fps*/_, panic) => {
              // TODO let user supply callback for this
              if (panic) {
                loop.resetFrameDelta();
              }
            };

      const loop = MainLoop
              .setMaxAllowedFPS(maxFPS)
              .setSimulationTimestep(timestep)
              .setBegin(begin)
              .setUpdate(update)
              .setDraw(draw)
              .setEnd(endOfFrame);

      this.setState({
        loop,
      });

      if (this.props.run) {
        loop.start();
      }
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.run) {
        this.state.loop.start();
      } else {
        this.state.loop.stop();
      }
    }

    shouldComponentUpdate() {
      // doesn't affect initial render
      return false; // take control of when we render using forceUpdate
    }

    componentWillUnmount() {
      this.state.loop.stop();
    }

    render() {
      return (
        <AnimatedComponent
          {...this.props}
        />
      );
    }
  }

  Animator.propTypes = {
    run: PropTypes.bool
  };

  Animator.defaultProps = {
    run: true
  };

  return Animator;
};