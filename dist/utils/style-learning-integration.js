/**
 * 风格学习集成示例
 * 演示如何将 NLP 分析器集成到风格学习流程
 */

import NLPAnalyzer from './nlp-analyzer.js';
import ConfidenceCalculator from './confidence-calculator.js';
import fs from 'fs';
import path from 'path';

class StyleLearningIntegration {
  constructor() {
    this.nlpAnalyzer = new NLPAnalyzer();
    this.confidenceCalculator = new ConfidenceCalculator();
  }

  /**
   * 从文件学习风格
   * @param {string} filePath - 样本文件路径
   * @param {string} styleName - 风格名称
   * @returns {Object} 风格配置
   */
  async learnStyleFromFile(filePath, styleName) {
    console.log(`\n开始学习风格: ${styleName}`);
    console.log(`样本文件: ${filePath}\n`);

    // 读取文件
    const text = fs.readFileSync(filePath, 'utf-8');
    console.log(`✓ 文件读取成功，共 ${text.length} 字符\n`);

    // NLP 分析
    const analysis = this.nlpAnalyzer.analyze(text);

    // 生成风格配置
    const styleConfig = this.generateStyleConfig(
      styleName,
      text,
      analysis
    );

    return styleConfig;
  }

  /**
   * 生成风格配置
   * @param {string} styleName - 风格名称
   * @param {string} text - 原始文本
   * @param {Object} analysis - NLP 分析结果
   * @returns {Object} 风格配置
   */
  generateStyleConfig(styleName, text, analysis) {
    const { vocabulary, syntax, sentiment } = analysis;

    // 准备样本数据
    const sampleData = {
      wordCount: text.length,
      features: {
        vocabularyRichness: vocabulary.vocabularyRichness,
        stdDeviation: syntax.stdDeviation
      }
    };

    // 准备风格配置
    const styleConfig = {
      styleName,
      analysisDate: new Date().toISOString(),
      sampleWordCount: text.length,

      vocabulary: {
        topWords: vocabulary.topWords,
        vocabularyRichness: vocabulary.vocabularyRichness,
        totalTokens: vocabulary.totalTokens,
        uniqueTokens: vocabulary.uniqueTokens
      },

      syntax: {
        avgSentenceLength: syntax.avgSentenceLength,
        lengthDistribution: syntax.lengthDistribution,
        stdDeviation: syntax.stdDeviation,
        punctuationStyle: syntax.punctuationStyle
      },

      sentiment: {
        emotionalTone: sentiment.emotionalTone,
        sentimentScore: sentiment.sentimentScore
      }
    };

    // 使用置信度计算器
    const confidenceResult = this.confidenceCalculator.calculate(
      sampleData,
      styleConfig
    );

    // 添加置信度信息
    styleConfig.confidence = confidenceResult.overall;
    styleConfig.confidenceLevel = confidenceResult.level;
    styleConfig.confidenceBreakdown = confidenceResult.breakdown;
    styleConfig.confidenceDetails = confidenceResult.details;

    return styleConfig;
  }

}

export default StyleLearningIntegration;
