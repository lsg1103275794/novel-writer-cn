# Novel Writer Style CN - 产品概述

## 产品定位

Novel Writer Style CN 是一个 **AI 驱动的中文小说创作工具**，基于规格驱动开发（SDD）方法论，通过寄生斜杠命令的方式集成到多个 AI 平台中。

## 核心价值

- **系统化创作流程**：七步方法论（constitution → specify → clarify → plan → tasks → write → analyze）
- **突破性风格学习**：AI 可以学习任何作者的写作风格并进行高质量模仿创作
- **科学化文本分析**：基于真实 NLP 算法的量化分析（词汇、句法、情感三维度）
- **多平台支持**：支持 13 个 AI 工具（Claude Code、Cursor、Gemini CLI、Windsurf 等）

## 主要功能模块

### 1. 七步方法论
- `/constitution` - 建立创作原则
- `/specify` - 明确故事需求
- `/clarify` - 澄清关键决策
- `/plan` - 制定创作计划
- `/tasks` - 分解执行任务
- `/write` - 进行具体创作
- `/analyze` - 验证质量一致性

### 2. 风格学习系统（核心创新）
- `/style-analyze` - 深度分析文本风格
- `/style-learn` - 学习目标作者风格
- `/write-styled` - 风格化创作
- `/style-check` - 验证风格一致性

### 3. NLP 分析引擎（v0.22.0）
- `novel preprocess` - 智能文本预处理
- `novel analyze` - 多维度 NLP 分析
- `novel check-style` - 实时一致性检测

### 4. 插件生态系统
- style-learning - 风格学习（核心）
- authentic-voice - 真实人声
- book-analysis - 书籍分析
- translate - 翻译
- 作家风格插件（路遥、王钰、十丈余等）

## 目标用户

- **新手作者**：需要系统化创作指导
- **有经验作者**：希望提升创作效率和质量
- **风格模仿者**：想学习特定作者的写作风格
- **技术型作者**：熟悉命令行和 AI 工具

## 技术特点

- **寄生式架构**：通过斜杠命令集成到现有 AI 工具，无需独立应用
- **规格驱动**：基于 Spec Kit 方法论，结构化管理创作过程
- **插件化设计**：功能模块化，易于扩展
- **跨平台兼容**：适配多种 AI 平台的命令格式差异

## 包名说明

- **NPM 包名**：`novel-writer-style-cn`（风格学习版）
- **原始项目**：`novel-writer-cn`（基础版，无风格学习）
- **GitHub 仓库**：lsg1103275794/novel-writer-style-cn

## 版本策略

遵循语义化版本（Semantic Versioning）：
- MAJOR：不兼容的 API 修改
- MINOR：向下兼容的功能性新增
- PATCH：向下兼容的问题修正


