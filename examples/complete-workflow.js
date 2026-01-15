/**
 * 完整的风格学习与写作流程示例
 * 演示如何使用 v0.22.0 的所有新功能
 */

import fs from 'fs';
import TextPreprocessor from '../dist/utils/text-preprocessor.js';
import NLPAnalyzer from '../dist/utils/nlp-analyzer.js';
import StyleLearningIntegration from '../dist/utils/style-learning-integration.js';
import ConsistencyChecker from '../dist/utils/consistency-checker.js';

console.log('='.repeat(60));
console.log('风格学习与写作完整流程演示');
console.log('='.repeat(60));
console.log('');

// ============================================================
// 阶段 1: 样本准备
// ============================================================
console.log('【阶段 1】样本准备');
console.log('-'.repeat(60));

const rawSample = `
目录
第一章 江湖初现...1
第二章 少年英雄...25

江湖风云变幻，英雄辈出.少年郎仗剑天涯,心怀侠义之志.

123

他行走于山川之间,见识了人间百态.善良、邪恶、快乐、悲伤.

- 456 -

武林中人,有人追求武功至高,有人追求名利权势,也有人只求逍遥自在.
第789页
这是一个充满传奇的时代,每个人都在书写自己的故事.
刀光剑影之中,恩怨情仇交织.侠客们行侠仗义,惩恶扬善.
江湖险恶,人心难测.但总有人坚守正义,守护心中的信念.
`;

console.log('✓ 原始样本准备完成');
console.log(`  文本长度: ${rawSample.length} 字符`);
console.log('');

// ============================================================
// 阶段 2: 文本预处理
// ============================================================
console.log('【阶段 2】文本预处理');
console.log('-'.repeat(60));

const preprocessor = new TextPreprocessor();

// 预处理文本
const preprocessResult = preprocessor.preprocess(rawSample);
console.log('✓ 预处理完成');
console.log(`  原文长度: ${preprocessResult.originalLength} 字符`);
console.log(`  处理后长度: ${preprocessResult.processedLength} 字符`);
console.log(`  减少比例: ${preprocessResult.reductionRate}`);
console.log('\n  处理步骤:');
preprocessResult.steps.forEach(step => console.log(`    - ${step}`));

// 质量评估
const quality = preprocessor.assessQuality(preprocessResult.text);
console.log('\n✓ 质量评估完成');
console.log(`  质量得分: ${quality.score} 分`);
console.log(`  质量等级: ${quality.level}`);
console.log('\n  改进建议:');
quality.suggestions.forEach(s => console.log(`    - ${s}`));
console.log('');

// ============================================================
// 阶段 3: NLP 分析
// ============================================================
console.log('【阶段 3】NLP 分析');
console.log('-'.repeat(60));

const analyzer = new NLPAnalyzer();
const analysis = analyzer.analyze(preprocessResult.text);

console.log('✓ NLP 分析完成');
console.log('\n  词汇分析:');
console.log(`    - 总词数: ${analysis.vocabulary.totalTokens}`);
console.log(`    - 独特词数: ${analysis.vocabulary.uniqueTokens}`);
console.log(`    - 词汇丰富度: ${analysis.vocabulary.vocabularyRichness.toFixed(3)}`);
console.log(`    - 高频词: ${analysis.vocabulary.topWords.slice(0, 5).join('、')}`);

console.log('\n  句法分析:');
console.log(`    - 平均句长: ${analysis.syntax.avgSentenceLength.toFixed(2)} 字`);
console.log(`    - 标准差: ${analysis.syntax.stdDeviation.toFixed(2)}`);

console.log('\n  情感分析:');
console.log(`    - 情感倾向: ${analysis.sentiment.emotionalTone}`);
console.log(`    - 情感得分: ${analysis.sentiment.sentimentScore}`);
console.log('');

// ============================================================
// 阶段 4: 风格学习与置信度评估
// ============================================================
console.log('【阶段 4】风格学习与置信度评估');
console.log('-'.repeat(60));

