module.exports = [
  {
    input: "lbm_frontend/src/javascripts/lbm-frontend.js",
    output: {
      file: "package/lbm-frontend/javascripts/lbm-frontend.js",
      format: 'umd',
      name: "CJFrontend"
    },
    context: "window",
  },
];
