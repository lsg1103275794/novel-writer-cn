/**
 * 文本预处理器测试
 */

import TextPreprocessor from '../dist/utils/text-preprocessor.js';

console.log('=== 文本预处理器测试 ===\n');

const preprocessor = new TextPreprocessor();

// 测试1: 移除目录
console.log('【测试1】移除目录');
const textWithTOC = `
目录
第一章 开始...1
第二章 冒险...15
Chapter 3...30

江湖风云变幻，英雄辈出。少年郎仗剑天涯，心怀侠义之志。
`;

const result1 = preprocessor.removeTOC(textWithTOC);
console.log('原文包含目录:', textWithTOC.includes('...1'));
console.log('处理后移除目录:', !result1.includes('...1'));
console.log(result1.includes('江湖风云') ? '✓ 正文保留' : '✗ 正文丢失');
console.log('');

// 测试2: 移除页码
console.log('【测试2】移除页码');
const textWithPages = `
江湖风云变幻，英雄辈出。

123

少年郎仗剑天涯，心怀侠义之志。

- 456 -

武林中人，有人追求武功至高。
第789页
这是最后一段文字。
`;

const result2 = preprocessor.removePageNumbers(textWithPages);
console.log('移除单独数字页码:', !result2.includes('\n123\n'));
console.log('移除页眉页脚格式:', !result2.includes('- 456 -'));
console.log('移除"第X页"格式:', !result2.includes('第789页'));
console.log(result2.includes('江湖风云') ? '✓ 正文保留' : '✗ 正文丢失');
console.log('');

// 测试3: 统一标点符号
console.log('【测试3】统一标点符号');
const textWithHalfPunc = '这是测试,句子.包含半角标点!真的吗?';
const result3 = preprocessor.normalizePunctuation(textWithHalfPunc);
console.log('原文:', textWithHalfPunc);
console.log('处理后:', result3);
console.log(result3.includes('，') && result3.includes('。') ? '✓ 标点已转全角' : '✗ 转换失败');
console.log('');

// 测试4: 移除多余空白
console.log('【测试4】移除多余空白');
const textWithSpaces = `
  江湖  风云变幻，  英雄辈出。


少年郎仗剑天涯。
`;
const result4 = preprocessor.removeExtraWhitespace(textWithSpaces);
console.log('原文长度:', textWithSpaces.length);
console.log('处理后长度:', result4.length);
console.log(result4.length < textWithSpaces.length ? '✓ 空白已清理' : '✗ 清理失败');
console.log('');

// 测试5: 完整预处理流程
console.log('【测试5】完整预处理流程');
const rawText = `
目录
第一章 开始...1
第二章 冒险...15

江湖风云变幻,英雄辈出.少年郎仗剑天涯,心怀侠义之志.

123

他行走于山川之间,见识了人间百态.善良、邪恶、快乐、悲伤.

- 456 -

武林中人,有人追求武功至高,有人追求名利权势,也有人只求逍遥自在.
第789页
这是一个充满传奇的时代,每个人都在书写自己的故事.
`;

console.log('原文长度:', rawText.length);
const preprocessResult = preprocessor.preprocess(rawText);
console.log('处理后长度:', preprocessResult.processedLength);
console.log('减少字符:', preprocessResult.reduction);
console.log('减少比例:', preprocessResult.reductionRate);
console.log('\n处理步骤:');
preprocessResult.steps.forEach(step => console.log('  -', step));
console.log('');

// 测试6: 质量评估
console.log('【测试6】质量评估');
const qualityResult = preprocessor.assessQuality(preprocessResult.text);
console.log('质量得分:', qualityResult.score);
console.log('质量等级:', qualityResult.level);
console.log('\n质量指标:');
console.log('  - 文本长度:', qualityResult.metrics.length);
console.log('  - 中文占比:', (qualityResult.metrics.chineseRatio * 100).toFixed(2) + '%');
console.log('  - 标点占比:', (qualityResult.metrics.punctuationRatio * 100).toFixed(2) + '%');
console.log('  - 空白占比:', (qualityResult.metrics.whitespaceRatio * 100).toFixed(2) + '%');
console.log('  - 重复行占比:', (qualityResult.metrics.repeatedLineRatio * 100).toFixed(2) + '%');
console.log('\n改进建议:');
qualityResult.suggestions.forEach(s => console.log('  -', s));
console.log('');

console.log('✅ 所有测试完成！');

