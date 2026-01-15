/**
 * 文本预处理器
 * 用于清理和规范化样本文本，提升风格学习质量
 */

class TextPreprocessor {
  constructor() {
    this.options = {
      removeTOC: true,           // 移除目录
      removePageNumbers: true,   // 移除页码
      normalizeChapterTitles: true, // 规范化章节标题
      normalizePunctuation: true,   // 统一标点符号
      removeExtraWhitespace: true   // 移除多余空白
    };
  }

  /**
   * 完整预处理流程
   * @param {string} text - 原始文本
   * @param {Object} options - 预处理选项
   * @returns {Object} 预处理结果
   */
  preprocess(text, options = {}) {
    const opts = { ...this.options, ...options };
    let processedText = text;
    const steps = [];

    // 1. 移除目录
    if (opts.removeTOC) {
      const before = processedText.length;
      processedText = this.removeTOC(processedText);
      const removed = before - processedText.length;
      if (removed > 0) {
        steps.push(`移除目录内容: ${removed} 字符`);
      }
    }

    // 2. 移除页码
    if (opts.removePageNumbers) {
      const before = processedText.length;
      processedText = this.removePageNumbers(processedText);
      const removed = before - processedText.length;
      if (removed > 0) {
        steps.push(`移除页码: ${removed} 字符`);
      }
    }

    // 3. 规范化章节标题
    if (opts.normalizeChapterTitles) {
      processedText = this.normalizeChapterTitles(processedText, opts.keepTitles !== false);
      steps.push('规范化章节标题');
    }

    // 4. 统一标点符号
    if (opts.normalizePunctuation) {
      processedText = this.normalizePunctuation(processedText);
      steps.push('统一标点符号为全角');
    }

    // 5. 移除多余空白
    if (opts.removeExtraWhitespace) {
      const before = processedText.length;
      processedText = this.removeExtraWhitespace(processedText);
      const removed = before - processedText.length;
      if (removed > 0) {
        steps.push(`移除多余空白: ${removed} 字符`);
      }
    }

    return {
      text: processedText,
      originalLength: text.length,
      processedLength: processedText.length,
      reduction: text.length - processedText.length,
      reductionRate: ((text.length - processedText.length) / text.length * 100).toFixed(2) + '%',
      steps
    };
  }

  /**
   * 移除目录内容
   * @param {string} text - 输入文本
   * @returns {string} 清理后的文本
   */
  removeTOC(text) {
    // 模式1: 第一章...1  第二章...5
    const pattern1 = /第[一二三四五六七八九十百千万]+章.*?\.{2,}\d+/g;

    // 模式2: Chapter 1...10  Chapter 2...25
    const pattern2 = /Chapter\s+\d+.*?\.{2,}\d+/gi;

    // 模式3: 1. 章节名...1
    const pattern3 = /^\d+\.\s+.*?\.{2,}\d+$/gm;

    // 模式4: 目录标题行
    const pattern4 = /^(目\s*录|CONTENTS|Table of Contents)\s*$/gmi;

    text = text.replace(pattern1, '');
    text = text.replace(pattern2, '');
    text = text.replace(pattern3, '');
    text = text.replace(pattern4, '');

    return text;
  }

  /**
   * 移除页码
   * @param {string} text - 输入文本
   * @returns {string} 清理后的文本
   */
  removePageNumbers(text) {
    // 模式1: 单独一行的数字
    const pattern1 = /^\s*\d+\s*$/gm;

    // 模式2: 页眉页脚格式 "- 123 -"
    const pattern2 = /^[-\s]*\d+[-\s]*$/gm;

    // 模式3: 页码格式 "第123页"
    const pattern3 = /第\s*\d+\s*页/g;

    text = text.replace(pattern1, '');
    text = text.replace(pattern2, '');
    text = text.replace(pattern3, '');

    return text;
  }

  /**
   * 规范化章节标题
   * @param {string} text - 输入文本
   * @param {boolean} keepTitles - 是否保留章节标题
   * @returns {string} 处理后的文本
   */
  normalizeChapterTitles(text, keepTitles = true) {
    if (!keepTitles) {
      // 移除所有章节标题
      const pattern = /^第[一二三四五六七八九十百千万]+章.*$/gm;
      return text.replace(pattern, '');
    } else {
      // 保留但规范化格式
      return text.replace(
        /^第([一二三四五六七八九十百千万]+)章\s*(.*)$/gm,
        '\n第$1章 $2\n'
      );
    }
  }

