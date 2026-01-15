/**
 * NLP 分析器性能测试
 */

import NLPAnalyzer from '../dist/utils/nlp-analyzer.js';

console.log('=== NLP 分析器性能测试 ===\n');

// 生成不同长度的测试文本
function generateTestText(length) {
  const baseText = '这是一个测试句子，用于验证NLP分析器的性能。';
  let text = '';
  while (text.length < length) {
    text += baseText;
  }
  return text.substring(0, length);
}

const analyzer = new NLPAnalyzer();

// 测试不同文本长度
const testCases = [
  { name: '小文本', length: 1000 },
  { name: '中文本', length: 5000 },
  { name: '大文本', length: 10000 }
];

console.log('开始性能测试...\n');

testCases.forEach(testCase => {
  const text = generateTestText(testCase.length);

  console.log(`测试: ${testCase.name} (${testCase.length} 字符)`);

  const startTime = Date.now();
  const result = analyzer.analyze(text);
  const endTime = Date.now();

  const duration = endTime - startTime;

  console.log(`✓ 分析完成`);
  console.log(`  - 耗时: ${duration}ms`);
  console.log(`  - 词数: ${result.vocabulary.totalTokens}`);
  console.log(`  - 句数: ${result.syntax.sentenceCount}`);
  console.log('');
});

console.log('✅ 性能测试完成！');
