import { get, save } from "./filesMethods.js";
import inquirer from "inquirer";
import { promptNewSpent } from "./spentPrompts.js";

const main = async () => {
  let run = true;

  while (run) {
    const action = await inquirer.prompt([
      {
        type: "list",
        name: "chosen",
        message: "Actions:",
        choices: [
          { value: 1, name: "Cargar nuevo gasto" },
          { value: 2, name: "Mostrar todos los gastos" },
          { value: 3, name: "Mostrar las compras" },
          { value: 4, name: "Mostrar los pagos" },
          { value: 5, name: "Borrar el último gasto" },
          { value: 99, name: "EXIT" },
        ],
      },
    ]);

    switch (action.chosen) {
      case 1:
        await createNewSpent();
        break;
      case 2:
        await getAllExpenses();
        break;
      case 3:
        await getAllShoppingExpenses();
        break;
      case 4:
        await getAllPaymentExpenses();
        break;
      case 5:
        await deleteLastExpense();
        break;
      case 99:
        run = false;
        break;
      default:
        run = false;
        break;
    }
  }
  console.log("Dejá de gastar che!");
};

main();

async function createNewSpent() {
  console.log("Nuevo gasto:");
  const newSpentData = await promptNewSpent();

  console.log("Categoría:", newSpentData.category);
  console.log("Compra o pago:", newSpentData.thing);
  console.log("Precio:", newSpentData.spent);
  console.log("Fecha:", newSpentData.date);
  console.log("\n");

  const currentExpenses = await get("expenses");
  currentExpenses.push(newSpentData);
  await save("expenses", currentExpenses);
}

async function getAllExpenses() {
  const currentExpenses = await get("expenses");

  if (!currentExpenses) {
    console.log("Aún no hay gastos cargados..");
    // TODO manejar éste if
  } else {
    currentExpenses.forEach((spent) => {
      console.log("Categoría: ", spent.category);
      console.log("Compró o pagó: ", spent.thing);
      console.log("A un precio de: ", spent.spent);
      console.log("En la fecha: ", spent.date);
      console.log("\n");
      return;
    });
  }
}

async function getAllShoppingExpenses() {
  const currentExpenses = await get("expenses");

  const expensesFiltered = currentExpenses.filter((object) => {
    return object.category === "compras";
  });

  expensesFiltered.forEach((spent) => {
    console.log("Categoría: ", spent.category);
    console.log("Compró o pagó: ", spent.thing);
    console.log("A un precio de: ", spent.spent);
    console.log("En la fecha: ", spent.date);
    console.log("\n");
    return;
  });
}

async function getAllPaymentExpenses() {
  const currentExpenses = await get("expenses");

  const expensesFiltered = currentExpenses.filter((object) => {
    return object.category === "pagos";
  });

  expensesFiltered.forEach((spent) => {
    console.log("Categoría: ", spent.category);
    console.log("Compró o pagó: ", spent.thing);
    console.log("A un precio de: ", spent.spent);
    console.log("En la fecha: ", spent.date);
    console.log("\n");
    return;
  });
}

async function deleteLastExpense() {
  const currentExpenses = await get("expenses");

  const spentDeleted = currentExpenses.pop();
  await save("expenses", currentExpenses);

  console.log("GASTO BORRADO:");
  console.log("Categoría: ", spentDeleted.category);
  console.log("Compró o pagó: ", spentDeleted.thing);
  console.log("A un precio de: ", spentDeleted.spent);
  console.log("En la fecha: ", spentDeleted.date);
  console.log("\n");
}
