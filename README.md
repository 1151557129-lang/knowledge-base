# 个人主页

个人知识库、职场记录、兴趣分享与个人项目展示。

## 在线访问

访问地址：`https://JohnYoung1995.github.io/repository-name/`

## 本地运行

直接用浏览器打开 `index.html` 即可，或使用本地服务器：

```bash
# Python
python -m http.server 8080

# Node.js
npx serve .
```

## 部署到 GitHub Pages

1. 创建 GitHub 仓库
2. 推送代码到仓库
3. 进入 Settings → Pages
4. Source 选择 `main` 分支，目录选 `/ (root)`
5. 保存后等待部署完成

## 目录结构

```
├── index.html              # 主页面
├── css/style.css           # 样式
├── js/
│   ├── app.js              # 应用逻辑
│   └── data/
│       ├── knowledge.js    # 知识学习数据
│       ├── weekly.js       # 职场碎碎念数据
│       ├── interests.js    # 兴趣分享数据
│       └── projects.js     # 个人项目数据
└── assets/                 # 静态资源
```

## 内容更新

编辑 `js/data/` 目录下对应的文件即可更新内容：

- **知识学习**：在 `knowledge.js` 中添加新的模块、分类或知识点
- **职场碎碎念**：在 `weekly.js` 中添加新的周报
- **兴趣分享**：在 `interests.js` 中添加文章链接
- **个人项目**：在 `projects.js` 中更新项目信息
