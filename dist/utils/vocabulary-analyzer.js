/**
 * 词汇分析模块
 * 提供中文文本的词汇层面分析功能
 */

import Segment from 'segment';

class VocabularyAnalyzer {
  constructor() {
    // 初始化分词器
    this.segment = new Segment();
    this.segment.useDefault();
  }

  /**
   * 中文分词
   * @param {string} text - 待分词文本
   * @returns {Array<string>} 分词结果
   */
  tokenize(text) {
    if (!text || typeof text !== 'string') {
      return [];
    }

    const tokens = this.segment.doSegment(text, {
      simple: true,
      stripPunctuation: true
    });

    // 过滤空白和单字符
    return tokens.filter(token => token.trim().length > 0);
  }

  /**
   * 计算词频
   * @param {Array<string>} tokens - 分词结果
   * @returns {Map<string, number>} 词频映射
   */
  calculateFrequency(tokens) {
    const frequency = new Map();

    tokens.forEach(token => {
      frequency.set(token, (frequency.get(token) || 0) + 1);
    });

    return frequency;
  }

  /**
   * 获取高频词
   * @param {Map<string, number>} frequency - 词频映射
   * @param {number} topN - 返回前N个
   * @returns {Array<{word: string, count: number}>}
   */
  getTopWords(frequency, topN = 100) {
    const sorted = Array.from(frequency.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, topN);

    return sorted.map(([word, count]) => ({ word, count }));
  }

  /**
   * 计算词汇丰富度 (Type-Token Ratio)
   * @param {Array<string>} tokens - 分词结果
   * @returns {number} TTR值 (0-1)
   */
  calculateTTR(tokens) {
    if (tokens.length === 0) return 0;

    const uniqueTokens = new Set(tokens);
    return uniqueTokens.size / tokens.length;
  }

  /**
   * 完整的词汇分析
   * @param {string} text - 待分析文本
   * @returns {Object} 分析结果
   */
  analyze(text) {
    const tokens = this.tokenize(text);
    const frequency = this.calculateFrequency(tokens);
    const topWords = this.getTopWords(frequency, 100);
    const ttr = this.calculateTTR(tokens);

    return {
      totalTokens: tokens.length,
      uniqueTokens: new Set(tokens).size,
      topWords: topWords.slice(0, 50).map(item => item.word),
      vocabularyRichness: ttr,
      wordFrequency: frequency
    };
  }
}

export default VocabularyAnalyzer;
