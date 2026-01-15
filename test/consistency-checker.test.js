/**
 * 风格一致性检测器测试
 */

import ConsistencyChecker from '../dist/utils/consistency-checker.js';
import StyleLearningIntegration from '../dist/utils/style-learning-integration.js';
import fs from 'fs';

console.log('=== 风格一致性检测器测试 ===\n');

const checker = new ConsistencyChecker();
const integration = new StyleLearningIntegration();

// 准备测试数据
console.log('准备测试数据...');

// 创建目标风格样本
const targetSample = `
江湖风云变幻，英雄辈出。少年郎仗剑天涯，心怀侠义之志。
他行走于山川之间，见识了人间百态。善良、邪恶、快乐、悲伤。
武林中人，有人追求武功至高，有人追求名利权势，也有人只求逍遥自在。
这是一个充满传奇的时代，每个人都在书写自己的故事。
刀光剑影之中，恩怨情仇交织。侠客们行侠仗义，惩恶扬善。
江湖险恶，人心难测。但总有人坚守正义，守护心中的信念。
`;

console.log('✓ 目标样本准备完成\n');

// 学习目标风格
console.log('学习目标风格...');
const targetStyle = integration.generateStyleConfig('武侠风格', targetSample, integration.nlpAnalyzer.analyze(targetSample));
console.log('✓ 目标风格学习完成');
console.log(`  - 词汇丰富度: ${targetStyle.vocabulary.vocabularyRichness.toFixed(3)}`);
console.log(`  - 平均句长: ${targetStyle.syntax.avgSentenceLength.toFixed(2)} 字`);
console.log(`  - 情感倾向: ${targetStyle.sentiment.emotionalTone}\n`);

// 测试1: 高度一致的文本
console.log('【测试1】高度一致的文本');
const highMatchText = `
江湖之中，风云变幻莫测。少年侠客仗剑走天涯，心怀正义。
他游历四方，见识了世间的善恶美丑。有人追求武功，有人追求名利。
这个时代充满传奇，每个人都有自己的故事。刀光剑影，恩怨情仇。
侠客们行侠仗义，惩恶扬善，守护心中的信念。
`;

const result1 = checker.checkConsistency(highMatchText, targetStyle);
console.log('综合得分:', result1.overall.toFixed(1) + '%');
console.log('一致性等级:', result1.overallLevel);
console.log('\n各维度得分:');
console.log('  - 词汇:', result1.dimensions.vocabulary.percentage, result1.dimensions.vocabulary.level);
console.log('  - 句法:', result1.dimensions.syntax.percentage, result1.dimensions.syntax.level);
console.log('  - 情感:', result1.dimensions.sentiment.percentage, result1.dimensions.sentiment.level);
console.log('  - 节奏:', result1.dimensions.rhythm.percentage, result1.dimensions.rhythm.level);
console.log('');

// 测试2: 部分一致的文本
console.log('【测试2】部分一致的文本');
const mediumMatchText = `
现代都市里，人们忙碌奔波。年轻人追求梦想，努力工作。
他们在城市中打拼，经历着各种挑战。有人成功，有人失败。
这是一个快节奏的时代。每个人都在为生活奋斗。
`;

const result2 = checker.checkConsistency(mediumMatchText, targetStyle);
console.log('综合得分:', result2.overall.toFixed(1) + '%');
console.log('一致性等级:', result2.overallLevel);
console.log('\n各维度得分:');
console.log('  - 词汇:', result2.dimensions.vocabulary.percentage, result2.dimensions.vocabulary.level);
console.log('  - 句法:', result2.dimensions.syntax.percentage, result2.dimensions.syntax.level);
console.log('  - 情感:', result2.dimensions.sentiment.percentage, result2.dimensions.sentiment.level);
console.log('  - 节奏:', result2.dimensions.rhythm.percentage, result2.dimensions.rhythm.level);
console.log('');

// 测试3: 详细报告
console.log('【测试3】详细一致性报告');
console.log('\n=== 风格一致性检测报告 ===\n');
console.log(result1.summary);
console.log('\n详细建议:');
console.log('\n词汇层面:');
result1.dimensions.vocabulary.suggestions.forEach(s => console.log('  -', s));
console.log('\n句法层面:');
result1.dimensions.syntax.suggestions.forEach(s => console.log('  -', s));
console.log('\n情感层面:');
result1.dimensions.sentiment.suggestions.forEach(s => console.log('  -', s));
console.log('\n节奏层面:');
result1.dimensions.rhythm.suggestions.forEach(s => console.log('  -', s));
console.log('');

console.log('✅ 所有测试完成！');
