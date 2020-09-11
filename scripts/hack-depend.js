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
      // console.log(data)
      return data
        .replace(
          `
    function getTsconfigCompilerOptions(path) {
      const config = parseTsconfig(path);
      return config ? config.compilerOptions : undefined;
    }

    function getTSConfig() {
      const tsconfigPath = (0, _path.join)(cwd, 'tsconfig.json');
      const templateTsconfigPath = (0, _path.join)(__dirname, '../template/tsconfig.json');

      if ((0, _fs.existsSync)(tsconfigPath)) {
        return getTsconfigCompilerOptions(tsconfigPath) || {};
      }

      if (rootPath && (0, _fs.existsSync)((0, _path.join)(rootPath, 'tsconfig.json'))) {
        return getTsconfigCompilerOptions((0, _path.join)(rootPath, 'tsconfig.json')) || {};
      }

      return getTsconfigCompilerOptions(templateTsconfigPath) || {};
    }`,
          `
    function getTsconfigCompilerOptions(path) {
      const config = parseTsconfig(path);
      return config ? config.compilerOptions : undefined;
    }

    function getTsconfigInclude(path) {
      const config = parseTsconfig(path);
      const includesPath = config ? config.include || [] : [];
      return includesPath;
    }

    function getTSConfig() {
      const tsconfigPath = (0, _path.join)(cwd, 'tsconfig.json');
      const templateTsconfigPath = (0, _path.join)(__dirname, '../template/tsconfig.json');

      if ((0, _fs.existsSync)(tsconfigPath)) {
        return getTsconfigCompilerOptions(tsconfigPath) || {};
      }

      if (rootPath && (0, _fs.existsSync)((0, _path.join)(rootPath, 'tsconfig.json'))) {
        return getTsconfigCompilerOptions((0, _path.join)(rootPath, 'tsconfig.json')) || {};
      }

      return getTsconfigCompilerOptions(templateTsconfigPath) || {};
    }

    function getTSMatch() {
      const tsconfigPath = join(cwd, 'tsconfig.json');
      const templateTsconfigPath = join(__dirname, '../template/tsconfig.json');
      if (existsSync(tsconfigPath)) {
        return getTsconfigInclude(tsconfigPath) || [];
      }
      if (rootPath && existsSync(join(rootPath, 'tsconfig.json'))) {
        return getTsconfigInclude(join(rootPath, 'tsconfig.json')) || [];
      }
      return getTsconfigInclude(templateTsconfigPath) || [];
    }`,
        )
        .replace(
          `&& !path.endsWith('.d.ts');`,
          `&& (path.endsWith('typings.d.ts') || path.endsWith('index.d.ts') || !path.endsWith('.d.ts'));`,
        )
        .replace(
          `[(0, _path.join)(srcPath, '**/*'),`,
          `[(0, _path.join)(srcPath, '../typings.d.ts'),(0, _path.join)(srcPath, '../index.d.ts'),(0, _path.join)(srcPath, '../typings/index.d.ts'),(0, _path.join)(srcPath, '**/*'),`,
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
      // console.log(data.indexOf(`&& !path.endsWith('.d.ts');`))
      // console.log(typeof data)
      // console.log(String(data))
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
