import { archetypeMap } from './archetypes';

const ELEMENTS = ['木', '火', '土', '金', '水'];

export function createEmptyScores() {
  return {
    element: { 木: 0, 火: 0, 土: 0, 金: 0, 水: 0 },
    polarity: { 阳: 0, 阴: 0 },
    energy: { 强: 0, 弱: 0 }
  };
}

export function calculateScores(questions, answers) {
  const scores = createEmptyScores();

  questions.forEach((question) => {
    const answer = answers[question.id];
    if (!answer) return;

    if (question.dimension === 'element') {
      const mapping = question.elementScores?.[answer] ?? {};
      ELEMENTS.forEach((element) => {
        scores.element[element] += mapping[element] ?? 0;
      });
      return;
    }

    if (question.dimension === 'polarity') {
      if (answer === 'A') scores.polarity.阳 += 2;
      if (answer === 'B') {
        scores.polarity.阳 += 1;
        scores.polarity.阴 += 1;
      }
      if (answer === 'C') scores.polarity.阴 += 2;
      return;
    }

    if (question.dimension === 'energy') {
      if (answer === 'A') scores.energy.强 += 2;
      if (answer === 'B') {
        scores.energy.强 += 1;
        scores.energy.弱 += 1;
      }
      if (answer === 'C') scores.energy.弱 += 2;
    }
  });

  return scores;
}

function resolveTopKey(scoreMap, fallbackOrder) {
  return Object.entries(scoreMap).sort((a, b) => {
    if (b[1] !== a[1]) return b[1] - a[1];
    return fallbackOrder.indexOf(a[0]) - fallbackOrder.indexOf(b[0]);
  })[0][0];
}

export function getResultFromAnswers(questions, answers) {
  const scores = calculateScores(questions, answers);
  const element = resolveTopKey(scores.element, ['木', '火', '土', '金', '水']);
  const polarity = resolveTopKey(scores.polarity, ['阳', '阴']);
  const energy = resolveTopKey(scores.energy, ['强', '弱']);
  const archetype = archetypeMap[`${element}-${polarity}-${energy}`];

  return {
    scores,
    element,
    polarity,
    energy,
    archetype
  };
}

export function getProgressPercent(answerCount, total) {
  if (!total) return 0;
  return Math.round((answerCount / total) * 100);
}
