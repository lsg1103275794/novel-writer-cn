/**
 * 风格一致性检测器
 * 实时检测文本与目标风格的匹配度
 */

import NLPAnalyzer from './nlp-analyzer.js';

class ConsistencyChecker {
  constructor() {
    this.nlpAnalyzer = new NLPAnalyzer();

    // 权重配置
    this.weights = {
      vocabulary: 0.3,    // 词汇权重 30%
      syntax: 0.3,        // 句法权重 30%
      sentiment: 0.2,     // 情感权重 20%
      rhythm: 0.2         // 节奏权重 20%
    };
  }

  /**
   * 检测文本与目标风格的一致性
   * @param {string} text - 待检测文本
   * @param {Object} targetStyle - 目标风格配置
   * @returns {Object} 一致性检测结果
   */
  checkConsistency(text, targetStyle) {
    // 分析当前文本
    const currentAnalysis = this.nlpAnalyzer.analyze(text);

    // 计算各维度匹配度
    const vocabulary = this.checkVocabulary(currentAnalysis.vocabulary, targetStyle.vocabulary);
    const syntax = this.checkSyntax(currentAnalysis.syntax, targetStyle.syntax);
    const sentiment = this.checkSentiment(currentAnalysis.sentiment, targetStyle.sentiment);
    const rhythm = this.checkRhythm(currentAnalysis, targetStyle);

    // 计算综合得分
    const overall =
      vocabulary.score * this.weights.vocabulary +
      syntax.score * this.weights.syntax +
      sentiment.score * this.weights.sentiment +
      rhythm.score * this.weights.rhythm;

    return {
      overall: overall * 100,  // 转换为百分比
      overallLevel: this.getConsistencyLevel(overall * 100),
      dimensions: {
        vocabulary,
        syntax,
        sentiment,
        rhythm
      },
      summary: this.generateSummary(overall * 100, { vocabulary, syntax, sentiment, rhythm })
    };
  }

  /**
   * 检测词汇匹配度
   * @param {Object} currentVocab - 当前文本的词汇分析结果
   * @param {Object} targetVocab - 目标风格的词汇特征
   * @returns {Object} 词汇匹配度结果
   */
  checkVocabulary(currentVocab, targetVocab) {
    // 容错处理：确保目标风格有必要字段
    const targetRichness = targetVocab?.vocabularyRichness ?? 0.5;
    const targetTopWords = targetVocab?.topWords ?? [];

    // 1. 词汇丰富度匹配
    const richnessScore = 1 - Math.abs(currentVocab.vocabularyRichness - targetRichness);

    // 2. 高频词重叠度
    const currentTopWords = currentVocab.topWords?.slice(0, 20) ?? [];
    const targetTop20 = targetTopWords.slice(0, 20);
    const overlap = this.calculateOverlap(currentTopWords, targetTop20);

    // 综合得分
    const score = (richnessScore * 0.4 + overlap * 0.6);

    return {
      score,
      percentage: (score * 100).toFixed(1) + '%',
      level: this.getMatchLevel(score),
      details: {
        richnessScore: richnessScore.toFixed(3),
        overlapScore: overlap.toFixed(3),
        currentRichness: currentVocab.vocabularyRichness.toFixed(3),
        targetRichness: targetVocab.vocabularyRichness.toFixed(3)
      },
      suggestions: this.generateVocabSuggestions(currentVocab, targetVocab, score)
    };
  }

  /**
   * 计算词汇重叠度
   */
  calculateOverlap(current, target) {
    const currentSet = new Set(current);
    const targetSet = new Set(target);
    let overlapCount = 0;

    for (const word of currentSet) {
      if (targetSet.has(word)) {
        overlapCount++;
      }
    }

    return overlapCount / Math.max(currentSet.size, targetSet.size);
  }

