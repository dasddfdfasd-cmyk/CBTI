# CBTI

CBTI（Chinese Being Type Indicator）是一个移动端优先的东方人格原型测试网页，基于 React + Vite 构建。

## 本地运行

```bash
npm install
npm run dev
```

## 生产构建

```bash
npm run build
```

构建产物输出到 `dist/`。

## 一键部署

### Vercel

1. 把项目代码推到 GitHub
2. 在 Vercel 中选择 `New Project`
3. 导入这个仓库
4. 直接点击部署即可

项目已内置：

- 构建命令：`npm run build`
- 输出目录：`dist`
- 配置文件：[vercel.json](./vercel.json)

### Netlify

1. 把项目代码推到 GitHub
2. 在 Netlify 中选择 `Add new site`
3. 选择 `Import an existing project`
4. 导入这个仓库
5. 直接点击部署即可

项目已内置：

- 构建命令：`npm run build`
- 发布目录：`dist`
- 配置文件：[netlify.toml](./netlify.toml)

## 技术栈

- React 18
- Vite 5

## 项目结构

```text
src/
  components/        通用 UI 组件
  data/              CBTI 题库、判型配置、评分逻辑
  pages/             首页、测试页、结果页、原型页
  AppMain.jsx        当前应用入口
  main.jsx           渲染入口
  styles.css         全局样式
public/
  favicon.svg
```
