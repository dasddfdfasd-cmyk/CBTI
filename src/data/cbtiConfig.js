import { cbtiQuestions } from './cbtiQuestions';

export const cbtiConfig = {
  meta: {
    project: 'CBTI',
    fullName: 'Chinese Being Type Indicator',
    zhName: '东方人格原型测试',
    version: '1.0.0',
    dimensions: ['wuxing', 'yinyang', 'strength'],
    wuxingValues: ['wood', 'fire', 'earth', 'metal', 'water'],
    yinyangValues: ['yang', 'yin'],
    strengthValues: ['strong', 'weak']
  },
  questions: cbtiQuestions,
  typeMapping: {
    wood: {
      yang: {
        strong: { name: '青梧', oneLiner: '天生向上，认准方向后，会安静但持续地生长。' },
        weak: { name: '燎星', oneLiner: '容易被点燃，行动快，热情来得真，也退得快。' }
      },
      yin: {
        strong: { name: '岚生', oneLiner: '不张扬，但一直在变强，很多成长都发生在安静的时候。' },
        weak: { name: '幽煌', oneLiner: '表面安静，内里却一直有光在生长，敏感、细密，也自带幽深的扩张感。' }
      }
    },
    fire: {
      yang: {
        strong: { name: '扶光', oneLiner: '自带存在感，容易带动气氛，也容易成为人群里的焦点。' },
        weak: { name: '明烬', oneLiner: '热度退下去以后，心里的光还在，很多事不会真正放下。' }
      },
      yin: {
        strong: { name: '温炉', oneLiner: '情绪不外放，但会持续发热，慢慢影响周围的人和局面。' },
        weak: { name: '残烛', oneLiner: '感受细，火也细，外界一点风吹草动都会有反应。' }
      }
    },
    earth: {
      yang: {
        strong: { name: '静岳', oneLiner: '重稳定，抗压强，很多时候靠“稳”把事情撑过去。' },
        weak: { name: '浮垣', oneLiner: '表面能撑住局面，内里却容易累，常常比别人更早进入硬扛状态。' }
      },
      yin: {
        strong: { name: '隐山', oneLiner: '边界感强，慢热，不轻易表态，但一旦站定就很难被改变。' },
        weak: { name: '听泉', oneLiner: '先感受环境，再决定行动，节奏慢一点，但很少盲动。' }
      }
    },
    metal: {
      yang: {
        strong: { name: '玄钧', oneLiner: '判断重，分寸清楚，遇事自然会先想轻重和边界。' },
        weak: { name: '玉衡', oneLiner: '心里有标准，也有秤，很多选择都在反复衡量中完成。' }
      },
      yin: {
        strong: { name: '藏锋', oneLiner: '不轻易露锋芒，但真正的判断力和边界一直都在。' },
        weak: { name: '碎玉', oneLiner: '敏感、细致、重质感，很容易察觉不对，也容易被粗糙伤到。' }
      }
    },
    water: {
      yang: {
        strong: { name: '观潮', oneLiner: '对趋势和变化很敏感，常常比别人更早感到风向在变。' },
        weak: { name: '云汐', oneLiner: '状态起伏明显，环境一变，心里和行动都会跟着波动。' }
      },
      yin: {
        strong: { name: '深潭', oneLiner: '内心深，想得多，不轻易显露，很多东西都藏在表面之下。' },
        weak: { name: '月涧', oneLiner: '安静、细腻、情绪往里走，很多波动只发生在自己心里。' }
      }
    }
  },
  resultRules: {
    scoreAggregation: {
      wuxing: 'sum_all_option_weights_by_wuxing',
      yinyang: 'sum_all_option_weights_by_yinyang',
      strength: 'sum_all_option_weights_by_strength'
    },
    primaryWuxing: { rule: 'highest_score', field: 'primaryWuxing' },
    secondaryWuxing: { rule: 'second_highest_score', field: 'secondaryWuxing' },
    wuxingGapRule: {
      field: 'wuxingGap',
      formula: 'primaryWuxingScore - secondaryWuxingScore',
      thresholds: { dualActive: 2, clearPrimary: 3 },
      interpretation: { '<=2': '你不是单一纯型，副相也很活跃。', '>=3': '你的主相较为明确。' }
    },
    yinyangRule: {
      field: 'yinyangType',
      rule: 'compare_yang_vs_yin',
      tieBreaker: 'prefer_higher_recent_trend_or_default_yin',
      softLabelThreshold: 2,
      labels: {
        yang: { stronger: '阳性明显', slight: '阳性表达略占上风' },
        yin: { stronger: '阴性明显', slight: '阴性表达略占上风' }
      }
    },
    strengthRule: {
      field: 'strengthType',
      rule: 'compare_strong_vs_weak',
      tieBreaker: 'prefer_higher_recent_trend_or_default_weak',
      softLabelThreshold: 2,
      displayLabels: {
        strong: { internal: 'strong', display: '身强' },
        weak: { internal: 'weak', display: '身弱' }
      }
    },
    finalTypeRule: { rule: 'lookup_by_primaryWuxing_yinyangType_strengthType', source: 'typeMapping' },
    confidenceRule: {
      fields: {
        wuxingGap: 'primaryWuxingScore - secondaryWuxingScore',
        yinyangGap: 'abs(yangScore - yinScore)',
        strengthGap: 'abs(strongScore - weakScore)'
      },
      thresholds: {
        high: { wuxingGap: 4, yinyangGap: 3, strengthGap: 3 },
        medium: { wuxingGap: 2, yinyangGap: 1, strengthGap: 1 }
      },
      labels: {
        high: '你的能量结构比较集中，结果稳定性较高。',
        medium: '你的主型明确，但副相也很活跃，说明你在不同场景下会呈现更丰富的层次。',
        mixed: '你的结果更接近复合型人格，不是单一原型，而是两股力量同时在起作用。'
      }
    },
    secondaryWuxingNarrative: {
      wood: { water: '生长欲强，但不是直冲型，而是会先蓄势、先观察再长。', fire: '生发很快，也很容易把内在推动成外在热度。', earth: '向前生长的同时，也在意是否能真正落下来。', metal: '想长、想开，但内里始终保留判断和修剪。' },
      fire: { wood: '热度背后有很强的生长欲和推进欲。', earth: '天生有亮度，但真正能成事靠的是后面的承接与稳住。', metal: '会表达、会点亮，但也会自带边界和选择。', water: '外在热，内里深，很多情绪并不会一次说尽。' },
      earth: { wood: '能接住，也愿意继续把事情往前养大。', fire: '承载之外，也有点亮局面的能力。', metal: '稳住局面之后，会自然进入整理和定规。', water: '表面承接，内里其实很依赖安静和回收。' },
      metal: { wood: '判断很清楚，但也不会完全压住生长和展开。', fire: '有边界，也会在必要时显露锋芒。', earth: '边界感强，但底层是为了让事情更稳。', water: '判断之后会回收，行动之前会先沉下去。' },
      water: { wood: '内心很深，但一旦积累够了，会突然长出明确方向感。', fire: '感受深，但不代表没有表达冲动，只是热度常常后置。', earth: '会先观察和回收，但也需要现实的安顿感。', metal: '深感受之下，其实自带很清楚的判断和边界。' }
    }
  }
};
