#! /usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";

console.log(chalk.bgCyanBright("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"));
console.log(chalk.greenBright("\n                                              COUNTDOWN TIMER"));
console.log(chalk.bgCyanBright("\n<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"));

const bigNumbers = [
    `
  ░░░░░░░░
 ▒▒▒▒▒▒▒▒▒▒
 ▒▒▒▒    ▒▒▒▒
 ▒▒▒▒    ▒▒▒▒
 ▒▒▒▒    ▒▒▒▒
 ▒▒▒▒▒▒▒▒▒▒
  ░░░░░░░░
`,
    `
    ░░
   ▒▒▒▒
 ▒▒  ▒▒
     ▒▒
     ▒▒
     ▒▒
 ▒▒▒▒▒▒▒▒
`,
    `
  ░░░░░░░░
 ▒▒▒▒▒▒▒▒▒▒
        ▒▒▒▒
  ░░░░▒▒▒▒
 ▒▒▒▒
 ▒▒▒▒▒▒▒▒▒▒
 ▒▒▒▒▒▒▒▒▒▒
`,
    `
 ░░░░░░░░
 ▒▒▒▒▒▒▒▒▒▒
        ▒▒▒▒
   ░░░░▒▒▒▒
        ▒▒▒▒
 ▒▒▒▒▒▒▒▒▒▒
  ░░░░░░░░
`,
    `
 ░░░░  ▒▒
 ▒▒▒▒  ▒▒
 ▒▒▒▒  ▒▒
 ▒▒▒▒▒▒▒▒▒▒
      ▒▒
      ▒▒
      ▒▒
`,
    `
 ░░░░░░░░
 ▒▒▒▒▒▒▒▒▒▒
 ▒▒▒▒
 ▒▒▒▒▒▒▒▒░░
        ▒▒▒▒
 ▒▒▒▒▒▒▒▒▒▒
  ░░░░░░░░
`,
    `
  ░░░░░░░░
 ▒▒▒▒▒▒▒▒▒▒
 ▒▒▒▒
 ▒▒▒▒▒▒▒▒░░
 ▒▒▒▒  ▒▒▒▒
 ▒▒▒▒▒▒▒▒▒▒
  ░░░░░░░░
`,
    `
 ░░░░░░░░
 ▒▒▒▒▒▒▒▒▒▒
       ▒▒▒▒
      ▒▒▒▒
      ▒▒▒▒
     ▒▒▒▒
     ▒▒▒▒
`,
    `
  ░░░░░░░░
 ▒▒▒▒▒▒▒▒▒▒
 ▒▒▒▒  ▒▒▒▒
  ░░░░▒▒░░
 ▒▒▒▒  ▒▒▒▒
 ▒▒▒▒▒▒▒▒▒▒
  ░░░░░░░░
`,
    `
  ░░░░░░░░
 ▒▒▒▒▒▒▒▒▒▒
 ▒▒▒▒  ▒▒▒▒
 ▒▒▒▒▒▒▒▒▒▒
        ▒▒▒▒
 ▒▒▒▒▒▒▒▒▒▒
  ░░░░░░░░
`
];

const colon = `
   
╔═╗
╚═╝
╔═╗
╚═╝
`;

const timesUp = `
   
 ░░░░░░░░ ░░ ░░░    ░░░ ░░░░░░░     ░░    ░░ ░░░░░░  
    ▒▒    ▒▒ ▒▒▒▒  ▒▒▒▒ ▒▒          ▒▒    ▒▒ ▒▒   ▒▒ 
    ▒▒    ▒▒ ▒▒ ▒▒▒▒ ▒▒ ▒▒▒▒▒       ▒▒    ▒▒ ▒▒▒▒▒▒  
    ▓▓    ▓▓ ▓▓  ▓▓  ▓▓ ▓▓          ▓▓    ▓▓ ▓▓      
    ██    ██ ██      ██ ███████      ██████  ██      
`;

