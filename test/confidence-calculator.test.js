/**
 * 置信度计算器测试文件
 */

import ConfidenceCalculator from '../dist/utils/confidence-calculator.js';

console.log('=== 置信度计算器测试 ===\n');

const calculator = new ConfidenceCalculator();

// 测试数据
const testCases = [
  {
    name: '小样本测试',
    sampleData: {
      wordCount: 5000,
      features: {
        vocabularyRichness: 0.75,
        stdDeviation: 8.5
      }
    },
    styleConfig: {
      vocabulary: {
        topWords: ['测试', '样本'],
        vocabularyRichness: 0.75
      },
      syntax: {
        avgSentenceLength: 15.2,
        lengthDistribution: { short: 0.3, medium: 0.5, long: 0.2 }
      },
      sentiment: {
        emotionalTone: 'neutral'
      }
    }
  },
  {
    name: '大样本测试',
    sampleData: {
      wordCount: 80000,
      features: {
        vocabularyRichness: 0.85,
        stdDeviation: 6.2
      }
    },
    styleConfig: {
      vocabulary: {
        topWords: ['江湖', '侠义', '武功'],
        vocabularyRichness: 0.85
      },
      syntax: {
        avgSentenceLength: 19.2,
        lengthDistribution: { short: 0.2, medium: 0.6, long: 0.2 }
      },
      sentiment: {
        emotionalTone: 'positive'
      }
    }
  }
];

testCases.forEach(testCase => {
  console.log(`\n测试: ${testCase.name}`);
  console.log('='.repeat(50));

  const result = calculator.calculate(
    testCase.sampleData,
    testCase.styleConfig
  );

  console.log(`\n综合置信度: ${(result.overall * 100).toFixed(1)}% (${result.level})`);
  console.log('\n详细评分:');
  console.log(`  样本量充足度: ${(result.breakdown.S * 100).toFixed(1)}%`);
  console.log(`  特征一致性: ${(result.breakdown.C * 100).toFixed(1)}%`);
  console.log(`  风格独特性: ${(result.breakdown.U * 100).toFixed(1)}%`);
  console.log(`  数据完整性: ${(result.breakdown.D * 100).toFixed(1)}%`);

  console.log('\n详细说明:');
  console.log(`  - ${result.details.sampleSize}`);
  console.log(`  - ${result.details.consistency}`);
  console.log(`  - ${result.details.uniqueness}`);
  console.log(`  - ${result.details.completeness}`);
});

console.log('\n✅ 测试完成！');
