function createExpenseTracker(username, initialBudget) {
  let user = { name: username, buget: initialBudget };
  let expense = [];
  let newId = 1;

  function addExprnse(amount, catagory, description) {
    let newExpense = {
      id: newId++,
      amount: amount,
      catagory: catagory,
      description: description,
    };
    expense.push(newExpense);
  }

  function removeExpense(id) {
    expense = expense.filter(exp => exp.id !== id);
    console.log(`🗑️ Expense with ID ${id} removed!`);
  }

  function updateExpanse(id, newData) {
    let data = expense.find(da => da.id === id);
    Object.assign(data, newData);
  }

  function getTotalExpense() {
    let totalEx = expense.reduce((acc, exp) => {
      return acc + exp.amount;
    }, 0);
    return console.log(totalEx);
  }

  function getExpenseByCategory(mycategory) {
    let catEx = expense.filter(expens => expens.catagory === mycategory);

    return console.log(catEx);
  }
  function highestExpense() {
    //!Bad Way
    /* let high = expense[0];
    for (let exp of expense) {
      if (high.amount < exp.amount) {
        high = exp;
        console.log(exp);
      }
    } */
    //! Good Way
    const highObj = expense.reduce((acc, exp) =>
      exp.amount > acc.amount ? exp : acc
    );
    return console.log(highObj);
  }

  function lowestExpense() {
    let low = expense.reduce((acc, exp) => {
      if (exp.amount < acc.amount) {
        return exp;
      } else {
        return acc;
      }
    });
    return console.log(low);
  }
  function getUserInfo() {
    let userIn = `Name:${user.name} and Bujet:${user.buget}`;
    return console.log(userIn);
  }

  function updateUser(newName, NewBujet) {
    user.name = newName;
    user.buget = NewBujet;
  }

  function showAllExpense() {
    return expense;
  }
  return {
    addExprnse,
    removeExpense,
    updateExpanse,
    getTotalExpense,
    getExpenseByCategory,
    highestExpense,
    lowestExpense,
    getUserInfo,
    updateUser,
    showAllExpense,
  };
}
let user1 = createExpenseTracker('Nirob', 500);
user1.addExprnse(500, 'fruit', 'Eat');
user1.addExprnse(500, 'Rice', 'Eat');
user1.addExprnse(700, 'fruit', 'Eat');
//user1.removeExpense(2);
user1.updateExpanse(2, {
  catagory: 'shoeas',
  description: 'uses',
  amount: 5000,
});
user1.updateExpanse(1, { amount: 900 });
user1.getTotalExpense();
user1.getExpenseByCategory('fruit');
user1.highestExpense();
user1.lowestExpense();
user1.updateUser('Safa', 6000);
user1.getUserInfo();

console.log(user1.showAllExpense());
