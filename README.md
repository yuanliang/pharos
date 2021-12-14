# PHAROS

This a simple web blog created by using React for frontend and Gin (Golang) framework for backend. This repository is created as a support for the [guide](https://yuanliang.run/golan_gin_react_esbuild_blog_1/)

一个简单的博客程序，包含注册、登陆、发帖、浏览模块。使用 `Golan` `Gin` `Typescript` `React` `Esbuild` `PostgreSQL` `bootstrap5.3` 仅供学习参考。[详细教程](https://yuanliang.run/golan_gin_react_esbuild_blog_1/)


**Go **（Golang）是谷歌开发的一种开源语言，更多信息请访问 [Go官网](https://dev.to)

**Gin** 是一个轻量级的高性能Web框架，支持现代Web应用程序所需的大叔叔基本特性和功能。更多信息、文档访问  [Gin官网](https://gin-gonic.com)

**React** 是Facebook开发的JavaScript框架。[React官网](https://reactjs.org)

**Esbuild** 是新一代的JavasScript打包工具 [Esbuild官网](https://esbuild.github.io/api/)

**Typescript** TypeScript 是一种由微软开发的自由和开源的编程语言，它是 JavaScript 的一个超集，扩展了 JavaScript 的语法。 [TypeScript官网](https://www.typescriptlang.org/)

**PostgreSQL** 是我们将用于存储数据的数据库，可以到 [PostgreSQL官网](https://www.postgresql.org)查看了解更多信息

安装使用

```bash
cd ~/go/src
mkdir pharos
cd pharos
```

如果还没有安装依赖可以  通过下面命令来下载安装它。

```bash
go mod download github.com/gin-gonic/gin
```

在编写我们的第一个后端源文件之前，我们需要在Golang所需的项目根目录中创建`go.mod` 文件，以查找和导入所需要的依赖。该文件的内容为：

```bash
module pharos

go 1.17

require github.com/gin-gonic/gin v1.7.7
```

通过如下命令来整理一下go.mod文件

```bash
go mod tidy
```

前端应用

```bash
cd app
npm install
yarn start | npm run start
```

## What is inside?

- [TypeScript](https://www.typescriptlang.org/)
- [Golang](https://go.dev/)
- [PostgreSQL](https://www.postgresql.org/)
- [esbuild](https://esbuild.github.io/)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Husky](https://github.com/typicode/husky)
- [lint-staged](https://github.com/okonet/lint-staged)
- [live-server](https://github.com/tapio/live-server)
