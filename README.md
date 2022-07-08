# BDSaas 3.0 改版 UI 组件库

基于 TypeScript + Vue3 + Vite 技术栈开发的 UI 组件库

## 起步

一、 安装 **pnpm**，享受闪电般的安装速度 （注：请仔细查阅这份[文档](https://pnpm.io/zh/installation#%E5%85%BC%E5%AE%B9%E6%80%A7)，避免引起不必要的与 Node.js 之间的兼容性问题，推荐直接下载 [Node.js v14.19.1](https://nodejs.org/download/release/v14.19.1/node-v14.19.1-x64.msi)，可同时兼容 bdsaas 老项目）

```sh
$ npm install -g pnpm
```

二、 安装 **commitizen** 和 **git-cz**，实现更规范、优雅的 Git 提交

```sh
$ pnpm add commitizen git-cz -g
```

三、 安装依赖

```sh
$ pnpm install
```

四、 初始化 **husky**

```sh
$ pnpm run prepare
```

五、 运行组件单元测试

```sh
$ pnpm run test
```

一个极简的组件单元测试案例，打开控制台感受 **vitest** 的极致速度！

六、 代码 Lint、格式化

```sh
# Lint 和 修复 .vue .ts 代码
$ pnpm run lint-fix:script

# 美化及修复所有代码
$ pnpm run prettier:w

# 美化及修复样式代码
$ pnpm run lint-fix:style
```

或者运行 `pnpm run lint-fix` 一键运行所有的格式化和 lint-fix。

七、 提交前的 💩 代码校验？**注：必须使用 git-commit 命令提交代码**

```sh
$ pnpm run git-commit
```

对于提交的文件进行 eslint、stylelint 校验，以及 prettier 格式化。警告不会影响提交，但是报错会中断。绝大多数的时候，Lint 工具会自动修复错误，但是部分报错需要手动修复后才能再次进行提交。

至此，准备工作已经完毕，接下来开始愉快地开发吧 😁😁

## 组件列表

- [ ] Button 组件（完成部分）
- [x] Input 组件
- [ ] Select 组件（完成了第一种）
- [ ] Dropdown 组件
- [x] Checkbox 组件
- [ ] Radio 组件
- [ ] Switch 组件
- [x] List 组件
- [ ] Tab 组件
- [ ] Pagination 组件
- [ ] Tag 组件
- [ ] Message 组件
- [ ] Notification 组件
- [ ] Tooltip 组件
- [ ] Popover 组件
- [ ] Confirm 组件
- [ ] Modal 框组件
- [ ] Drawer 组件
- [ ] DatePicker 组件
- [ ] Icon 组件
- [ ] Form 组件

组件库设计稿缺失组件：

1. 组织架构树
2. 上传组件
3. Modal 框

Powered by [vite-vue3-basic-template](https://github.com/dizuncainiao/vite-vue3-basic-template)
