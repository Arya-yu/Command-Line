#!/usr/bin/env node
"use strict";

import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";
import figlet from "figlet";
import gradient from "gradient-string";

let playerName;

const sleep = (delay = 2000) =>
  new Promise((resolve) => setTimeout(resolve, delay));

async function welcome() {
  const welcomeTitle = chalkAnimation.rainbow(
    "Welcome to the most amazing Java and JavaScript Quiz"
  );
  welcomeTitle.start();
  await sleep();
  welcomeTitle.stop();

  console.log(chalk.bgCyan("There are total five mcq-based questions"));
  console.log(
    chalk.bgCyan("Choose the correct answers for all of them to Win.")
  );
}

async function askPlayerName() {
  const name = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message: "Please enter your name:",
    default() {
      return "Player";
    },
  });
  playerName = name.player_name;
}

async function handleAnswer(isCorrect, func) {
  const spinner = createSpinner("Checking the answer...").start();
  await sleep();

  if (isCorrect) {
    spinner.success({ text: `Good Job ${playerName}. You are correct` });
    await func();
  } else {
    spinner.error({ text: "Game Over. You lose💀💀💀!" });
    process.exit(1);
  }
}

async function quizQuestion1() {
  inquirer
    .prompt({
      name: "quiz_question",
      type: "list",
      message: "What is JavaScript?",
      choices: [
        "JavaScript is a scripting language used to make the website interactive",
        "JavaScript is an assembly language used to make the website interactive",
        "JavaScript is a compiled language used to make the website interactive",
        "None of the mentioned",
      ],
    })
    .then((answer) => {
      return handleAnswer(
        answer.quiz_question ===
          "JavaScript is a scripting language used to make the website interactive",
        quizQuestion2
      );
    });
}

async function quizQuestion2() {
  inquirer
    .prompt({
      name: "quiz_question",
      type: "list",
      message:
        "Among the given statements, which statement defines closures in JavaScript?",
      choices: [
        "JavaScript is a function that is enclosed with references to its inner function scope",
        "JavaScript is a function that is enclosed with references to its lexical environment",
        "JavaScript is a function that is enclosed with the object to its inner function scope",
        "None of the mentioned",
      ],
    })
    .then((answer) => {
      return handleAnswer(
        answer.quiz_question ===
          "JavaScript is a function that is enclosed with references to its lexical environment",
        quizQuestion3
      );
    });
}

async function quizQuestion3() {
  inquirer
    .prompt({
      name: "quiz_question",
      type: "list",
      message: "Which statement is true about Java?",
      choices: [
        "Java is a sequence-dependent programming language",
        "Java is a code dependent programming language",
        "Java is a platform-dependent programming language",
        "Java is a platform-independent programming language",
      ],
    })
    .then((answer) => {
      return handleAnswer(
        answer.quiz_question ===
          "Java is a platform-independent programming language",
        quizQuestion4
      );
    });
}

async function quizQuestion4() {
  inquirer
    .prompt({
      name: "quiz_question",
      type: "list",
      message:
        "Arrays in JavaScript are defined by which of the following statements?",
      choices: [
        "It is an ordered list of values",
        "It is an ordered list of objects",
        "It is an ordered list of string",
        "It is an ordered list of functionse",
      ],
    })
    .then((answer) => {
      return handleAnswer(
        answer.quiz_question === "It is an ordered list of values",
        quizQuestion5
      );
    });
}

async function quizQuestion5() {
  inquirer
    .prompt({
      name: "quiz_question",
      type: "list",
      message: "Which of these cannot be used for a variable name in Java?",
      choices: [
        "identifier & keyword",
        "identifier",
        "keyword",
        "none of the mentioned",
      ],
    })
    .then((answer) => {
      return handleAnswer(answer.quiz_question === "keyword", win);
    });
}

async function win() {
  console.clear();
  const msg = `${playerName} YOU WIN!`;
  figlet(msg, function (err, data) {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    console.log(gradient.rainbow(data));
  });
}

await welcome();
await askPlayerName();
await quizQuestion1();
