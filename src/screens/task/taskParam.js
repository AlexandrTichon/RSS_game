import React from 'react';

// import task
import * as data from '../../components/tasks/tasks';

const tasks = data.default;

function taskNum() {
  const randValue = {
    subject: '',
    questionNumber: 0,
  };
  switch (Math.floor(Math.random() * 2) + 1) {
    case 1:
      randValue.subject = 'math';
      break;
    case 2:
      randValue.subject = 'translate';
      break;
    default:
      randValue.subject = 'math';
      break;
  }
  randValue.questionNumber = (Math.floor(Math.random() * (tasks[`${randValue.subject}`].questionsArray.length - 1)) + 1);
  return randValue;
}

const taskList = ({ id, answearInput }) => (
  <div className="chooseTask">
    <h3 className="head">Answer the question</h3>
    <p className="question">{tasks[`${id.subject}`].question}</p>
    <p className="task">
      {tasks[`${id.subject}`].questionsArray[id.questionNumber].task}
      {' '}
    </p>
    <input ref={answearInput} type="text" className="userAnswer" />
  </div>
);

const btnParam = 'Answer';

export { taskList, btnParam, taskNum };
