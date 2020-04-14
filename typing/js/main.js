'use strict';

{
  const words = [
    'apple',
    'sky',
    'blue',
    'middle',
    'set',
  ];
  let word;
  let loc;
  let score;
  let miss;
  const timeLimit = 10 * 1000;
  let startTime;
  let isPlaying = false;

  const target = document.getElementById('target');
  const scoreLabel = document.getElementById('score');
  const missLabel = document.getElementById('miss');
  const timerLabel = document.getElementById('timer');
  
  function initiallize() {
      loc = 0;
      score = 0;
      miss = 0;
      word = "type enter to start"
      scoreLabel.textContent = score;
      missLabel.textContent = miss;
      target.textContent = word;
  }

  function updateTarget() {
    let placeholder = '';
    for (let i=0; i<loc; i++) {
      placeholder += '_';
    }
    target.textContent = placeholder + word.substring(loc);
  }

  function updateTimer() {
    const timeLeft = startTime + timeLimit - Date.now();
    timerLabel.textContent = (timeLeft / 1000).toFixed(2);

    const timeoutId = setTimeout(() => {
      updateTimer();
    }, 10);

    if (timeLeft < 0) {
      isPlaying = false;
      clearTimeout(timeoutId);
      timerLabel.textContent = '0.00';
      setTimeout(() => {
        showResult();
        initiallize();
      }, 100);
    }
  }

  function showResult() {
    const accuracy = score + miss === 0 ? 0 : score / (score + miss) * 100;
    const charsPerSec = score * 1000 / timeLimit
    alert(`${score} letters, ${miss} misses, ${accuracy.toFixed(2)}% accuracy!\n${charsPerSec.toFixed(2)} chars/sec`);
  }

  initiallize();
  window.addEventListener('keydown', e => {
    if (isPlaying) {
      return;
    }
    if (e.key === 'Enter') {
      isPlaying = true;
      word = words[Math.floor(Math.random() * words.length)];
      target.textContent = word;
      startTime = Date.now();
      updateTimer();
    }
  });

  window.addEventListener('keydown', e => {
    if (!isPlaying) {
      return;
    }
    if (e.key === 'Enter') {
      return;
    }
    if (e.key === word[loc]) {
      loc++;
      if (loc === word.length) {
        word = words[Math.floor(Math.random() * words.length)];
        loc = 0;
      }
      updateTarget();
      score++;
      scoreLabel.textContent = score;
    } else {
      miss++;
      missLabel.textContent = miss;
    }
  });
}