  /**
   * 检测句法匹配度
   * @param {Object} currentSyntax - 当前文本的句法分析结果
   * @param {Object} targetSyntax - 目标风格的句法特征
   * @returns {Object} 句法匹配度结果
   */
  checkSyntax(currentSyntax, targetSyntax) {
    // 容错处理
    const targetAvgLength = targetSyntax?.avgSentenceLength ?? 15;
    const targetDist = targetSyntax?.lengthDistribution ?? { short: 0.3, medium: 0.5, long: 0.2 };

    // 1. 平均句长匹配度
    const avgLengthDiff = Math.abs(currentSyntax.avgSentenceLength - targetAvgLength);
    const avgLengthScore = Math.max(0, 1 - avgLengthDiff / 20);

    // 2. 句长分布匹配度
    const distScore = this.calculateDistributionSimilarity(
      currentSyntax.lengthDistribution,
      targetDist
    );

    // 综合得分
    const score = (avgLengthScore * 0.5 + distScore * 0.5);

    return {
      score,
      percentage: (score * 100).toFixed(1) + '%',
      level: this.getMatchLevel(score),
      details: {
        avgLengthScore: avgLengthScore.toFixed(3),
        distScore: distScore.toFixed(3),
        currentAvgLength: currentSyntax.avgSentenceLength.toFixed(2),
        targetAvgLength: targetAvgLength.toFixed(2)
      },
      suggestions: this.generateSyntaxSuggestions(currentSyntax, targetSyntax, score)
    };
  }

  /**
   * 计算分布相似度
   */
  calculateDistributionSimilarity(current, target) {
    const keys = ['short', 'medium', 'long'];
    let totalDiff = 0;

    for (const key of keys) {
      const diff = Math.abs((current[key] || 0) - (target[key] || 0));
      totalDiff += diff;
    }

    return Math.max(0, 1 - totalDiff / 2);
  }

  /**
   * 检测情感匹配度
   */
  checkSentiment(currentSentiment, targetSentiment) {
    // 容错处理
    const targetTone = targetSentiment?.emotionalTone ?? 'neutral';
    const targetScore = targetSentiment?.sentimentScore ?? 0;

    // 情感倾向匹配
    const toneMatch = currentSentiment.emotionalTone === targetTone ? 1 : 0.5;

    // 情感得分差异
    const scoreDiff = Math.abs(currentSentiment.sentimentScore - targetScore);
    const scoreMatch = Math.max(0, 1 - scoreDiff);

    const score = (toneMatch * 0.6 + scoreMatch * 0.4);

    return {
      score,
      percentage: (score * 100).toFixed(1) + '%',
      level: this.getMatchLevel(score),
      details: {
        currentTone: currentSentiment.emotionalTone,
        targetTone: targetTone,
        toneMatch: toneMatch === 1
      },
      suggestions: this.generateSentimentSuggestions(currentSentiment, targetSentiment, score)
    };
  }

  /**
   * 检测节奏匹配度
   */
  checkRhythm(currentAnalysis, targetStyle) {
    // 容错处理
    const currentStdDev = currentAnalysis.syntax?.stdDeviation ?? 5;
    const targetStdDev = targetStyle?.syntax?.stdDeviation ?? 5;

    const diff = Math.abs(currentStdDev - targetStdDev);
    const score = Math.max(0, 1 - diff / 10);

    return {
      score,
      percentage: (score * 100).toFixed(1) + '%',
      level: this.getMatchLevel(score),
      details: {
        currentStdDev: currentStdDev.toFixed(2),
        targetStdDev: targetStdDev.toFixed(2)
      },
      suggestions: this.generateRhythmSuggestions(currentStdDev, targetStdDev, score)
    };
  }

  /**
   * 生成词汇改进建议
   */
  generateVocabSuggestions(current, target, score) {
    const suggestions = [];

    if (score < 0.6) {
      const richnessDiff = target.vocabularyRichness - current.vocabularyRichness;
      if (richnessDiff > 0.1) {
        suggestions.push('词汇丰富度偏低，建议使用更多样化的词汇');
      } else if (richnessDiff < -0.1) {
        suggestions.push('词汇过于复杂，建议使用更常见的表达');
      }

      suggestions.push('建议参考目标风格的高频词汇');
    } else if (score < 0.8) {
      suggestions.push('词汇使用基本符合，可适当增加特色词汇');
    } else {
      suggestions.push('词汇使用优秀，与目标风格高度一致');
    }

    return suggestions;
  }

