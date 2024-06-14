#! /usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";

console.log(chalk.bgCyanBright("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"));
console.log(chalk.greenBright("\n                                              COUNTDOWN TIMER"));
console.log(chalk.bgCyanBright("\n<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"));

const bigNumbers = [
    ` 
  ___  
 / _ \\ 
| | | |
| | | |
| |_| |
 \\___/ 
`,
    ` 
 __  
/_ | 
 | | 
 | | 
 | | 
 |_| 
`,
    ` 
 ___  
|__ \\ 
   ) |
  / / 
 / /_ 
|____|
`,
    ` 
 ____  
|___ \\ 
  __) |
 |__ < 
 ___) |
|____/ 
`,
    ` 
 _  _   
| || |  
| || |_ 
|__   _|
   | |
   |_|  
`,
    `  
  __ __
 | _ _|
 | | 
 |__ \\ 
 ___) |
|____/ 
`,
    ` 
  __  
 / /  
/ /_ 
| '_ \\
| (_) |
 \\___/ 
`,
    ` 
 _____ 
|____ |
    / /
   / / 
  / /  
 /_/   
`,
    ` 
  ___  
 / _ \\ 
| (_) |
 > _ < 
| (_) |
 \\___/ 
`,
    ` 
  ___  
 / _ \\ 
| (_) |
 \\__, |
   / / 
  /_/  
`
];

const colon = `
 
 
 _  
(_)
 _  
(_)
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

    const [hour1, hour2, minute1, minute2, second1, second2] = timeString.split('');

    const getDigitLines = (digit: any): any => {
        const num = parseInt(digit);
        if (num >= 0 && num <= 9) {
            return bigNumbers[num].split('\n');
        } else {
            return [];
        }
    };

    const hour1Digits = getDigitLines(hour1);
    const hour2Digits = getDigitLines(hour2);
    const minute1Digits = getDigitLines(minute1);
    const minute2Digits = getDigitLines(minute2);
    const second1Digits = getDigitLines(second1);
    const second2Digits = getDigitLines(second2);
    const colonDigits = colon.split('\n');

    for (let i = 0; i < 7; i++) { // Assuming each digit has 7 lines
        console.log(
            chalk.blueBright(hour1Digits[i]?.padEnd(12) || ''.padEnd(12)) +
            chalk.blueBright(hour2Digits[i]?.padEnd(12) || ''.padEnd(12)) +
            chalk.whiteBright(colonDigits[i]?.padEnd(6) || ''.padEnd(6)) +
            chalk.yellowBright(minute1Digits[i]?.padEnd(12) || ''.padEnd(12)) +
            chalk.yellowBright(minute2Digits[i]?.padEnd(12) || ''.padEnd(12)) +
            chalk.whiteBright(colonDigits[i]?.padEnd(6) || ''.padEnd(6)) +
            chalk.redBright(second1Digits[i]?.padEnd(12) || ''.padEnd(12)) +
            chalk.redBright(second2Digits[i] || '')
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