  /**
   * 统一标点符号（半角转全角）
   * @param {string} text - 输入文本
   * @returns {string} 处理后的文本
   */
  normalizePunctuation(text) {
    const replacements = {
      ',': '，',
      '.': '。',
      '!': '！',
      '?': '？',
      ':': '：',
      ';': '；',
      '(': '（',
      ')': '）'
    };

    Object.entries(replacements).forEach(([half, full]) => {
      // 只替换中文上下文中的半角标点
      text = text.replace(
        new RegExp(`([\\u4e00-\\u9fa5])${half.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'g'),
        `$1${full}`
      );
      // 替换标点后跟中文的情况
      text = text.replace(
        new RegExp(`${half.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([\\u4e00-\\u9fa5])`, 'g'),
        `${full}$1`
      );
    });

    return text;
  }

  /**
   * 移除多余空白
   * @param {string} text - 输入文本
   * @returns {string} 处理后的文本
   */
  removeExtraWhitespace(text) {
    // 移除行首行尾空白
    text = text.replace(/^[ \t]+|[ \t]+$/gm, '');

    // 将多个连续空行替换为单个空行
    text = text.replace(/\n{3,}/g, '\n\n');

    // 移除中文字符之间的多余空格
    text = text.replace(/([\u4e00-\u9fa5])\s+([\u4e00-\u9fa5])/g, '$1$2');

    return text.trim();
  }

  /**
   * 评估文本质量
   * @param {string} text - 输入文本
   * @returns {Object} 质量评估结果
   */
  assessQuality(text) {
    const metrics = {
      length: text.length,
      chineseRatio: this.calculateChineseRatio(text),
      punctuationRatio: this.calculatePunctuationRatio(text),
      whitespaceRatio: this.calculateWhitespaceRatio(text),
      repeatedLineRatio: this.calculateRepeatedLines(text)
    };

    let score = 100;

    // 扣分规则
    if (metrics.length < 10000) {
      score -= 30;
    } else if (metrics.length < 50000) {
      score -= 10;
    }

    if (metrics.chineseRatio < 0.7) {
      score -= 20;
    } else if (metrics.chineseRatio < 0.8) {
      score -= 10;
    }

    if (metrics.whitespaceRatio > 0.3) {
      score -= 15;
    } else if (metrics.whitespaceRatio > 0.2) {
      score -= 5;
    }

    if (metrics.repeatedLineRatio > 0.1) {
      score -= 10;
    } else if (metrics.repeatedLineRatio > 0.05) {
      score -= 5;
    }

    return {
      score: Math.max(score, 0),
      level: this.getQualityLevel(score),
      metrics,
      suggestions: this.generateSuggestions(metrics, score)
    };
  }

  /**
   * 计算中文字符占比
   */
  calculateChineseRatio(text) {
    const chineseChars = text.match(/[\u4e00-\u9fa5]/g) || [];
    return text.length > 0 ? chineseChars.length / text.length : 0;
  }

  /**
   * 计算标点符号占比
   */
  calculatePunctuationRatio(text) {
    const punctuation = text.match(/[，。！？；：、""''（）《》【】]/g) || [];
    return text.length > 0 ? punctuation.length / text.length : 0;
  }

  /**
   * 计算空白字符占比
   */
  calculateWhitespaceRatio(text) {
    const whitespace = text.match(/\s/g) || [];
    return text.length > 0 ? whitespace.length / text.length : 0;
  }

  /**
   * 计算重复行占比
   */
  calculateRepeatedLines(text) {
    const lines = text.split('\n').filter(line => line.trim().length > 0);
    const uniqueLines = new Set(lines);
    return lines.length > 0 ? 1 - (uniqueLines.size / lines.length) : 0;
  }

  /**
   * 获取质量等级
   */
  getQualityLevel(score) {
    if (score >= 90) return '优秀';
    if (score >= 75) return '良好';
    if (score >= 60) return '一般';
    if (score >= 40) return '较差';
    return '很差';
  }

  /**
   * 生成改进建议
   */
  generateSuggestions(metrics, score) {
    const suggestions = [];

    if (metrics.length < 10000) {
      suggestions.push('样本量不足，建议增加到至少 10,000 字');
    } else if (metrics.length < 50000) {
      suggestions.push('样本量偏少，建议增加到 50,000 字以上以获得更好的学习效果');
    }

    if (metrics.chineseRatio < 0.7) {
      suggestions.push('中文字符占比过低，可能包含大量非中文内容');
    }

    if (metrics.whitespaceRatio > 0.3) {
      suggestions.push('空白字符过多，建议清理多余的空格和空行');
    }

    if (metrics.repeatedLineRatio > 0.1) {
      suggestions.push('存在较多重复内容，建议检查并移除');
    }

    if (suggestions.length === 0) {
      suggestions.push('文本质量良好，可以直接用于风格学习');
    }

    return suggestions;
  }
}

export default TextPreprocessor;
