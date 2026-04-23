import { archetypesDetailed as archetypes } from './archetypesDetailed';
import { cbtiConfig } from './cbtiConfig';

const zhMap = {
  wuxing: { wood: '木', fire: '火', earth: '土', metal: '金', water: '水' },
  yinyang: { yang: '阳', yin: '阴' },
  strength: { strong: '强', weak: '弱' }
};

function createZeroScores() {
  return {
    wuxing: Object.fromEntries(cbtiConfig.meta.wuxingValues.map((key) => [key, 0])),
    yinyang: Object.fromEntries(cbtiConfig.meta.yinyangValues.map((key) => [key, 0])),
    strength: Object.fromEntries(cbtiConfig.meta.strengthValues.map((key) => [key, 0]))
  };
}

function rankEntries(scoreMap, tieOrder) {
  return Object.entries(scoreMap).sort((a, b) => {
    if (b[1] !== a[1]) return b[1] - a[1];
    return tieOrder.indexOf(a[0]) - tieOrder.indexOf(b[0]);
  });
}

function pickYinyang(scores) {
  if (scores.yang === scores.yin) return 'yin';
  return scores.yang > scores.yin ? 'yang' : 'yin';
}

function pickStrength(scores) {
  if (scores.strong === scores.weak) return 'weak';
  return scores.strong > scores.weak ? 'strong' : 'weak';
}

function getSoftLabel(type, gap, labels, threshold) {
  return gap >= threshold ? labels[type].stronger : labels[type].slight;
}

function getConfidenceLabel(wuxingGap, yinyangGap, strengthGap, confidenceRule) {
  const high = confidenceRule.thresholds.high;
  const medium = confidenceRule.thresholds.medium;
  if (wuxingGap >= high.wuxingGap && yinyangGap >= high.yinyangGap && strengthGap >= high.strengthGap) return 'high';
  if (wuxingGap >= medium.wuxingGap && yinyangGap >= medium.yinyangGap && strengthGap >= medium.strengthGap) return 'medium';
  return 'mixed';
}

function findDetailedArchetype(primaryWuxing, yinyangType, strengthType, mappedName) {
  return (
    archetypes.find(
      (item) =>
        item.element === zhMap.wuxing[primaryWuxing] &&
        item.polarity === zhMap.yinyang[yinyangType] &&
        item.energy === zhMap.strength[strengthType]
    ) ?? {
      id: `${primaryWuxing}-${yinyangType}-${strengthType}`,
      element: zhMap.wuxing[primaryWuxing],
      polarity: zhMap.yinyang[yinyangType],
      energy: zhMap.strength[strengthType],
      name: mappedName,
      coreFeatures: '',
      relationshipStyle: '',
      imbalance: '',
      suitableDirections: ''
    }
  );
}

export function calculateScores(questions, answers) {
  const scores = createZeroScores();

  questions.forEach((question) => {
    const selected = answers[question.id];
    if (!selected) return;
    const option = question.options.find((item) => item.label === selected);
    if (!option) return;

    cbtiConfig.meta.wuxingValues.forEach((key) => {
      scores.wuxing[key] += option.weights.wuxing[key];
    });
    cbtiConfig.meta.yinyangValues.forEach((key) => {
      scores.yinyang[key] += option.weights.yinyang[key];
    });
    cbtiConfig.meta.strengthValues.forEach((key) => {
      scores.strength[key] += option.weights.strength[key];
    });
  });

  return scores;
}

export function getResultFromAnswers(questions, answers) {
  const scores = calculateScores(questions, answers);
  const wuxingRank = rankEntries(scores.wuxing, cbtiConfig.meta.wuxingValues);
  const primaryWuxing = wuxingRank[0][0];
  const secondaryWuxing = wuxingRank[1][0];
  const primaryWuxingScore = wuxingRank[0][1];
  const secondaryWuxingScore = wuxingRank[1][1];
  const wuxingGap = primaryWuxingScore - secondaryWuxingScore;
  const yinyangType = pickYinyang(scores.yinyang);
  const strengthType = pickStrength(scores.strength);
  const yinyangGap = Math.abs(scores.yinyang.yang - scores.yinyang.yin);
  const strengthGap = Math.abs(scores.strength.strong - scores.strength.weak);
  const mapping = cbtiConfig.typeMapping[primaryWuxing][yinyangType][strengthType];
  const detailedArchetype = findDetailedArchetype(primaryWuxing, yinyangType, strengthType, mapping.name);
  const confidenceLevel = getConfidenceLabel(wuxingGap, yinyangGap, strengthGap, cbtiConfig.resultRules.confidenceRule);

  return {
    scores,
    primaryWuxing,
    secondaryWuxing,
    primaryWuxingScore,
    secondaryWuxingScore,
    wuxingGap,
    yinyangType,
    strengthType,
    yinyangGap,
    strengthGap,
    finalType: mapping.name,
    archetype: { ...detailedArchetype, name: mapping.name },
    labels: {
      primaryWuxing: zhMap.wuxing[primaryWuxing],
      secondaryWuxing: zhMap.wuxing[secondaryWuxing],
      yinyang: zhMap.yinyang[yinyangType],
      strength: zhMap.strength[strengthType],
      yinyangDetail: getSoftLabel(yinyangType, yinyangGap, cbtiConfig.resultRules.yinyangRule.labels, cbtiConfig.resultRules.yinyangRule.softLabelThreshold),
      strengthDetail: cbtiConfig.resultRules.strengthRule.displayLabels[strengthType].display,
      wuxingInterpretation:
        wuxingGap <= cbtiConfig.resultRules.wuxingGapRule.thresholds.dualActive
          ? cbtiConfig.resultRules.wuxingGapRule.interpretation['<=2']
          : cbtiConfig.resultRules.wuxingGapRule.interpretation['>=3'],
      confidence: cbtiConfig.resultRules.confidenceRule.labels[confidenceLevel]
    },
    confidenceLevel,
    secondaryNarrative: cbtiConfig.resultRules.secondaryWuxingNarrative[primaryWuxing]?.[secondaryWuxing] ?? ''
  };
}

export function getProgressPercent(answerCount, total) {
  if (!total) return 0;
  return Math.round((answerCount / total) * 100);
}
