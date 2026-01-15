/**
 * 风格学习集成测试
 */

import StyleLearningIntegration from '../dist/utils/style-learning-integration.js';
import fs from 'fs';
import path from 'path';

// 创建测试样本文件
const testSamplePath = 'test/sample-text.txt';
const testSampleContent = `
江湖风云变幻，英雄辈出。少年郎仗剑天涯，心怀侠义之志。
他行走于山川之间，见识了人间百态。有人善良，有人邪恶；有人快乐，有人悲伤。
武林中人，各有各的追求。有人追求武功至高，有人追求名利权势，也有人只求逍遥自在。
这是一个充满传奇的时代，每个人都在书写自己的故事。
剑光闪烁，刀影纵横。江湖恩怨，难以了断。但无论如何，侠义精神永存人心。
`.trim();

console.log('=== 风格学习集成测试 ===\n');

try {
  // 创建测试样本文件
  fs.writeFileSync(testSamplePath, testSampleContent, 'utf-8');
  console.log('✓ 测试样本文件已创建\n');

  // 执行风格学习
  const integration = new StyleLearningIntegration();
  const styleConfig = await integration.learnStyleFromFile(
    testSamplePath,
    '武侠风格测试'
  );

  console.log('\n=== 生成的风格配置 ===');
  console.log(JSON.stringify(styleConfig, null, 2));

  console.log('\n=== 风格特征摘要 ===');
  console.log(`风格名称: ${styleConfig.styleName}`);
  console.log(`置信度: ${(styleConfig.confidence * 100).toFixed(1)}%`);
  console.log(`词汇丰富度: ${styleConfig.vocabulary.vocabularyRichness.toFixed(3)}`);
  console.log(`平均句长: ${styleConfig.syntax.avgSentenceLength.toFixed(2)} 字符`);
  console.log(`情感倾向: ${styleConfig.sentiment.emotionalTone}`);

  console.log('\n✅ 集成测试通过！');

  // 清理测试文件
  fs.unlinkSync(testSamplePath);
  console.log('✓ 测试文件已清理');

} catch (error) {
  console.error('\n❌ 测试失败:', error.message);
  console.error(error.stack);
}
