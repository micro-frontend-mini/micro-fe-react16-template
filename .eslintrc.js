module.exports = {
  "extends": ["airbnb", "plugin:jest/recommended"],
  "parser": "babel-eslint",
  "plugins": [
    "react",
    "jest"
  ],
  "env": {
    "browser": true,
    "node": true,
    "jest/globals": true
  },
  "globals": {
    "location": true,
    "__webpack_public_path__": true,
  },
  "rules": {
    "no-console": ["error", { "allow": ["warn", "error"] }], // 允许提交 error 和 warn 输出，不允许提交 console.log
    "react/no-danger": "off", // 因为经常有富文本显示，所以不禁用
    "max-len": ["error", 150],
  },
  'settings': {
    "import/resolver": {
      "webpack": {
        "config": "./webpack.dev.js"
      },
      alias: {
        map: [
          ['~', './src'],
        ],
      }
    },
  }
};
