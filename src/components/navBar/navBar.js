import React from 'react';
import PropTypes from 'prop-types';

// import ScoreModal from '../ScoreModal';

class GameBar extends React.Component {
  state = {
    isScoreOpen: false,
  };

  propTypes = {
    gameStage: PropTypes.string,
  };

  toggleScore = () => {
    this.setState({
      isScoreOpen: !this.state.isScoreOpen,
    });
  };

  render() {
    const { gameStage } = this.props;
    return (
      <>
        <div className="navBar">
          <ul>
            <li className="playerName" />
            <li className="stage">{gameStage}</li>
            <li className="monster" />
          </ul>
        </div>
        {/* <ScoreModal isOpen={this.state.isScoreOpen} /> */}
      </>
    );
  }
}
export default GameBar;
