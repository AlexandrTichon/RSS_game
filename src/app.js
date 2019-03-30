import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';

// components
import GameBar from './components/navBar/navBar';
import Battle from './screens/battle/battle';

// parametrs to componemts
class Game extends React.Component {
  state = {
    gameStage: '',
  };

  setBattle = () => {
    this.setState({
      gameStage: 'Battle',
    });
  };

  setGameStatus = (status) => {
    this.setState({
      gameStage: status,
    });
  }

  setEnd = () => {
    this.setState({
      gameStage: 'Game over',
    });
  };

  render() {
    const { gameStage } = this.state;

    return (
      <div className="game">
        <GameBar gameStage={gameStage} />
        <Battle setBattle={this.setBattle} setGameStatus={this.setGameStatus} />
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById('root'));
