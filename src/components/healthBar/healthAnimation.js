function removeUserHealthBlock() {
  const parent = document.querySelector('.userHealth');
  const healthBlock = parent.lastChild;
  healthBlock.style.backgroundColor = 'red';
  healthBlock.className = 'healthBlock blinkHealth';
  setTimeout(() => {
    parent.removeChild(healthBlock);
  }, 4000);
}

function removeweMonsterHealthBlock() {
  const parent = document.querySelector('.monsterHealth');
  const healthBlock = parent.firstChild;
  healthBlock.style.backgroundColor = 'red';
  healthBlock.className = 'healthBlock blinkHealth';
  setTimeout(() => {
    parent.removeChild(healthBlock);
  }, 4000);
}

export { removeUserHealthBlock, removeweMonsterHealthBlock };
