/**
 * 置信度计算器模块
 * 提供科学的置信度评估功能
 */

import * as math from 'mathjs';

class ConfidenceCalculator {
  constructor() {
    // 权重配置
    this.weights = {
      sampleSize: 0.3,      // 样本量充足度
      consistency: 0.4,     // 特征一致性
      uniqueness: 0.2,      // 风格独特性
      completeness: 0.1     // 数据完整性
    };
  }

  /**
   * 计算综合置信度
   * @param {Object} sampleData - 样本数据
   * @param {Object} styleConfig - 风格配置
   * @param {Array} referenceStyles - 参考风格列表
   * @returns {Object} 置信度结果
   */
  calculate(sampleData, styleConfig, referenceStyles = []) {
    const S = this.calculateSampleSize(sampleData.wordCount);
    const C = this.calculateConsistency(sampleData.features);
    const U = this.calculateUniqueness(styleConfig, referenceStyles);
    const D = this.calculateCompleteness(styleConfig);

    const overall =
      this.weights.sampleSize * S +
      this.weights.consistency * C +
      this.weights.uniqueness * U +
      this.weights.completeness * D;

    return {
      overall: Math.min(Math.max(overall, 0), 1),
      breakdown: { S, C, U, D },
      level: this.getConfidenceLevel(overall),
      details: this.generateDetails(S, C, U, D)
    };
  }

  /**
   * 计算样本量充足度
   * @param {number} wordCount - 字数
   * @returns {number} 充足度得分 (0-1)
   */
  calculateSampleSize(wordCount) {
    const minWords = 10000;
    const optimalWords = 50000;

    if (wordCount < minWords) {
      return wordCount / minWords * 0.5;
    } else if (wordCount < optimalWords) {
      return 0.5 + (wordCount - minWords) / (optimalWords - minWords) * 0.3;
    } else {
      return Math.min(0.8 + (wordCount - optimalWords) / 100000 * 0.2, 1.0);
    }
  }

  /**
   * 获取置信度等级
   * @param {number} score - 置信度得分
   * @returns {string} 等级描述
   */
  getConfidenceLevel(score) {
    if (score >= 0.8) return '优秀';
    if (score >= 0.6) return '良好';
    if (score >= 0.4) return '一般';
    return '较低';
  }

  /**
   * 生成详细说明
   * @param {number} S - 样本量得分
   * @param {number} C - 一致性得分
   * @param {number} U - 独特性得分
   * @param {number} D - 完整性得分
   * @returns {Object} 详细说明
   */
  generateDetails(S, C, U, D) {
    return {
      sampleSize: this.getSampleSizeDescription(S),
      consistency: this.getConsistencyDescription(C),
      uniqueness: this.getUniquenessDescription(U),
      completeness: this.getCompletenessDescription(D)
    };
  }

  getSampleSizeDescription(score) {
    if (score >= 0.8) return '样本量充足，超过推荐标准';
    if (score >= 0.5) return '样本量良好，达到最低要求';
    return '样本量不足，建议增加样本';
  }

  getConsistencyDescription(score) {
    if (score >= 0.8) return '特征高度一致，风格稳定';
    if (score >= 0.6) return '特征基本一致，风格较稳定';
    return '特征一致性较低，风格不够稳定';
  }

  getUniquenessDescription(score) {
    if (score >= 0.7) return '风格高度独特，特征明显';
    if (score >= 0.4) return '风格有一定独特性';
    return '风格与已有风格相似度较高';
  }

  getCompletenessDescription(score) {
    if (score >= 0.9) return '数据完整，覆盖所有关键维度';
    if (score >= 0.7) return '数据基本完整';
    return '数据不完整，部分维度缺失';
  }

  /**
   * 计算特征一致性
   * @param {Object} features - 特征数据
   * @returns {number} 一致性得分 (0-1)
   */
  calculateConsistency(features) {
    if (!features || typeof features !== 'object') {
      return 0.5; // 默认中等一致性
    }

    // 计算词汇丰富度的稳定性（越接近0.5-0.9越好）
    const vocabScore = features.vocabularyRichness
      ? Math.min(features.vocabularyRichness / 0.9, 1.0)
      : 0.5;

    // 句法一致性（标准差越小越好）
    const syntaxScore = features.stdDeviation
      ? Math.max(0, 1 - features.stdDeviation / 20)
      : 0.5;

    // 综合一致性得分
    return (vocabScore + syntaxScore) / 2;
  }

  /**
   * 计算风格独特性
   * @param {Object} styleConfig - 风格配置
   * @param {Array} referenceStyles - 参考风格列表
   * @returns {number} 独特性得分 (0-1)
   */
  calculateUniqueness(styleConfig, referenceStyles) {
    if (!referenceStyles || referenceStyles.length === 0) {
      return 0.7; // 无参考风格时，给予较高独特性
    }

    // 简化版：基于词汇丰富度的差异
    const currentRichness = styleConfig.vocabulary?.vocabularyRichness || 0.5;

    let minDistance = 1.0;
    referenceStyles.forEach(refStyle => {
      const refRichness = refStyle.vocabulary?.vocabularyRichness || 0.5;
      const distance = Math.abs(currentRichness - refRichness);
      minDistance = Math.min(minDistance, distance);
    });

    // 距离越大，独特性越高
    return Math.min(minDistance * 2, 1.0);
  }

  /**
   * 计算数据完整性
   * @param {Object} styleConfig - 风格配置
   * @returns {number} 完整性得分 (0-1)
   */
  calculateCompleteness(styleConfig) {
    const requiredFields = [
      'vocabulary.topWords',
      'vocabulary.vocabularyRichness',
      'syntax.avgSentenceLength',
      'syntax.lengthDistribution',
      'sentiment.emotionalTone'
    ];

    let completedFields = 0;
    requiredFields.forEach(field => {
      if (this.getNestedValue(styleConfig, field)) {
        completedFields++;
      }
    });

    return completedFields / requiredFields.length;
  }

  /**
   * 获取嵌套对象的值
   * @param {Object} obj - 对象
   * @param {string} path - 路径（如 'vocabulary.topWords'）
   * @returns {*} 值
   */
  getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }
}

export default ConfidenceCalculator;
