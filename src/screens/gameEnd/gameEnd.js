import React from 'react';
import cn from 'classnames';

import { writeScore, readScore } from '../score/score';
import { message, btnParam } from './gameEndParam';

class GameEnd extends React.Component {
  state ={
    isOpenModal: false,
  };

  openWindow = () => {
    this.setState({
      isOpenModal: true,
    });
    readScore();
  };

  closeWindow = () => {
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
        >
          {message}
          <div className="scoreBoard" />

          <button
            type="button"
            className="close-button"
            id="close-button"
            title={btnParam}
            onClick={this.closeWindow}
          >
            {btnParam}
          </button>
        </div>
      </div>
    );
  }
}

export default GameEnd;
