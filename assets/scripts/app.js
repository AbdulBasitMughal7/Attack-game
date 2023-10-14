const PLAYER_ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 20;
const PLAYER_STRONG_ATTACK_VALUE = 20;
const PLAYER_HEAL_VALUE = 22;

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';

const userEnteredValue = prompt('Enter the player and monster life', '100');
let chosenMaxLife = parseInt(userEnteredValue);
let currentMonsterLife = chosenMaxLife;
let currentPlayerLife = chosenMaxLife;
let playerBonusLife = true;
let battleLog = [];

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
  chosenMaxLife = 100;
}

adjustHealthBars(chosenMaxLife);

function writeToLog(ev, val, monsterHealth, playerHealth) {
  let logEntry = {
    event: ev,
    value: val,
    finalMonterHealth: monsterHealth,
    finalPlayerHealth: playerHealth,
  };
  if (ev == LOG_EVENT_PLAYER_ATTACK) {
    logEntry.target = 'MONSTER';
  } else if (ev == LOG_EVENT_MONSTER_ATTACK) {
    logEntry.target = 'PLAYER';
  } else if (ev == LOG_EVENT_PLAYER_STRONG_ATTACK) {
    logEntry.target = 'MONSTER';
  } else if (ev == LOG_EVENT_GAME_OVER) {
    logEntry;
  }
  battleLog.push(logEntry);
}

function reset() {
  currentMonsterLife = chosenMaxLife;
  currentPlayerLife = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function healingRound() {
  const initialPlayerHealth = currentPlayerLife;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerLife -= playerDamage;
  writeToLog(
    LOG_EVENT_MONSTER_ATTACK,
    playerDamage,
    currentMonsterLife,
    currentPlayerLife
  );

  if (currentPlayerLife <= 0 && playerBonusLife) {
    playerBonusLife = false;
    removeBonusLife();
    currentPlayerLife = initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth);
    alert('Bonus Life has been used!');
  }

  if (currentMonsterLife <= 0 && currentPlayerLife > 0) {
    alert('YOU WON!');
    writeToLog(
      LOG_EVENT_GAME_OVER,
      'Player won',
      currentMonsterLife,
      currentPlayerLife
    );
    reset();
  } else if (currentPlayerLife <= 0 && currentMonsterLife > 0) {
    alert('YOU LOST!');
    writeToLog(
      LOG_EVENT_GAME_OVER,
      'Player lost',
      currentMonsterLife,
      currentPlayerLife
    );
    reset();
  } else if (currentMonsterLife <= 0 && currentPlayerLife <= 0) {
    alert('MATCH IS DRAW!');
    writeToLog(
      LOG_EVENT_GAME_OVER,
      'Draw',
      currentMonsterLife,
      currentPlayerLife
    );
    reset();
  }
}

function attackingMonster(attackMode) {
  let maxDamage;
  let logEvent;

  if (attackMode === MODE_ATTACK) {
    maxDamage = PLAYER_ATTACK_VALUE;
    logEvent = LOG_EVENT_PLAYER_ATTACK;
  } else if (attackMode === MODE_STRONG_ATTACK) {
    maxDamage = PLAYER_STRONG_ATTACK_VALUE;
    logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK
  }

  const monsterDamage = dealMonsterDamage(maxDamage);
  currentMonsterLife -= monsterDamage;
  writeToLog(
    logEvent,
    monsterDamage,
    currentMonsterLife,
    currentPlayerLife
  );

  healingRound();
}

function attackHandler() {
  attackingMonster(MODE_ATTACK);
}

function strongAttackHandler() {
  attackingMonster(MODE_STRONG_ATTACK);
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
  writeToLog(
    LOG_EVENT_PLAYER_HEAL,
    playerHealing,
    currentMonsterLife,
    currentPlayerLife
  );
  healingRound();
}
function printlogHandler() {
  console.log(battleLog);
}
attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healValueHandler);
logBtn.addEventListener('click', printlogHandler);
