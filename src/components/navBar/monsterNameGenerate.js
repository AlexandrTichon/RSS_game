function monsterNameGaneration() {
  const adjectives = ['ugly', 'smelly', 'dirty', 'stupid', 'terrible', 'anrgy', 'great'];
  const type = ['ork', 'gnom', 'goblin', 'werewolf', 'rock'];
  const manName = ['Antoha', 'Alex', 'Will', 'Lukas', 'Garry', 'Leonardo', 'Dimon', 'Fred'];

  const monstAdj = adjectives[(Math.floor(Math.random() * (adjectives.length - 1)))];
  const monstType = type[(Math.floor(Math.random() * (type.length - 1)))];
  const monstManName = manName[(Math.floor(Math.random() * (manName.length - 1)))];

  const monsterFullName = `${monstAdj} ${monstType} ${monstManName}`;
  return monsterFullName;
}

export default monsterNameGaneration;
