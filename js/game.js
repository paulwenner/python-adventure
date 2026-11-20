const board = document.querySelector('#game-board');
const commands = document.querySelector('#commands');
const feedback = document.querySelector('#game-feedback');
const start = 20;
const goal = 4;
const rocks = [7, 12, 17];
let player = start;

function showBoard() {
  board.replaceChildren();
  for (let spot = 0; spot < 25; spot += 1) {
    const cell = document.createElement('div');
    cell.className = 'board-cell';
    if (spot === player) cell.textContent = 'Road Runner';
    else if (spot === goal) cell.textContent = 'Ziel';
    else if (rocks.includes(spot)) cell.textContent = 'Fels';
    else cell.textContent = '·';
    board.append(cell);
  }
}

function resetGame() {
  player = start;
  showBoard();
  feedback.textContent = 'Gib Befehle ein: rechts, links, hoch, runter.';
}

showBoard();
document.querySelector('#start-game').addEventListener('click', () => {
  player = start;
  const steps = commands.value.split(',').map((step) => step.trim().toLowerCase()).filter(Boolean);
  if (steps.length === 0 || steps.length > 25) {
    feedback.textContent = 'Gib zwischen 1 und 25 Befehle ein.';
    return;
  }

  for (const step of steps) {
    const change = { rechts: 1, links: -1, hoch: -5, runter: 5 }[step];
    if (change === undefined) {
      feedback.textContent = `Unbekannter Befehl: ${step}`;
      return;
    }
    const next = player + change;
    if (next < 0 || next > 24 || (step === 'rechts' && player % 5 === 4) || (step === 'links' && player % 5 === 0)) {
      feedback.textContent = 'Der Road Runner wäre aus dem Spielfeld gelaufen.';
      return;
    }
    if (rocks.includes(next)) {
      feedback.textContent = 'Ein Fels versperrt den Weg. Ändere deine Befehle.';
      return;
    }
    player = next;
  }

  showBoard();
  feedback.textContent = player === goal ? 'Geschafft! Du hast das Ziel erreicht.' : 'Noch nicht am Ziel. Ändere die Befehlsfolge.';
});
document.querySelector('#reset-game').addEventListener('click', resetGame);
