import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types'; // to check props validation
import { taskList } from './taskParam';
import tasks from '../../components/tasks/tasks';

class Task extends React.Component {
  state = {
    isOpenModal: false,
  };

  propTypes = {
    taskId: PropTypes.number,
    btnParam: PropTypes.string,
    taskNum: PropTypes.func,
    getDamage: PropTypes.func,
  };

  answearInput = React.createRef();

  openWindow = () => {
    document.querySelector('.userAnswer').value = null;
    this.setState({
      isOpenModal: true,
    });
  };

  closeWindow = () => {
    const { taskId, getDamage } = this.props;

    this.setState({
      isOpenModal: false,
    });
    if (tasks[`${taskId.subject}`].questionsArray[taskId.questionNumber].answer === (this.answearInput.current.value)) {
      getDamage('monster');
    } else {
      getDamage('user');
    }
  };

  render() {
    const {
      taskId, btnParam, taskNum, getDamage,
    } = this.props;
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
          {React.createElement(taskList, { id: taskId, answearInput: this.answearInput })}
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

export default Task;
