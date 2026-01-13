import fs from 'fs-extra';
import path from 'path';
import os from 'os';

/**
 * 从多个来源读取模型配置
 * 优先级：环境变量 > 用户 Claude 配置 > 项目配置 > 默认值
 */
export async function getModelConfig() {
    // 1. 优先使用环境变量
    if (process.env.NOVEL_AI_MODEL) {
        return {
            model: process.env.NOVEL_AI_MODEL,
            source: 'environment variable NOVEL_AI_MODEL'
        };
    }

    // 2. 尝试读取标准 Anthropic 环境变量
    if (process.env.ANTHROPIC_MODEL) {
        return {
            model: process.env.ANTHROPIC_MODEL,
            source: 'environment variable ANTHROPIC_MODEL'
        };
    }

    // 3. 尝试读取用户级别的 Claude 配置
    const userClaudeConfig = await readUserClaudeConfig();
    if (userClaudeConfig) {
        return {
            model: userClaudeConfig,
            source: 'user Claude settings (~/.claude/settings.json)'
        };
    }

    // 4. 尝试读取项目级别的配置
    const projectConfig = await readProjectConfig();
    if (projectConfig) {
        return {
            model: projectConfig,
            source: 'project configuration'
        };
    }

    // 5. 使用默认值
    return {
        model: 'claude-sonnet-4-5-20250929',
        source: 'default'
    };
}

/**
 * 读取用户级别的 Claude 配置
 */
async function readUserClaudeConfig() {
    try {
        const homeDir = os.homedir();
        const claudeSettingsPath = path.join(homeDir, '.claude', 'settings.json');
        
        if (await fs.pathExists(claudeSettingsPath)) {
            const settings = await fs.readJson(claudeSettingsPath);
            
            // 尝试多种可能的配置路径
            const modelPaths = [
                settings.env?.ANTHROPIC_MODEL,
                settings.env?.ANTHROPIC_DEFAULT_SONNET_MODEL,
                settings.env?.ANTHROPIC_DEFAULT_OPUS_MODEL,
                settings.model,
                settings.defaultModel
            ];

            for (const modelPath of modelPaths) {
                if (modelPath && typeof modelPath === 'string') {
                    return modelPath;
                }
            }
        }
    } catch (error) {
        // 静默失败，继续尝试其他配置源
    }
    return null;
}

/**
 * 读取项目级别的配置
 */
async function readProjectConfig() {
    try {
        // 尝试读取项目根目录的配置
        const configPaths = [
            path.join(process.cwd(), '.claude', 'settings.json'),
            path.join(process.cwd(), 'dist', 'config', 'model-config.json'),
            path.join(process.cwd(), '.specify', 'config.json')
        ];

        for (const configPath of configPaths) {
            if (await fs.pathExists(configPath)) {
                const config = await fs.readJson(configPath);
                
                // 尝试多种可能的配置字段
                const model = config.model || 
                             config.defaultModel || 
                             config.env?.ANTHROPIC_MODEL;
                
                if (model && typeof model === 'string') {
                    return model;
                }
            }
        }
    } catch (error) {
        // 静默失败
    }
    return null;
}

/**
 * 从环境变量中读取所有 Anthropic 相关配置
 */
export function getAnthropicEnvConfig() {
    return {
        apiKey: process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_AUTH_TOKEN,
        baseUrl: process.env.ANTHROPIC_BASE_URL,
        model: process.env.ANTHROPIC_MODEL,
        defaultSonnetModel: process.env.ANTHROPIC_DEFAULT_SONNET_MODEL,
        defaultOpusModel: process.env.ANTHROPIC_DEFAULT_OPUS_MODEL,
        smallFastModel: process.env.ANTHROPIC_SMALL_FAST_MODEL
    };
}

/**
 * 显示当前使用的模型配置（用于调试）
 */
export async function displayModelConfig() {
    const config = await getModelConfig();
    console.log(`Using model: ${config.model}`);
    console.log(`Source: ${config.source}`);
    
    // 显示环境变量信息（不显示敏感信息）
    const envConfig = getAnthropicEnvConfig();
    if (envConfig.baseUrl) {
        console.log(`API Base URL: ${envConfig.baseUrl}`);
    }
    if (envConfig.apiKey) {
        console.log(`API Key: ${envConfig.apiKey.substring(0, 10)}...`);
    }
}
