const fs = require('fs')
let scripts = {}

function readJsonFile (filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

let configPaths = require('./default.paths.json')
const optionalConfigPath = 'lbm-frontend.config.json'

if (fs.existsSync(optionalConfigPath)) {
  configPaths = {
    ...configPaths,
    ...readJsonFile(optionalConfigPath)
  }
}

scripts.stylesheets = {
  compile: `npx sass ${configPaths.scssPath}:${configPaths.stylesheetsOutputPath} --load-path ${configPaths.colmjudeFrontendPath}`,
  postprocess: `npx postcss '${configPaths.stylesheetsOutputPath}/**/*.css' --base ${configPaths.stylesheetsOutputPath} --dir ${configPaths.stylesheetsOutputPath}/ --no-map --use autoprefixer --verbose`
}

scripts.build = {
  stylesheets: "npm run nps stylesheets.compile && npm run nps stylesheets.postprocess",
  javascripts: `npx rollup --config ${configPaths.rollupConfig}`
}


scripts.watch = {
  assets: `npx chokidar ${configPaths.watchPaths} -c "npm run nps build.javascripts && npm run nps build.stylesheets"`,
  stylesheets: `npx chokidar ${configPaths.watchPaths} -c "npm run nps build.stylesheets"`,
}

module.exports = { scripts }
