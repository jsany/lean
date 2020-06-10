const path = require('path');

module.exports = {
  displayName: {
    name: 'lean',
    color: 'blue',
  },
  roots: [path.resolve(__dirname, './src')],
  setupFilesAfterEnv: [path.resolve(__dirname, './setuptests.ts')],
};
