// Вибір елементів
const score0Element = document.querySelector('#score--0');
const score1Element = document.getElementById('score--1');
const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnRestart = document.querySelector('.btn--restart');
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');

let totalScores, currentScore, activePlayer, isPlaying;

const initGame = function () {
  totalScores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  isPlaying = true;

  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
  player0Element.classList.add('player--active');
  player1Element.classList.remove('player--active');
  diceElement.classList.add('hidden');
};

initGame();

const switchActivePlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

// Кидок кубика
btnRoll.addEventListener('click', function () {
  if (isPlaying) {
    // 1. Генерація випадкового числа від 1 до 6
    const diceNumber = Math.trunc(Math.random() * 6) + 1;

    // 2. Відображення кубика
    diceElement.classList.remove('hidden');
    diceElement.src = `images/dice${diceNumber}.png`;

    // 3. Перевірка, чи не випало 1
    if (diceNumber !== 1) {
      // Додаємо до поточного рахунку
      currentScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      // Перемикання до наступного гравця
      switchActivePlayer();
    }
  }
});

// Утримання рахунку
btnHold.addEventListener('click', function () {
  if (isPlaying) {
    totalScores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = totalScores[activePlayer];

    if (totalScores[activePlayer] >= 25) {
      isPlaying = false;
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
      diceElement.classList.add('hidden');
    } else {
      switchActivePlayer();
    }
  }
});

// Рестарт гри
btnNew.addEventListener('click', initGame);
const btnExit = document.querySelector('.btn--exit');

btnExit.addEventListener('click', function() {
  window.close(); // Закриває поточну вкладку
});
