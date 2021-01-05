import { IBundleOptions } from 'father-build/src/types';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';

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
};
export default config;
