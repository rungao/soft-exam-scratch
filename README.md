# 🎯 软考成绩查询刮刮卡刺激版

> 一个有趣的软考成绩查询工具，采用刮刮卡交互方式，让查询成绩的过程更加刺激有趣！

## 📸 功能展示

<div align="center">

<img src="images/screenshot.png" alt="软考成绩查询刮刮卡刺激版" style="max-width: 90%; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">

</div>

---

## ✨ 特性

- 🎨 **刮刮卡交互**：三门成绩分别用刮刮卡展示，需要手动刮开查看
- 🎆 **烟花庆祝**：单科通过时放烟花，全部通过时持续循环播放烟花
- 💪 **鼓励提示**：未通过时显示"再接再厉"的鼓励信息
- 🚀 **简单易用**：只需复制Cookie即可查询，无需复杂配置

## 🛠️ 技术栈

- **前端**：纯 HTML + CSS + JavaScript（原生，无依赖）
- **后端**：Node.js（仅用于解决CORS跨域问题）
- **特效**：Canvas API（刮刮卡效果 + 烟花动画）

## 🚀 快速开始

1. **克隆仓库**
   ```bash
   git clone https://github.com/rungao/soft-exam-scratch.git
   cd soft-exam-scratch
   ```

2. **启动服务**
   ```bash
   node server.js
   ```

3. **访问**
   ```
   http://localhost:3000
   ```

## 📖 使用说明

1. 访问 [软考官网](https://bm.ruankao.org.cn/index.php/query/score) 并登录
2. 打开浏览器开发者工具（F12）→ Network 标签
3. 访问成绩查询页面，找到请求的 Cookie
4. 复制 Cookie 到本工具
5. 选择考试阶段，点击查询
6. 刮开涂层查看成绩

## ⚠️ 注意事项

- 确保 Cookie 未过期
- 本工具仅用于查询成绩，不存储任何个人信息
- 请遵守软考官网的使用条款

## 📄 开源协议

本项目采用 [MIT License](LICENSE) 开源协议。

---

⭐ 如果这个项目对你有帮助，欢迎 Star！
