# lean

> dumi babel exapple

## Introduction

- base antd
- babel
- build esm、cjs、umd
- css dynamic import
- support import assets: css、image、...
- supprot d.ts

### 方案

### support import assets && supprot d.ts

为了支持 babel 方式下，引入静态资源，并生成 d.ts 声明文件，提了 [PR](https://github.com/umijs/father/pull/220)，但 father2 目前官方没时间处理，我这里进行了 hack 处理。

注意：这里样式没有使用 cssModules，考虑到是文件到文件的编译，不会处理 css，所以使用 cssModules 后，构建产物
也是 cssModules 的形式（形如 `import Styles from 'style/index.css`），需要在使用的项目中需要配置对 node_modules/lean 下的 cssModules 处理。

通过 npm 的 `[postinstall](https://docs.npmjs.com/using-npm/scripts#npm-install)` 生命周期，对 node_modules 下的依赖进行 hack 处理：

- 在 `typings.d.ts` 文件中声明非 `js/ts` 模块：

```ts
declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.jpg';
declare module '*.gif';
```

- `package.json` 添加脚本命令：

```json
"scripts" : {

  "postinstall": "node scripts/hack-depend.js"
}
```

- 写 `scripts/hack-depend.js` 脚本：

```js
/**
 * 重写依赖模块（读取文件查找替换）
 */

const fs = require('fs');
const path = require('path');
const sep = path.posix.sep;

const hacks = [
  {
    // https://github.com/umijs/father/pull/220 ,官方没时间处理 PR，这里进行 hack 处理
    name: 'father-build',
    path: '../node_modules/father-build/lib/babel.js',
    hack: data => {
      console.log(data);
      return data
        .replace(
          `
    function getTSConfig() {`,
          `
    function getTsconfigInclude(path) {
      const config = parseTsconfig(path)
      const includesPath = config.include || []
      return includesPath
    }

    function getTSConfig() {`,
        )
        .replace(
          `
    function createStream(src) {`,
          `
    function getTSMatch() {
      const tsconfigPath = (0, _path.join)(cwd, 'tsconfig.json');
      const templateTsconfigPath = (0, _path.join)(__dirname, '../template/tsconfig.json');
      if ((0, _fs.existsSync)(tsconfigPath)) {
        return getTsconfigInclude(tsconfigPath) || [];
      }
      if (rootPath && (0, _fs.existsSync)((0, _path.join)(rootPath, 'tsconfig.json'))) {
        return getTsconfigInclude((0, _path.join)(rootPath, 'tsconfig.json')) || [];
      }
      return getTsconfigInclude(templateTsconfigPath) || [];
    }

    function createStream(src) {`,
        )
        .replace(
          `
    return /\.tsx?$/.test(path) && !path.endsWith('.d.ts');`,
          `
    const isTypings = path.endsWith('typings.d.ts');
    return isTypings || (/\.tsx?$/.test(path) && !path.endsWith('.d.ts'));`,
        )
        .replace(
          `
    (0, _path.join)(srcPath, '**/*')`,
          `
    (0, _path.join)(srcPath, '../typings.d.ts'),(0, _path.join)(srcPath, '../index.d.ts'),(0, _path.join)(srcPath, '../typings/index.d.ts'),(0, _path.join)(srcPath, '**/*'),`,
        );
    },
  },
];

const run = () => {
  for (const item of hacks) {
    const finalPath = path.resolve(__dirname, item.path.replace(/\//g, sep));
    fs.readFile(finalPath, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }
      // console.log('=====data=====')
      // console.log(data)
      // console.log('=====data=====')
      const fixed = item.hack(data);
      fixed &&
        fs.writeFile(finalPath, fixed, err => {
          if (err) {
            throw err;
          }
          console.log('hack success');
        });
    });
  }
};

run();
```

### css dynamic import

dumi 会对 pkgName/es、pkgName/lib 做 alias，[详情见](https://github.com/umijs/dumi/blob/master/packages/preset-dumi/src/plugins/core.ts#L198)

配置 `extraBabelPlugins` (注意是 `.umirc.ts` 的配置项，不是 `.fatherrc.ts`)，加入 [`babel-plugin-import`](https://github.com/ant-design/babel-plugin-import)，根据目录结构合理配置：

- 配置 .umirc.ts：

```tsx
extraBabelPlugins: [
  [
    'import',
    {
      libraryName: 'lean',
      camel2DashComponentName: false,
      customStyleName: name => {
        return `./style/index.less`; // 注意：这里 ./ 不可省略
      },
    },
    'lean',
  ],
];
```

- 在 md 中引入组件：

```tsx
import { Button } from 'lean'; // 这里会按需引入样式
```

## 发包后，在 umi 项目中使用 lean 组件库

### 配置样式按需引入

```ts
// .umirc.ts
extraBabelPlugins: [
  [
    'import',
    {
      libraryName: 'lean',
      camel2DashComponentName: false,
      customStyleName: (name: string) => {
        // console.log(name)
        return `lean/lib/${name}/style/index.css`;
      },
    },
    'lean',
  ],
];
```

### 在 tsx 中使用

```tsx
import React from 'react';
import { Foo, Button } from 'lean';

export default () => {
  return (
    <div>
      <Foo title="demo" />
      <Button btnType="primary">primary</Button>
    </div>
  );
};
```

## Getting Started

Install dependencies,

```bash
$ npm i
```

Start the dev server,

```bash
$ npm start
```

Build documentation,

```bash
$ npm run docs:build
```

Build library via `father-build`,

```bash
$ npm run build
```
