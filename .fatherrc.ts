import { IBundleOptions } from 'father-build/src/types';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';

const findPath = moduleName => {
  // console.log(process.env.NODE_ENV, process.env.UMI_ENV);
  // console.log(require.resolve(moduleName));
  const pathArr = require.resolve(moduleName).split('/');
  // console.log(pathArr)
  const pathIndex = pathArr.findIndex(path => path === moduleName);
  // console.log(pathIndex);
  const path = `${pathArr.slice(pathIndex).join('/')}`;
  // console.log(path);
  return path;
};

const config: IBundleOptions = {
  esm: 'babel',
  cjs: 'babel',
  umd: {
    name: 'lean',
    globals: {
      react: 'React',
      antd: 'antd',
    },
  },
  runtimeHelpers: true,
  lessInBabelMode: true,
  extractCSS: true,
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'lib',
        style: true,
      },
      'antd',
    ],
    ['transform-remove-console', { exclude: ['error', 'warn', 'info'] }],
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@': './src',
          '@@': './src/.umi',
        },
      },
    ],
  ],
  extraRollupPlugins: [typescriptPaths({ tsConfigPath: './tsconfig.json' })],
  namedExports: {
    [`${findPath('antd')}`]: ['Divider', '_Divider', 'divider'],
  },
};
export default config;
