# 技能梳理总结

> 更新时间: 2025-03-23
> 
> 本文档总结了 OpenClaw 当前可用的所有技能，按功能领域分类，并标注了使用场景和优先级。

## 📋 目录

- [飞书生态](#飞书生态)
- [编码开发](#编码开发)
- [云服务与存储](#云服务与存储)
- [搜索与信息获取](#搜索与信息获取)
- [文档处理](#文档处理)
- [工具与实用程序](#工具与实用程序)
- [技能管理](#技能管理)

---

## 飞书生态

### feishu-doc (飞书文档操作)
**路径**: `~/.local/share/pnpm/global/5/.pnpm/openclaw@*/extensions/feishu/skills/feishu-doc/SKILL.md`

**功能**: 
- 读取/写入飞书文档 (支持 Markdown)
- 创建新文档
- 表格操作 (创建、写入单元格)
- 图片上传 (URL或本地文件)
- 文件附件上传

**使用场景**: 
- 用户提到飞书文档、云文档、docx链接时自动激活
- 需要创建或编辑飞书文档时

**关键要点**:
- Token提取: `https://xxx.feishu.cn/docx/ABC123def` → `doc_token = ABC123def`
- 写入文档会替换全部内容，支持标题、列表、代码块、引用、链接等
- 表格创建不适用Markdown表格，需要专用工具

---

### feishu-drive (飞书云存储)
**路径**: `~/.local/share/pnpm/global/5/.pnpm/openclaw@*/extensions/feishu/skills/feishu-drive/SKILL.md`

**功能**:
- 列出文件夹内容
- 获取文件信息
- 创建文件夹
- 移动文件
- 删除文件

**使用场景**:
- 用户提到云空间、文件夹、drive时激活

**关键要点**:
- Token提取: `https://xxx.feishu.cn/drive/folder/ABC123` → `folder_token = ABC123`
- Bot没有根文件夹概念，只能访问已分享给它的文件/文件夹
- 文件类型: doc, docx, sheet, bitable, folder, file, mindnote, shortcut

---

### feishu-perm (飞书权限管理)
**路径**: `~/.local/share/pnpm/global/5/.pnpm/openclaw@*/extensions/feishu/skills/feishu-perm/SKILL.md`

**功能**:
- 列出协作者
- 添加协作者 (支持email、openid、userid等)
- 移除协作者
- 权限级别: view、edit、full_access

**使用场景**:
- 用户提到分享、权限、协作者时激活
- ⚠️ 此技能默认禁用，需要显式启用

---

### feishu-wiki (飞书知识库)
**路径**: `~/.local/share/pnpm/global/5/.pnpm/openclaw@*/extensions/feishu/skills/feishu-wiki/SKILL.md`

**功能**:
- 列出知识空间
- 列出节点
- 获取节点详情
- 创建节点 (支持docx、sheet、bitable等)
- 移动节点
- 重命名节点

**使用场景**:
- 用户提到知识库、wiki、wiki链接时激活

**关键要点**:
- Token提取: `https://xxx.feishu.cn/wiki/ABC123def` → `token = ABC123def`
- Wiki页面是文档，需配合 feishu_doc 工具进行内容读写
- 工作流: feishu_wiki获取node → feishu_doc读写内容

---

## 编码开发

### coding-agent (编码代理)
**路径**: `~/.local/share/pnpm/global/5/.pnpm/openclaw@*/skills/coding-agent/SKILL.md`

**功能**:
- 委托编码任务给 Codex、Claude Code、或 Pi 代理
- 后台进程管理
- 支持并行PR评审、issue修复

**使用场景**:
- 构建新功能或应用
- 审查PR (在临时目录中)
- 重构大型代码库
- 需要文件探索的迭代编码

**关键要点**:
- **PTY模式**: Codex/Pi/OpenCode需要 pty:true；Claude Code 不需要PTY
- **工作目录**: 使用 workdir 参数限制代理范围
- **后台模式**: background=true 返回sessionId用于监控
- **⚠️ 禁止**: 不能在 ~/.openclaw/ 目录中启动Codex

---

### Codex (Codex专用技能)
**路径**: `/root/.openclaw/workspace/skills/codex/SKILL.md`

**功能**:
- 仓库感知编码
- 审批模式和沙盒选择
- MCP边界和云端工作流
- 审查就绪的交接工作流

**使用场景**:
- 用户需要使用Codex作为真实编码代理而非通用聊天助手时
- 需要检查仓库、进行有界编辑、运行审查模式

**核心规则**:
1. 在Codex行动前预检任务 (锁定5个事实)
2. 显式选择操作模式 (交互式CLI/exec/review)
3. 匹配沙盒和审批到风险级别
4. 在编辑前先阅读仓库
5. 保持更改可审查和范围限定

---

### skill-creator (技能创建器)
**路径**: `~/.local/share/pnpm/global/5/.pnpm/openclaw@*/skills/skill-creator/SKILL.md`

**功能**:
- 创建新技能
- 编辑、改进、审查、审计现有技能
- 技能打包和验证

**使用场景**:
- 用户说"创建一个技能"、"编写技能"、"整理技能"、"改进技能"时

**核心原则**:
- **简洁是关键**: 上下文窗口是公共品
- **设置适当的自由度**: 根据任务脆性和可变性匹配 specificity
- **渐进式披露**: 元数据 → SKILL.md → 捆绑资源

---

## 云服务与存储

### tencent-cloud-cos (腾讯云对象存储)
**路径**: `/root/.openclaw/workspace/skills/tencent-cos-skill/SKILL.md`

**功能**:
- 文件上传/下载/管理
- 图片处理 (质量评估、超分辨率、抠图、二维码识别、水印)
- 智能图片搜索 (需预建数据集)
- 文档转PDF、视频智能封面生成

**执行策略** (按优先级降级):
1. **方式一**: cos-mcp MCP工具 (功能最全)
2. **方式二**: Node.js SDK脚本 (存储操作)
3. **方式三**: COSCMD命令行 (存储操作)

**首次使用**: 运行 `{baseDir}/scripts/setup.sh --check-only`

---

### tencentcloud-lighthouse-skill (腾讯云轻量应用服务器)
**路径**: `/root/.openclaw/workspace/skills/tencentcloud-lighthouse-skill/SKILL.md`

**功能**:
- 实例管理 (查询、启动)
- 监控与告警 (多指标监控数据、告警策略、服务器自检)
- 防火墙规则管理
- 远程命令执行 (TAT)

**首次使用**: 运行 `{baseDir}/scripts/setup.sh --check-only`

**调用格式**:
```bash
mcporter call lighthouse.<tool_name> --config ~/.mcporter/mcporter.json --output json --args '<JSON>'
```

**注意**: 除 `describe_regions` 外，所有操作都**必须**传入 `Region` 参数

---

## 搜索与信息获取

### tavily (AI优化搜索)
**路径**: `/root/.openclaw/workspace/skills/tavily-search/SKILL.md`

**功能**:
- AI优化的网页搜索
- 从URL提取内容

**使用场景**:
- 需要搜索网络获取最新信息时
- 需要提取网页内容时

**关键要点**:
- 需要 `TAVILY_API_KEY` 环境变量
- 支持参数: `-n <count>` (结果数量), `--deep` (深度搜索), `--topic news` (新闻主题)

---

### web_search / web_fetch (内置搜索工具)
**功能**:
- `web_search`: 使用Brave Search API搜索网络
- `web_fetch`: 获取并提取网页可读内容 (HTML → markdown/text)

**使用场景**:
- 需要快速搜索时优先使用内置工具
- 需要提取网页正文时使用 web_fetch

---

## 文档处理

### tencent-docs (腾讯文档)
**路径**: `/root/.openclaw/workspace/skills/tencent-docs/SKILL.md`

**支持的文档类型**:
- **智能文档** (smartcanvas) ⭐⭐⭐ 首选
- Excel (excel) ⭐⭐⭐
- 幻灯片 (slide) ⭐⭐⭐
- 思维导图 (mind) ⭐⭐⭐
- 流程图 (flowchart) ⭐⭐⭐
- 智能表格 (smartsheet) ⭐⭐⭐
- Word (word) ⭐⭐
- 收集表 (form) ⭐⭐
- 白板 (board) ⭐⭐

**功能**:
- 创建各类在线文档
- 查询、搜索文档空间与文件
- 管理空间节点、文件夹结构
- 读取文档内容
- 编辑操作智能表和智能文档

**首次使用**: 运行 `bash setup.sh` 完成MCP服务注册

**调用格式**:
```bash
mcporter call "tencent-docs" "<tool_name>" --args '<JSON>'
```

---

### summarize (内容摘要)
**路径**: `/root/.openclaw/workspace/skills/summarize/SKILL.md`

**功能**:
- 使用 summarize CLI 摘要URL或本地文件
- 支持网页、PDF、图片、音频、YouTube

**使用场景**:
- 需要摘要长内容时

**关键要点**:
- 需要配置API密钥 (OpenAI/Anthropic/xAI/Google)
- 默认模型: `google/gemini-3-flash-preview`

---

### obsidian (Obsidian知识库)
**路径**: `/root/.openclaw/workspace/skills/obsidian/SKILL.md`

**功能**:
- 搜索笔记 (按名称或内容)
- 创建/移动/重命名/删除笔记
- 自动更新wikilinks

**使用场景**:
- 用户需要操作Obsidian vault时

**关键要点**:
- Obsidian vault = 普通磁盘文件夹
- Vault配置源: `~/Library/Application Support/obsidian/obsidian.json`
- 使用 `obsidian-cli` 工具

---

## 工具与实用程序

### github (GitHub CLI)
**路径**: `/root/.openclaw/workspace/skills/github/SKILL.md`

**功能**:
- 使用 `gh` CLI 与GitHub交互
- 查看PR、CI运行
- 高级API查询

**常用命令**:
- `gh pr checks <number>` - 查看CI状态
- `gh run list --limit 10` - 列出workflow运行
- `gh issue list --json number,title` - 结构化输出

---

### healthcheck (主机安全加固)
**路径**: `~/.local/share/pnpm/global/5/.pnpm/openclaw@*/skills/healthcheck/SKILL.md`

**功能**:
- 主机安全审计和加固
- 风险容忍度配置
- OpenClaw版本检查
- 定期检查调度

**使用场景**:
- 用户要求安全审计、防火墙/SSH/更新加固时

**核心规则**:
- 状态变更前需要明确批准
- 不修改远程访问设置前先确认用户连接方式
- 优先可逆、分阶段更改

---

### tmux (Tmux会话控制)
**路径**: `~/.local/share/pnpm/global/5/.pnpm/openclaw@*/skills/tmux/SKILL.md`

**功能**:
- 通过发送击键和抓取输出来远程控制tmux会话
- 管理Claude/Codex会话

**使用场景**:
- 监控tmux中的Claude/Codex会话
- 向交互式终端应用发送输入
- 从tmux中的长时间运行进程抓取输出

**常用命令**:
- `tmux list-sessions` - 列出会话
- `tmux capture-pane -t <session> -p` - 抓取输出
- `tmux send-keys -t <session> "command" Enter` - 发送命令

---

### video-frames (视频帧提取)
**路径**: `~/.local/share/pnpm/global/5/.pnpm/openclaw@*/skills/video-frames/SKILL.md`

**功能**:
- 使用ffmpeg从视频中提取帧或短片段

**使用场景**:
- 需要从视频中提取单帧画面时

---

### weather (天气查询)
**路径**: `/root/.openclaw/workspace/skills/weather/SKILL.md`

**功能**:
- 使用 wttr.in 或 Open-Meteo 获取当前天气和预报
- 无需API密钥

**常用命令**:
- `curl -s "wttr.in/London?format=3"` - 紧凑格式
- `curl -s "wttr.in/London?T"` - 完整预报

---

### Agent Browser (浏览器自动化)
**路径**: `/root/.openclaw/workspace/skills/agent-browser/SKILL.md`

**功能**:
- 基于Rust的无头浏览器自动化CLI
- 导航、点击、输入、快照页面

**使用场景**:
- 自动化Web交互
- 从页面提取结构化数据
- 填写表单
- 测试Web UI

**核心工作流**:
1. `agent-browser open <url>` - 导航
2. `agent-browser snapshot -i` - 获取交互元素
3. 使用refs进行交互 (click @e1, fill @e2 "text")
4. 重大DOM更改后重新快照

---

### openai-whisper (语音转文字)
**路径**: `/root/.openclaw/workspace/skills/openai-whisper/SKILL.md`

**功能**:
- 使用Whisper CLI本地转录音频

**使用场景**:
- 需要转录音频文件时

**常用命令**:
```bash
whisper /path/audio.mp3 --model medium --output_format txt --output_dir .
```

---

## 技能管理

### clawhub (ClawHub CLI)
**路径**: `~/.local/share/pnpm/global/5/.pnpm/openclaw@*/skills/clawhub/SKILL.md`

**功能**:
- 搜索、安装、更新、发布技能

**常用命令**:
- `clawhub search "query"` - 搜索技能
- `clawhub install <skill>` - 安装技能
- `clawhub update --all` - 更新所有技能
- `clawhub list` - 列出已安装技能

---

### find-skills (技能发现)
**路径**: `/root/.openclaw/workspace/skills/find-skills/SKILL.md`

**功能**:
- 技能发现和安装的最高优先级流程

**优先级规则** (强制):
1. **skillhub** (针对中国用户优化) - 首选
2. **clawhub** - 后备

**工作流**:
1. 理解用户需求 (领域、具体任务)
2. 搜索技能 (skillhub search → clawhub search)
3. 呈现选项给用户
4. 提供安装帮助

---

### skillhub-preference (Skillhub偏好)
**路径**: `/root/.openclaw/workspace/skills/skillhub-preference/SKILL.md`

**策略**:
1. 优先使用 `skillhub` 进行搜索/安装/更新
2. 如果不可用，回退到 `clawhub`
3. 安装前总结源、版本和风险信号

---

## 🎯 使用优先级建议

### 优先级1: 自动触发 (无需用户明确要求)

这些技能会根据关键词自动激活:
- **feishu-doc**: 提到飞书文档、云文档、docx链接
- **feishu-drive**: 提到云空间、文件夹、drive
- **feishu-wiki**: 提到知识库、wiki
- **tencent-docs**: 需要操作腾讯文档时
- **tencent-cloud-cos**: 需要上传/下载云存储文件或图片处理时
- **tencentcloud-lighthouse-skill**: 用户询问Lighthouse或轻量应用服务器时
- **find-skills**: 用户问"技能"、"找技能"、"find-skill"、"install skill"

### 优先级2: 编码任务

- **coding-agent**: 复杂编码任务 (构建新功能、重构大型代码库)
- **Codex**: 需要仓库感知、审查模式的编码任务

### 优先级3: 信息获取

- **tavily**: AI优化搜索 (需要配置API密钥)
- **web_search**: 快速网页搜索 (内置工具)

### 优先级4: 文档处理

- **tencent-docs**: 创建在线文档 (优先使用smartcanvas)
- **summarize**: 摘要长内容
- **obsidian**: 操作Obsidian知识库

### 优先级5: 系统运维

- **healthcheck**: 安全审计和加固
- **github**: GitHub操作
- **tmux**: 管理tmux会话

---

## 📝 笔记

- 所有技能的SKILL.md文件都包含详细的参数说明和示例
- 使用技能时，优先查看其SKILL.md文件了解具体用法
- 某些技能需要额外的配置 (如API密钥、工具安装)，首次使用时会提示
- 技能之间可以组合使用，例如: coding-agent + github (PR审查) 或 tencent-docs + tencent-cloud-cos (文档云存储)

---

## 🔄 更新记录

- **2025-03-23**: 初始版本，整理了所有可用技能
