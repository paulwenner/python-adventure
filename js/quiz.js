const quizForm = document.querySelector('#quiz-form');
const quizFeedback = document.querySelector('#quiz-feedback');

quizForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const answers = new FormData(quizForm);
  let score = 0;
  if (answers.get('q1') === 'b') score += 1;
  if (answers.get('q2') === 'a') score += 1;
  quizFeedback.textContent = `Du hast ${score} von 2 Fragen richtig.`;
});
