const PLAYER_ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 20;
const PLAYER_STRONG_ATTACK_VALUE = 20;
const PLAYER_HEAL_VALUE = 22;

let chosenMaxLife = 100;
let currentMonsterLife = chosenMaxLife;
let currentPlayerLife = chosenMaxLife;
let playerBonusLife = true;

adjustHealthBars(chosenMaxLife);

function reset(){
  currentMonsterLife = chosenMaxLife;
  currentPlayerLife = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function healingRound() {
  const initialPlayerHealth = currentPlayerLife;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerLife -= playerDamage;

  if(currentPlayerLife <=0 && playerBonusLife){
    playerBonusLife = false;
    removeBonusLife();
    currentPlayerLife = initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth);
    alert("Bonus Life has been used!");

  }

  if (currentMonsterLife <= 0 && currentPlayerLife > 0) {
    alert('YOU WON!');
    reset();
  } else if (currentPlayerLife <= 0 && currentMonsterLife > 0) {
    alert('YOU LOST!');
    reset();
  } else if (currentMonsterLife <= 0 && currentPlayerLife <= 0) {
    alert('MATCH IS DRAW!');
    reset();
  }
}

function attackingMonster(attackMode) {
  let maxDamage;

  if (attackMode === 'ATTACK') {
    maxDamage = PLAYER_ATTACK_VALUE;
  } else if (attackMode === 'STRONGATTACK') {
    maxDamage = PLAYER_STRONG_ATTACK_VALUE;
  }

  const monsterDamage = dealMonsterDamage(maxDamage);
  currentMonsterLife -= monsterDamage;
  healingRound();
}

function attackHandler() {
  attackingMonster('ATTACK');
}

function strongAttackHandler() {
  attackingMonster('STRONGATTACK');
}

function healValueHandler() {
  let playerHealing;
  if (currentPlayerLife >= chosenMaxLife - PLAYER_HEAL_VALUE) {
    alert("You can't heal");
    playerHealing = chosenMaxLife - currentPlayerLife;
  } else {
    playerHealing = PLAYER_HEAL_VALUE;
  }
  increasePlayerHealth(PLAYER_HEAL_VALUE);
  currentPlayerLife += PLAYER_HEAL_VALUE;
  healingRound();
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healValueHandler);