const integration = new StyleLearningIntegration();
const styleConfig = integration.generateStyleConfig(
  '武侠风格',
  preprocessResult.text,
  analysis
);

console.log('✓ 风格学习完成');
console.log(`  风格名称: ${styleConfig.styleName}`);
console.log(`  样本字数: ${styleConfig.sampleWordCount}`);

console.log('\n✓ 置信度评估完成');
console.log(`  综合置信度: ${styleConfig.confidence.toFixed(1)}%`);
console.log(`  置信度等级: ${styleConfig.confidenceLevel}`);

console.log('\n  各维度得分:');
console.log(`    - 样本量充足度 (S): ${(styleConfig.confidenceBreakdown.S * 100).toFixed(1)}%`);
console.log(`    - 特征一致性 (C): ${(styleConfig.confidenceBreakdown.C * 100).toFixed(1)}%`);
console.log(`    - 风格独特性 (U): ${(styleConfig.confidenceBreakdown.U * 100).toFixed(1)}%`);
console.log(`    - 数据完整性 (D): ${(styleConfig.confidenceBreakdown.D * 100).toFixed(1)}%`);

console.log('\n  详细说明:');
Object.entries(styleConfig.confidenceDetails).forEach(([key, value]) => {
  console.log(`    - ${value}`);
});
console.log('');

// ============================================================
// 阶段 5: 模拟创作（用户在 AI 助手中完成）
// ============================================================
console.log('【阶段 5】模拟创作');
console.log('-'.repeat(60));
console.log('（此阶段由用户在 Claude/Cursor/Gemini 等 AI 助手中完成）');
console.log('');

// 模拟用户创作的文本
const userCreation = `
江湖之中，风云变幻莫测。少年侠客仗剑走天涯，心怀正义。
他游历四方，见识了世间的善恶美丑。有人追求武功，有人追求名利。
这个时代充满传奇，每个人都有自己的故事。刀光剑影，恩怨情仇。
侠客们行侠仗义，惩恶扬善，守护心中的信念。
`;

console.log('✓ 用户创作完成');
console.log(`  创作字数: ${userCreation.length} 字符`);
console.log('');

// ============================================================
// 阶段 6: 实时一致性检测
// ============================================================
console.log('【阶段 6】实时一致性检测');
console.log('-'.repeat(60));

const checker = new ConsistencyChecker();
const consistencyResult = checker.checkConsistency(userCreation, styleConfig);

console.log('✓ 一致性检测完成\n');
console.log(consistencyResult.summary);

console.log('\n详细建议:\n');
console.log('词汇层面:');
consistencyResult.dimensions.vocabulary.suggestions.forEach(s => {
  console.log(`  - ${s}`);
});

console.log('\n句法层面:');
consistencyResult.dimensions.syntax.suggestions.forEach(s => {
  console.log(`  - ${s}`);
});

console.log('\n情感层面:');
consistencyResult.dimensions.sentiment.suggestions.forEach(s => {
  console.log(`  - ${s}`);
});

console.log('\n节奏层面:');
consistencyResult.dimensions.rhythm.suggestions.forEach(s => {
  console.log(`  - ${s}`);
});
console.log('');

// ============================================================
// 总结
// ============================================================
console.log('='.repeat(60));
console.log('流程总结');
console.log('='.repeat(60));
console.log('');

console.log('✅ 完整流程已演示完成！');
console.log('');
console.log('各阶段成果:');
console.log(`  1. 样本准备: ${rawSample.length} 字符`);
console.log(`  2. 文本预处理: 减少 ${preprocessResult.reductionRate}，质量 ${quality.level}`);
console.log(`  3. NLP 分析: 词汇丰富度 ${analysis.vocabulary.vocabularyRichness.toFixed(3)}`);
console.log(`  4. 风格学习: 置信度 ${styleConfig.confidence.toFixed(1)}% (${styleConfig.confidenceLevel})`);
console.log(`  5. 用户创作: ${userCreation.length} 字符`);
console.log(`  6. 一致性检测: ${consistencyResult.overall.toFixed(1)}% (${consistencyResult.overallLevel})`);
console.log('');
