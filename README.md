# 🎯 软考成绩查询刮刮卡刺激版

一个有趣的软考成绩查询工具，采用刮刮卡交互方式，让查询成绩的过程更加刺激有趣！

## ✨ 特性

- 🎨 **刮刮卡交互**：三门成绩分别用刮刮卡展示，需要手动刮开查看
- 🎆 **烟花庆祝**：单科通过时放烟花，全部通过时持续循环播放烟花
- 💪 **鼓励提示**：未通过时显示"再接再厉"的鼓励信息
- 🎯 **左右分栏布局**：左侧查询，右侧显示，界面清晰
- 🚀 **简单易用**：只需复制Cookie即可查询，无需复杂配置

## 🛠️ 技术栈

- **前端**：纯 HTML + CSS + JavaScript（原生，无依赖）
- **后端**：Node.js（仅用于解决CORS跨域问题）
- **特效**：Canvas API（刮刮卡效果 + 烟花动画）

## 📦 安装

1. **克隆仓库**
   ```bash
   git clone https://github.com/rungao/soft-exam-scratch.git
   cd soft-exam-scratch
   ```

2. **确保已安装 Node.js**
   ```bash
   node --version
   ```

## 🚀 使用方法

### 方法一：使用本地代理服务器（推荐）

1. **启动代理服务器**
   ```bash
   node server.js
   ```

2. **打开浏览器访问**
   ```
   http://localhost:3000
   ```

3. **查询成绩**
   - 点击 [软考官网登录链接](https://bm.ruankao.org.cn/index.php/query/score) 登录
   - 打开Chrome浏览器 → 右上角三个点 → 更多工具 → 开发者工具
   - 登录后在开发者工具中点击"Network"（网络）标签
   - 访问 `https://bm.ruankao.org.cn/index.php/query/score` 接口
   - 找到该请求，点击查看详情
   - 在"Request Headers"（请求头）中找到"Cookie"，复制完整内容
   - 粘贴到查询页面
   - 选择考试阶段（支持2009年至今）
   - 点击查询按钮
   - 刮开涂层查看成绩

### 方法二：直接打开HTML文件（需要浏览器扩展）

如果不想运行服务器，可以：
1. 安装浏览器CORS扩展（如 "CORS Unblock" 或 "Allow CORS"）
2. 启用扩展后直接打开 `index.html` 文件

## 📁 项目结构

```
soft-exam-scratch/
├── index.html          # 主页面（包含查询界面和刮刮卡效果）
├── server.js           # 本地代理服务器（解决CORS问题）
├── README.md           # 项目说明文档
├── LICENSE             # 开源协议
└── .gitignore          # Git忽略文件
```

## ⚙️ 配置说明

- **代理服务器端口**：默认 3000 端口，如需修改请编辑 `server.js`
- **考试阶段**：自动生成从2009年至今的上半年/下半年选项

## ⚠️ 注意事项

- **如何获取Cookie**：
  1. 打开Chrome浏览器 → 右上角三个点 → 更多工具 → 开发者工具
  2. 登录软考官网后，在开发者工具中点击"Network"（网络）标签
  3. 访问 `https://bm.ruankao.org.cn/index.php/query/score` 接口
  4. 找到该请求，点击查看详情
  5. 在"Request Headers"（请求头）中找到"Cookie"，复制完整内容
- 确保Cookie未过期
- 本工具仅用于查询成绩，不存储任何个人信息
- 请遵守软考官网的使用条款
- [快捷登录链接](https://bm.ruankao.org.cn/index.php/query/score)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 开源协议

本项目采用 [MIT License](LICENSE) 开源协议。

## 🙏 致谢

- 感谢软考官网提供成绩查询接口
- 感谢所有使用和反馈的用户

## 📝 更新日志

### v1.0.0
- ✨ 初始版本发布
- 🎨 实现刮刮卡交互效果
- 🎆 添加烟花庆祝动画
- 📱 左右分栏布局设计

---

⭐ 如果这个项目对你有帮助，欢迎 Star！