async function main() {
    console.log(chalk.yellowBright("Please enter the time in hours, minutes, and seconds:"));
    const { hours, minutes, seconds } = await getTimeInput();
    startTime(hours, minutes, seconds);
}

function getTimeInput() {
    return inquirer.prompt([
        {
            name: "hours",
            type: "number",
            message: chalk.yellowBright("Please enter the amount of hours"),
            validate: (input) => {
                if (isNaN(input)) {
                    return "Please enter a valid number";
                } else if (input < 0) {
                    return "Hours must be a non-negative number";
                } else {
                    return true;
                }
            }
        },
        {
            name: "minutes",
            type: "number",
            message: chalk.yellowBright("Please enter the amount of minutes"),
            validate: (input) => {
                if (isNaN(input)) {
                    return "Please enter a valid number";
                } else if (input < 0 || input >= 60) {
                    return "Minutes must be between 0 and 59";
                } else {
                    return true;
                }
            }
        },
        {
            name: "seconds",
            type: "number",
            message: chalk.yellowBright("Please enter the amount of seconds"),
            validate: (input) => {
                if (isNaN(input)) {
                    return "Please enter a valid number";
                } else if (input < 0 || input >= 60) {
                    return "Seconds must be between 0 and 59";
                } else {
                    return true;
                }
            }
        }
    ]);
}

function printBigNumber(hours: number, minutes: number, seconds: number) {
    const timeString = `${hours.toString().padStart(2, '0')}${minutes.toString().padStart(2, '0')}${seconds.toString().padStart(2, '0')}`;
    console.log(chalk.magentaBright(`Current Time: ${hours}:${minutes}:${seconds}`));
    console.log(chalk.magentaBright(`Parsed Time String: ${timeString}`));

    const [hour1, hour2, minute1, minute2, second1, second2] = timeString.split('');

    console.log(chalk.magentaBright(`Parsed Digits: ${hour1}, ${hour2}, ${minute1}, ${minute2}, ${second1}, ${second2}`));

    const hour1Digits = bigNumbers[parseInt(hour1)].split('\n');
    const hour2Digits = bigNumbers[parseInt(hour2)].split('\n');
    const minute1Digits = bigNumbers[parseInt(minute1)].split('\n');
    const minute2Digits = bigNumbers[parseInt(minute2)].split('\n');
    const second1Digits = bigNumbers[parseInt(second1)].split('\n');
    const second2Digits = bigNumbers[parseInt(second2)].split('\n');
    const colonDigits = colon.split('\n');

    for (let i = 0; i < hour1Digits.length; i++) {
        console.log(
            chalk.blueBright(hour1Digits[i].padEnd(12)) +
            chalk.blueBright(hour2Digits[i].padEnd(12)) +
            chalk.whiteBright(colonDigits[i]?.padEnd(6) || ''.padEnd(6)) +
            chalk.yellowBright(minute1Digits[i].padEnd(12)) +
            chalk.yellowBright(minute2Digits[i].padEnd(12)) +
            chalk.whiteBright(colonDigits[i]?.padEnd(6) || ''.padEnd(6)) +
            chalk.redBright(second1Digits[i].padEnd(12)) +
            chalk.redBright(second2Digits[i])
        );
    }
}

function startTime(hours: number, minutes: number, seconds: number) {
    const timer = setInterval(() => {
        if (seconds === 0 && minutes === 0 && hours === 0) {
            clearInterval(timer);
            console.clear();
            console.log(chalk.green.bold(timesUp));
            return;
        }
        if (seconds === 0) {
            seconds = 59;
            if (minutes === 0) {
                minutes = 59;
                if (hours !== 0) {
                    hours--;
                }
            } else {
                minutes--;
            }
        } else {
            seconds--;
        }

        console.clear();
        printBigNumber(hours, minutes, seconds);
    }, 1000);
}

main(); // Call the main function to start the program
