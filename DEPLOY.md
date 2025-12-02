# Vercel 部署指南

## 🚀 快速部署到 Vercel

### 为什么选择 Vercel？
- ✅ 完全免费
- ✅ 自动HTTPS
- ✅ 全球CDN加速
- ✅ 支持Node.js Serverless Functions
- ✅ 部署简单，只需连接GitHub
- ✅ 自动部署（每次push代码自动更新）

---

## 📝 部署步骤

### 1. 将代码推送到GitHub

```bash
# 初始化Git仓库（如果还没有）
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit"

# 在GitHub上创建新仓库，然后添加远程仓库
git remote add origin https://github.com/你的用户名/ruankao.git

# 推送到GitHub
git push -u origin main
```

### 2. 在Vercel上部署

1. **访问 Vercel**
   - 打开 https://vercel.com
   - 点击 "Sign Up" 或 "Log In"
   - 使用GitHub账号登录（推荐）

2. **导入项目**
   - 登录后，点击 "Add New..." -> "Project"
   - 在 "Import Git Repository" 中选择你的GitHub仓库
   - 点击 "Import"

3. **配置项目**
   - Vercel会自动检测项目配置
   - 确认以下设置：
     - **Framework Preset**: Other
     - **Root Directory**: `./` (默认)
     - **Build Command**: 留空（不需要构建）
     - **Output Directory**: 留空
   - 点击 "Deploy"

4. **等待部署完成**
   - 通常1-2分钟即可完成
   - 部署完成后会显示成功页面

5. **获取访问链接**
   - 部署成功后，你会得到一个链接：`https://你的项目名.vercel.app`
   - 这个链接可以分享给网友使用

---

## 🔧 项目配置说明

### 已包含的配置文件：

- **`package.json`**: Node.js项目配置
- **`vercel.json`**: Vercel路由配置
  - `/proxy` 请求会路由到 `/api/proxy.js`
  - 其他请求返回 `index.html`
- **`api/proxy.js`**: Serverless Function，处理代理请求

### 工作原理：

```
用户访问 → Vercel CDN → index.html
用户查询 → /proxy → api/proxy.js → 软考官网API
```

---

## 🔄 更新部署

每次你push代码到GitHub，Vercel会自动重新部署：

```bash
git add .
git commit -m "更新说明"
git push
```

Vercel会自动检测到更新并重新部署。

---

## 🌐 自定义域名（可选）

如果你想使用自己的域名：

1. 在Vercel项目设置中找到 "Domains"
2. 添加你的域名
3. 按照提示配置DNS记录
4. 等待DNS生效（通常几分钟）

---

## ⚠️ 注意事项

### 安全性
- 当前代码允许所有来源访问（`Access-Control-Allow-Origin: *`）
- 生产环境建议限制特定域名：
  ```javascript
  // 在 api/proxy.js 中修改
  res.setHeader('Access-Control-Allow-Origin', 'https://你的域名.com');
  ```

### Cookie处理
- 用户需要自己从浏览器F12复制Cookie
- 不会存储任何用户信息
- Cookie只在请求时使用，不会保存

### API限制
- 软考官网可能有请求频率限制
- 如果遇到429错误，建议添加重试机制

### 免费额度
- Vercel免费版有使用限制，但对于个人项目完全够用
- Serverless Functions：每月100GB小时
- 带宽：每月100GB

---

## 🐛 故障排查

### 问题：部署失败
- 检查 `package.json` 是否存在
- 检查 `vercel.json` 配置是否正确
- 查看Vercel部署日志

### 问题：代理请求失败
- 检查 `api/proxy.js` 文件是否存在
- 查看Vercel Function日志
- 确认软考官网是否可访问

### 问题：CORS错误
- 确认 `api/proxy.js` 中设置了正确的CORS头
- 检查请求路径是否为 `/proxy`

### 问题：页面无法访问
- 确认 `index.html` 在项目根目录
- 检查 `vercel.json` 路由配置

---

## 📊 查看日志

在Vercel控制台：
1. 进入你的项目
2. 点击 "Functions" 标签
3. 选择 `api/proxy.js`
4. 查看实时日志和错误信息

---

## 🎉 完成！

部署成功后，你就可以：
- ✅ 分享链接给网友使用
- ✅ 随时更新代码并自动部署
- ✅ 查看访问统计和日志
- ✅ 享受免费的HTTPS和CDN加速

祝你部署顺利！🎊
