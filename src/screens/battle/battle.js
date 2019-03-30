import React from 'react';
import PropTypes from 'prop-types';

import resetHealth from '../../components/healthBar/resetHealth';
import prepareCanvas from './sptitesLogic';
import { removeUserHealthBlock, removeweMonsterHealthBlock } from '../../components/healthBar/healthAnimation';
import { writeScore, readScore } from '../score/score';
import monsterNameGaneration from '../../components/navBar/monsterNameGenerate';


import HealthBar from '../../components/healthBar/healthBar';
import Task from '../task/task';
import GameEnd from '../gameEnd/gameEnd';
import Login from '../../components/login/login';


import { btnParam, taskNum } from '../task/taskParam';

// check person lose or no
function checkGameOver(health) {
  if (health - 20 === 0) {
    return true;
  } return false;
}

// default battle for 2 persons
class Battle extends React.Component {
  state = {
    userHealth: 100,
    monsterHealth: 100,
    roundNumber: 1,
  };

  propTypes = {
    setBattle: PropTypes.func,
    setGameStatus: PropTypes.func,
  };

  taskElement = React.createRef();

  GameEndElement = React.createRef();

  LoginElement = React.createRef();

  componentDidMount() {
    prepareCanvas();
  }

  setNextRound() {
    document.querySelector('.monster').textContent = monsterNameGaneration(); // generate new monster
    prepareCanvas();
    resetHealth(); // reset health visualisation
    this.setState(prevState => ({
      roundNumber: prevState.roundNumber + 1,
      userHealth: 100,
      monsterHealth: 100,
    }));
  }

  setGameOver = () => {
    const { setGameStatus } = this.props;
    setGameStatus('Game Over');
    writeScore(this.state.roundNumber - 1);
    this.GameEndElement.current.openWindow();

    this.setState({
      userHealth: 100,
      monsterHealth: 100,
      roundNumber: 1,
    });

    prepareCanvas(); // redraw canwas
    resetHealth(); // reset health visualisation
    document.querySelector('.playerName').textContent = null;
    this.LoginElement.current.openWindow();
  };

  setAttack = () => {
    const { setGameStatus } = this.props;

    this.taskElement.current.openWindow();
    setGameStatus('Attack');
  };

  getDamage = (person) => {
    switch (person) {
      case 'user':
        this.damageUser();
        break;
      case 'monster':
        this.damageMonster();
        break;
      default:
        this.damageUser();
        break;
    }
  }

  damageUser() {
    if (!checkGameOver(this.state.userHealth)) {
      const damageSound = new Audio('./components/audio/damageUser.mp3');
      damageSound.play();

      removeUserHealthBlock();

      this.setState(prevState => ({
        userHealth: prevState.userHealth - 20,
      }));
    } else this.setGameOver();
  }

  damageMonster() {
    if (!checkGameOver(this.state.monsterHealth)) {
      const damageSound = new Audio('./components/audio/damageMonster.mp3');
      damageSound.play();

      removeweMonsterHealthBlock();

      this.setState(prevState => ({
        monsterHealth: prevState.monsterHealth - 20,
      }));
    } else this.setNextRound();// if monster lose, you go to the next round
  }

  render() {
    const {
      userHealth, monsterHealth, roundNumber,
    } = this.state;
    const { setBattle } = this.props;
    return (
      <>
        <Login setGameStatus={this.props.setGameStatus} ref={this.LoginElement} />
        <HealthBar />
        <div className="battle">
          <canvas className="battleArea" id="battleArea" onMouseMove={setBattle} />
          <button type="button" onClick={this.setAttack} className="attackBtn btn">ATTACK</button>
        </div>
        <Task getDamage={this.getDamage} ref={this.taskElement} taskId={taskNum()} btnParam={btnParam} />
        <GameEnd ref={this.GameEndElement} completeRounds={roundNumber - 1} />
      </>
    );
  }
}

export default Battle;