  /**
   * 生成句法改进建议
   */
  generateSyntaxSuggestions(current, target, score) {
    const suggestions = [];

    if (score < 0.6) {
      const lengthDiff = target.avgSentenceLength - current.avgSentenceLength;
      if (lengthDiff > 3) {
        suggestions.push(`当前平均句长 ${current.avgSentenceLength.toFixed(1)} 字，建议增加到 ${target.avgSentenceLength.toFixed(1)} 字左右`);
      } else if (lengthDiff < -3) {
        suggestions.push(`当前平均句长 ${current.avgSentenceLength.toFixed(1)} 字，建议缩短到 ${target.avgSentenceLength.toFixed(1)} 字左右`);
      }
    } else if (score < 0.8) {
      suggestions.push('句法结构基本符合，可进一步优化句式变化');
    } else {
      suggestions.push('句法结构优秀，与目标风格高度一致');
    }

    return suggestions;
  }

  /**
   * 生成情感改进建议
   */
  generateSentimentSuggestions(current, target, score) {
    const suggestions = [];

    if (current.emotionalTone !== target.emotionalTone) {
      suggestions.push(`当前情感倾向为 ${current.emotionalTone}，目标为 ${target.emotionalTone}，建议调整情感表达`);
    } else if (score < 0.8) {
      suggestions.push('情感倾向正确，但强度需要调整');
    } else {
      suggestions.push('情感表达优秀，与目标风格一致');
    }

    return suggestions;
  }

  /**
   * 生成节奏改进建议
   */
  generateRhythmSuggestions(current, target, score) {
    const suggestions = [];

    if (score < 0.6) {
      if (current > target) {
        suggestions.push('句长变化过大，建议使用更统一的句式');
      } else {
        suggestions.push('句长过于单调，建议增加句式变化');
      }
    } else if (score < 0.8) {
      suggestions.push('节奏基本符合，可进一步优化');
    } else {
      suggestions.push('节奏控制优秀，与目标风格一致');
    }

    return suggestions;
  }

  /**
   * 获取匹配等级
   */
  getMatchLevel(score) {
    if (score >= 0.9) return '优秀';
    if (score >= 0.75) return '良好';
    if (score >= 0.6) return '一般';
    if (score >= 0.4) return '较差';
    return '很差';
  }

  /**
   * 获取一致性等级
   */
  getConsistencyLevel(percentage) {
    if (percentage >= 90) return '高度一致';
    if (percentage >= 75) return '基本一致';
    if (percentage >= 60) return '部分一致';
    if (percentage >= 40) return '一致性较低';
    return '一致性很低';
  }

  /**
   * 生成检测摘要
   */
  generateSummary(overall, dimensions) {
    const textLines = [];
    const suggestions = [];

    // 总体评价
    textLines.push(`综合一致性得分：${overall.toFixed(1)}% (${this.getConsistencyLevel(overall)})`);
    textLines.push('');

    // 各维度评价
    const dimNames = {
      vocabulary: '词汇',
      syntax: '句法',
      sentiment: '情感',
      rhythm: '节奏'
    };

    for (const [key, name] of Object.entries(dimNames)) {
      const dim = dimensions[key];
      const icon = dim.score >= 0.75 ? '✓' : dim.score >= 0.6 ? '⚠' : '✗';
      textLines.push(`${icon} ${name}层面：${dim.percentage} (${dim.level})`);

      // 收集改进建议
      if (dim.suggestions && dim.suggestions.length > 0) {
        dim.suggestions.forEach(s => {
          if (!s.includes('优秀') && !s.includes('一致')) {
            suggestions.push(s);
          }
        });
      }
    }

    return {
      text: textLines.join('\n'),
      suggestions: suggestions
    };
  }
}

export default ConsistencyChecker;
