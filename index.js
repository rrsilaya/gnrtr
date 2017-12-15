#!/usr/bin/env node

const inquirer = require('inquirer');
const fs = require('fs');

const TEMPLATES = fs.readdirSync(`${__dirname}/templates`);
const PWD = process.cwd();

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
      }

      const writePath = `${PWD}/${project}/${file}`;
      fs.writeFileSync(writePath, contents, 'utf8');
    } else if (stats.isDirectory()) {
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
    message: 'Project Name:',
    validate: validateProject
  }
];

inquirer.prompt(QUESTIONS).then(answers => {
  const { boilerplate, project } = answers;
  const path = `${__dirname}/templates/${boilerplate}`;

  fs.mkdirSync(`${PWD}/${project}`);
  populateFiles(path, project);
});