/**
 * 句法分析模块
 * 提供中文文本的句法结构分析功能
 */

import * as math from 'mathjs';

class SyntaxAnalyzer {
  constructor() {
    // 中文句子结束符
    this.sentenceEnders = /[。！？；.!?;]/g;

    // 中文标点符号
    this.punctuations = {
      '，': 'comma',
      '。': 'period',
      '！': 'exclamation',
      '？': 'question',
      '；': 'semicolon',
      '：': 'colon',
      '、': 'enumeration',
      '…': 'ellipsis',
      '—': 'dash',
      '（': 'parenthesis',
      '）': 'parenthesis'
    };
  }

  /**
   * 句子切分
   * @param {string} text - 待切分文本
   * @returns {Array<string>} 句子数组
   */
  splitSentences(text) {
    if (!text || typeof text !== 'string') {
      return [];
    }

    const sentences = text
      .split(this.sentenceEnders)
      .map(s => s.trim())
      .filter(s => s.length > 0);

    return sentences;
  }

  /**
   * 计算统计指标
   * @param {Array<number>} values - 数值数组
   * @returns {Object} 统计结果
   */
  calculateStats(values) {
    if (values.length === 0) {
      return { mean: 0, stdDev: 0, min: 0, max: 0 };
    }

    return {
      mean: math.mean(values),
      stdDev: math.std(values),
      min: Math.min(...values),
      max: Math.max(...values)
    };
  }

  /**
   * 句长分类
   * @param {number} length - 句子长度
   * @returns {string} 分类结果
   */
  categorizeSentenceLength(length) {
    if (length <= 10) return 'short';
    if (length <= 25) return 'medium';
    return 'long';
  }

  /**
   * 分析句长分布
   * @param {Array<string>} sentences - 句子数组
   * @returns {Object} 分析结果
   */
  analyzeSentenceLength(sentences) {
    const lengths = sentences.map(s => s.length);
    const stats = this.calculateStats(lengths);

    // 计算分布
    const distribution = { short: 0, medium: 0, long: 0 };
    lengths.forEach(len => {
      const category = this.categorizeSentenceLength(len);
      distribution[category]++;
    });

    // 转换为比例
    const total = sentences.length;
    Object.keys(distribution).forEach(key => {
      distribution[key] = distribution[key] / total;
    });

    return {
      avgLength: stats.mean,
      stdDeviation: stats.stdDev,
      minLength: stats.min,
      maxLength: stats.max,
      distribution
    };
  }

  /**
   * 标点符号分析
   * @param {string} text - 待分析文本
   * @returns {Object} 标点统计
   */
  analyzePunctuation(text) {
    const counts = {};
    let totalPunctuation = 0;

    // 统计各标点出现次数
    for (let char of text) {
      if (char in this.punctuations) {
        counts[char] = (counts[char] || 0) + 1;
        totalPunctuation++;
      }
    }

    // 转换为频率
    const frequency = {};
    Object.keys(counts).forEach(punct => {
      frequency[punct] = counts[punct] / totalPunctuation;
    });

    return {
      counts,
      frequency,
      total: totalPunctuation
    };
  }

  /**
   * 完整的句法分析
   * @param {string} text - 待分析文本
   * @returns {Object} 分析结果
   */
  analyze(text) {
    const sentences = this.splitSentences(text);
    const lengthAnalysis = this.analyzeSentenceLength(sentences);
    const punctuationAnalysis = this.analyzePunctuation(text);

    return {
      sentenceCount: sentences.length,
      avgSentenceLength: lengthAnalysis.avgLength,
      lengthDistribution: lengthAnalysis.distribution,
      stdDeviation: lengthAnalysis.stdDeviation,
      punctuationStyle: punctuationAnalysis.frequency,
      punctuationCounts: punctuationAnalysis.counts
    };
  }
}

export default SyntaxAnalyzer;
