/**
 * NLP 分析器测试文件
 */

import NLPAnalyzer from '../dist/utils/nlp-analyzer.js';

// 测试文本
const testText = `
这是一个测试文本。我们要测试NLP分析器的功能。
今天天气很好，阳光明媚，让人感到非常高兴和愉快。
但是有些人可能会感到悲伤和失望，因为生活中总有困难和挑战。
我们应该保持乐观的态度，勇敢面对一切问题。
`;

console.log('=== NLP 分析器测试 ===\n');

try {
  const analyzer = new NLPAnalyzer();
  const result = analyzer.analyze(testText);

  console.log('\n=== 分析结果 ===');
  console.log(JSON.stringify(result, null, 2));

  console.log('\n=== 格式化报告 ===');
  const report = analyzer.generateReport(result);
  console.log(report);

  console.log('\n✅ 测试通过！');
} catch (error) {
  console.error('\n❌ 测试失败:', error.message);
  console.error(error.stack);
}
