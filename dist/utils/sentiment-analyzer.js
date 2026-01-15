/**
 * 情感分析模块
 * 提供中文文本的情感倾向分析功能
 */

class SentimentAnalyzer {
  constructor() {
    // 简化的情感词典（实际应用中应使用更完整的词典）
    this.sentimentDict = {
      positive: [
        '喜欢', '高兴', '快乐', '幸福', '美好', '优秀', '成功', '胜利',
        '欢乐', '愉快', '满意', '开心', '兴奋', '激动', '温暖', '感动',
        '希望', '光明', '美丽', '善良', '友好', '和平', '繁荣', '富强'
      ],
      negative: [
        '悲伤', '痛苦', '难过', '失望', '绝望', '恐惧', '害怕', '担心',
        '愤怒', '生气', '讨厌', '厌恶', '失败', '错误', '困难', '危险',
        '黑暗', '邪恶', '残酷', '冷漠', '孤独', '寂寞', '贫穷', '疾病'
      ]
    };
  }

  /**
   * 分词（简单实现）
   * @param {string} text - 待分词文本
   * @returns {Array<string>} 分词结果
   */
  tokenize(text) {
    // 这里使用简单的字符串分割，实际应使用专业分词器
    return text.split('').filter(char => char.trim());
  }

  /**
   * 情感评分
   * @param {string} text - 待分析文本
   * @returns {Object} 情感分析结果
   */
  analyzeSentiment(text) {
    let positiveCount = 0;
    let negativeCount = 0;
    let totalWords = 0;

    // 检查正面词汇
    this.sentimentDict.positive.forEach(word => {
      const count = (text.match(new RegExp(word, 'g')) || []).length;
      positiveCount += count;
      totalWords += count;
    });

    // 检查负面词汇
    this.sentimentDict.negative.forEach(word => {
      const count = (text.match(new RegExp(word, 'g')) || []).length;
      negativeCount += count;
      totalWords += count;
    });

    // 计算情感得分 (-1 到 +1)
    const score = totalWords > 0
      ? (positiveCount - negativeCount) / totalWords
      : 0;

    return {
      score,
      positive: positiveCount,
      negative: negativeCount,
      neutral: text.length - positiveCount - negativeCount
    };
  }

  /**
   * 完整的情感分析
   * @param {string} text - 待分析文本
   * @returns {Object} 分析结果
   */
  analyze(text) {
    const sentiment = this.analyzeSentiment(text);

    return {
      sentimentScore: sentiment.score,
      emotionalTone: this.getEmotionalTone(sentiment.score),
      positiveWords: sentiment.positive,
      negativeWords: sentiment.negative,
      neutralWords: sentiment.neutral
    };
  }

  /**
   * 获取情感倾向描述
   * @param {number} score - 情感得分
   * @returns {string} 情感描述
   */
  getEmotionalTone(score) {
    if (score > 0.3) return 'positive';
    if (score < -0.3) return 'negative';
    return 'neutral';
  }
}

export default SentimentAnalyzer;
