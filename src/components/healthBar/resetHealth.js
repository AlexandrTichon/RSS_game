function resetHealth() {
  // remove health
  const monsterHealth = document.querySelector('.monsterHealth');
  while (monsterHealth.firstChild) {
    monsterHealth.removeChild(monsterHealth.firstChild);
  }
  const userHealth = document.querySelector('.userHealth');
  while (userHealth.firstChild) {
    userHealth.removeChild(userHealth.firstChild);
  }

  // create health blocks
  for (let index = 0; index < 5; index += 1) {
    const userHealthBlock = document.createElement('div');
    const monsterHealthBlock = document.createElement('div');
    userHealthBlock.className = 'healthBlock';
    monsterHealthBlock.className = 'healthBlock';

    userHealth.appendChild(userHealthBlock);
    monsterHealth.appendChild(monsterHealthBlock);
  }
}

export default resetHealth;
