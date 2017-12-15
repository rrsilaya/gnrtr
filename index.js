#!/usr/bin/env node

const inquirer = require('inquirer');
const fs = require('fs');
const { exec } = require('child_process');
const { Spinner } = require('cli-spinner');

const C = {
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  green: '\x1b[32m'
}

const TEMPLATES = fs.readdirSync(`${__dirname}/templates`);
const PWD = process.cwd();
const LOADER = new Spinner(`${C.blue}%s${C.reset} Installing dependencies (this may take a while)...`);
LOADER.setSpinnerString("⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏");

const validateProject = input => {
  if (fs.existsSync(`${PWD}/${input}`)) return 'Project already exists.'
  else if (/^[A-Za-z][A-Za-z\-\d]*$/.test(input)) return true;
  else return 'Project name invalid.';
}

const populateFiles = (boilerplate, project) => {
  const files = fs.readdirSync(boilerplate);

  files.forEach(file => {
    const origPath = `${boilerplate}/${file}`;

    const stats = fs.statSync(origPath);
    if (stats.isFile()) {
      let contents = fs.readFileSync(origPath, 'utf8');

      // Modify package.json file
      if (file === 'package.json') {
        let mod = contents.split('\n');
        mod[1] = `  "name": "${project}",`;
        contents = mod.join('\n');
      } else if (file === 'README.md') {
        let mod = contents.split('\n');
        mod[7] = `  ${project}`;
        contents = mod.join('\n');
      }

      const writePath = `${PWD}/${project}/${file}`;
      fs.writeFileSync(writePath, contents, 'utf8');
    } else if (stats.isDirectory()) {
      if (file === 'node_modules') return;

      fs.mkdirSync(`${PWD}/${project}/${file}`);
      populateFiles(`${boilerplate}/${file}`, `${project}/${file}`);
    }
  });
}

const QUESTIONS = [
  {
    name: 'boilerplate',
    type: 'list',
    message: 'What project boilerplate do you want to generate?',
    choices: TEMPLATES
  },
  {
    name: 'project',
    type: 'input',
    message: 'Project name:',
    validate: validateProject
  }
];

process.stdout.write(`${C.blue}
                                         __
                       ____ _____  _____/ /______
                      / __ \`/ __ \\/ ___/ __/ ___/
                     / /_/ / / / / /  / /_/ /
                     \\__, /_/ /_/_/   \\__/_/
                    /____/
            ${C.green}Your starter files will be generated shortly.
${C.reset}\n`);

inquirer.prompt(QUESTIONS).then(answers => {
  const { boilerplate, project } = answers;
  const path = `${__dirname}/templates/${boilerplate}`;

  fs.mkdirSync(`${PWD}/${project}`);
  process.stdout.write('\n');
  populateFiles(path, project);
  process.stdout.write(`${C.green}✓${C.reset} Generated ${C.blue}${project}${C.reset} starter files\n`);

  LOADER.start();
  exec(`cd ${project} && git init && yarn`, err => {
    if (err) {
      process.stdout.write('Unknown error occured\n');
      return;
    }

    LOADER.stop(true);
    process.stdout.write(`${C.green}✓${C.reset} Installed dependencies\n\n`);
    process.stdout.write(`${C.blue}You're good to go! Happy hacking!${C.reset}\n`);
  });
});