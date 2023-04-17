import inquirer from "inquirer";
import DatePrompt from "inquirer-date-prompt";

inquirer.registerPrompt("date", DatePrompt);

export async function promptNewSpent() {
  return await inquirer.prompt(newSpentPrompt);
}

const newSpentPrompt = [
  {
    type: "list",
    name: "category",
    message: "En qué categoría se encuentra?:",
    choices: ["Compras", "Pagos"],
    filter(val) {
      return val.toLowerCase();
    },
  },
  {
    type: "input",
    name: "thing",
    message: "Qué compraste o pagaste?:",
    filter(val) {
      return val.toLowerCase();
    },
  },
  {
    type: "input",
    name: "spent",
    message: "Cúanto salió?:",
  },
  {
    type: "date",
    name: "date",
    message: "Cuándo fue?:",
    locale: "en-US",
    format: { month: "short", hour: undefined, minute: undefined },
  },
];
