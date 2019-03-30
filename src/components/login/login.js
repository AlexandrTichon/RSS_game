import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types'; // to check props validation

import monsterNameGaneration from '../navBar/monsterNameGenerate';
import { loginDescr, buttonParam } from '../../screens/login/loginParam';


class Login extends React.Component {
  state = {
    isOpenModal: true,
  };

  propTypes = {
    setGameStatus: PropTypes.func,
  };

  openWindow = () => {
    this.setState({
      isOpenModal: true,
    });
  };

  setStart = () => {
    const { setGameStatus } = this.props;
    setGameStatus('Login');
  };

  setName = () => {
    // set username in gameBar

    document.querySelector('.playerName').textContent = document.getElementById(
      'userInput',
    ).value;

    // set monster name in gameBar
    document.querySelector('.monster').textContent = monsterNameGaneration();

    this.setState({
      isOpenModal: false,
    });
  };


  render() {
    const { isOpenModal } = this.state;

    return (
      <div>
        <div
          className={cn('modal-overlay', {
            closed: !isOpenModal,
          })}
          id="modal-overlay"
        />
        <div
          className={cn('modal', {
            closed: !isOpenModal,
          })}
          id="modal"
          aria-hidden="true"
          aria-labelledby="modalTitle"
          aria-describedby="modalDescription"
          role="dialog"
          onMouseMove={this.setStart} // change Game state
        >
          {loginDescr}
          <button
            onClick={this.setName}
            type="button"
            className="close-button"
            id="close-button"
            title={buttonParam}
          >
            {buttonParam}
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
