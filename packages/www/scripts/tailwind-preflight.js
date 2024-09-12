const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

// * constants
const cssPath = path.join(__dirname, '..', 'src', 'css');
const nodeModulesPath = path.join(__dirname, '..', 'node_modules');

const getPreflightFromNodeModules = () => {
  if (!fs.existsSync(nodeModulesPath)) {
    console.log(chalk.redBright('node_modules was not found'));
    console.log(chalk.yellowBright("make sure to run 'npm install' beforehand"));
    return;
  }

  const tailwindCSSPath = path.join(nodeModulesPath, 'tailwindcss');

  if (!fs.existsSync(tailwindCSSPath)) {
    console.log(chalk.redBright('make sure that tailwind css is installed'));
    console.log(chalk.yellowBright("run 'npm i -D tailwindcss' to install it"));
    return;
  }

  const tailwindBaseStylesPath = path.join(tailwindCSSPath, 'src', 'css', 'preflight.css');

  if (!fs.existsSync(tailwindBaseStylesPath)) {
    console.log(chalk.redBright('preflight.css was not found'));
    console.log(chalk.yellowBright("check 'node_modules' for tailwind project structure updates"));
    return;
  }

  const tailwindBaseStyles = fs.readFileSync(tailwindBaseStylesPath, 'utf-8');
  const wrappedBaseStyles = `.re-audio-sample {${tailwindBaseStyles}}`;

  const tailwindTemplate = fs.readFileSync(path.join(cssPath, 'tailwind.template.css'), 'utf-8');
  const baseRuleRegex = /\/\*\s*@tailwind\s+base\s*;\s*\*\//g;

  fs.writeFileSync(
    path.join(cssPath, 'tailwind.css'),
    tailwindTemplate.replace(baseRuleRegex, wrappedBaseStyles),
    'utf-8'
  );
};

getPreflightFromNodeModules();
