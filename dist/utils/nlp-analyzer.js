/**
 * NLP 分析器主模块
 * 整合词汇、句法、情感分析功能
 */

import VocabularyAnalyzer from './vocabulary-analyzer.js';
import SyntaxAnalyzer from './syntax-analyzer.js';
import SentimentAnalyzer from './sentiment-analyzer.js';

class NLPAnalyzer {
  constructor() {
    this.vocabularyAnalyzer = new VocabularyAnalyzer();
    this.syntaxAnalyzer = new SyntaxAnalyzer();
    this.sentimentAnalyzer = new SentimentAnalyzer();
  }

  /**
   * 完整的文本分析
   * @param {string} text - 待分析文本
   * @returns {Object} 综合分析结果
   */
  analyze(text) {
    if (!text || typeof text !== 'string') {
      throw new Error('Invalid input: text must be a non-empty string');
    }

    console.log('开始 NLP 分析...');
    console.log(`文本长度: ${text.length} 字符`);

    // 词汇分析
    console.log('正在进行词汇分析...');
    const vocabularyResult = this.vocabularyAnalyzer.analyze(text);

    // 句法分析
    console.log('正在进行句法分析...');
    const syntaxResult = this.syntaxAnalyzer.analyze(text);

    // 情感分析
    console.log('正在进行情感分析...');
    const sentimentResult = this.sentimentAnalyzer.analyze(text);

    console.log('NLP 分析完成！');

    return {
      vocabulary: vocabularyResult,
      syntax: syntaxResult,
      sentiment: sentimentResult,
      metadata: {
        textLength: text.length,
        analyzedAt: new Date().toISOString()
      }
    };
  }

  /**
   * 生成分析报告
   * @param {Object} analysisResult - 分析结果
   * @returns {string} 格式化的报告
   */
  generateReport(analysisResult) {
    const { vocabulary, syntax, sentiment } = analysisResult;

    return `
## NLP 分析报告

### 词汇层面
- 总词数: ${vocabulary.totalTokens}
- 独特词数: ${vocabulary.uniqueTokens}
- 词汇丰富度 (TTR): ${vocabulary.vocabularyRichness.toFixed(3)}
- 高频词 (前10): ${vocabulary.topWords.slice(0, 10).join(', ')}

### 句法层面
- 句子总数: ${syntax.sentenceCount}
- 平均句长: ${syntax.avgSentenceLength.toFixed(2)} 字符
- 句长标准差: ${syntax.stdDeviation.toFixed(2)}
- 短句比例: ${(syntax.lengthDistribution.short * 100).toFixed(1)}%
- 中句比例: ${(syntax.lengthDistribution.medium * 100).toFixed(1)}%
- 长句比例: ${(syntax.lengthDistribution.long * 100).toFixed(1)}%

### 情感层面
- 情感得分: ${sentiment.sentimentScore.toFixed(3)}
- 情感倾向: ${sentiment.emotionalTone}
- 正面词汇数: ${sentiment.positiveWords}
- 负面词汇数: ${sentiment.negativeWords}
`;
  }
}

export default NLPAnalyzer;
