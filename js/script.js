"use strict";

let isNumber = function (n) {
   return !isNaN(parseFloat(n)) && isFinite(n);
};

let start = document.getElementById('start'),
   incomePlus = document.getElementsByTagName('button')[0],
   expensesPlus = document.getElementsByTagName('button')[1],
   checkBox = document.querySelector('#deposit-check'),
   additionalIncomeItems = document.querySelectorAll('.additional_income-item'),
   budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
   expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
   additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
   additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
   additionalExpensesItem = document.querySelector('.additional_expenses-item'),
   incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
   targetMonthValue = document.getElementsByClassName('target_month-value')[0],
   budgetMonthValue = document.querySelector('.budget_month-value'),
   salaryAmount = document.querySelector('.salary-amount'),
   incomeTitle = document.querySelectorAll('.income-title'),
   incomeItems = document.querySelectorAll('.income-items'),
   expensesTitle = document.querySelectorAll('.expenses-title'),
   expensesItems = document.querySelectorAll('.expenses-items'),
   // additionalExpensesItem = document.querySelectorAll('.additional_expenses-item'),
   targetAmount = document.querySelector('.target-amount'),
   periodSelect = document.querySelector('.period-select'),
   periodAmount = document.querySelector('.period-amount');

let appData = {
   income: {},
   addIncome: [],
   expenses: {},
   addExpenses: [],
   deposit: false,
   percentDeposit: 0,
   moneyDeposit: 0,
   budget: 0,
   budgetDay: 0,
   budgetMonth: 0,
   expensesMonth: 0,
   start: function () {
      // do {
      //    money = prompt('Ваш месячный доход?');
      // } while (!isNumber(money));

      if (salaryAmount.value === '') {
         alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
         return;
      }
      appData.budget = salaryAmount.value;
      appData.getExpenses();
      appData.getIncome();
      appData.getExpensesMonth();
      appData.getBudget();
      appData.getAddExpenses();
      // appData.getAddIncome();
      appData.showResult();
   },
   showResult: function () {
      budgetMonthValue.value = appData.budgetMonth;
      budgetDayValue.value = appData.budgetDay;
      expensesMonthValue.value = appData.expensesMonth;
      additionalExpensesValue.value = appData.addExpenses.join(', ');
      additionalIncomeValue.value = appData.addIncome.join(', ');
      targetMonthValue.value = appData.getTargetMonth();
      incomePeriodValue.value = appData.calcPeriod();
   },
   addExpensesBlock: function () {
      let cloneExpensesItem = expensesItems[0].cloneNode(true);
      expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
      expensesItems = document.querySelectorAll('.expenses-items');

      if (expensesItems.length === 3) {
         expensesPlus.style.display = 'none';
      }
   },
   addIncomeBlock: function () {
      let cloneIncomeItem = incomeItems[0].cloneNode(true);
      incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
      incomeItems = document.querySelectorAll('.income-items');

      if (incomeItems.length === 3) {
         incomePlus.style.display = 'none';
      }
   },
   // getAddIncome: function () {
   //    let addIncome = additionalIncomeItems.value.split(',');
   //    additionalIncomeItems.forEach(item => {
   //       item = item.value.trim();
   //       if (item !== '') {
   //          appData.addIncome.push(item);
   //       }
   //    });
   // },
   getAddExpenses: function () {
      let addExpenses = additionalExpensesItem.value.split(',');
      addExpenses.forEach(item => {
         item = item.trim();
         if (item !== '') {
            appData.addExpenses.push(item);
         }
      });
   },
   getExpenses: function () {
      expensesItems.forEach(item => {
         let itemExpenses = item.querySelector('.expenses-title').value,
            cashExpenses = item.querySelector('.expenses-amount').value;
         if (itemExpenses !== '' && cashExpenses !== '') {
            appData.expenses[itemExpenses] = cashExpenses;
         }
      });
   },
   getIncome: function () {
      incomeItems.forEach(item => {
         console.log(item);
         let itemIncome = item.querySelector('.income-title').value,
            cashIncome = item.querySelector('.income-amount').value;
         if (itemIncome !== '' && cashIncome !== '') {
            appData.income[itemIncome] = cashIncome;
         }
      });
   },
   asking: function () {

      if (confirm('Есть ли у вас доп. заработок?')) {
         let itemIncome,
            cashIncome;
         do {
            itemIncome = prompt('Какой у вас есть доп. заработок?', 'Таксую');
         } while (isNumber(itemIncome));
         do {
            cashIncome = +prompt('Сколько зарабатываете?', 1000);
         } while (isNaN(cashIncome));
         appData.income[itemIncome] = cashIncome;
      }

      let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'интернет, Такси, коммуналка');

      appData.addExpenses = addExpenses.toLowerCase().split(', ');

      appData.deposit = confirm("Есть ли у вас депозит в банке?");
      appData.getInfoDeposit();

      // for (let i = 0; i < 2; i++) {
      //    let ask;
      //    do {
      //       ask = prompt('Введите обязательную статью расходов?');
      //    } while (isNumber(ask));
      //    let a;
      //    do {
      //       a = prompt('Во сколько это обойдется?');
      //    } while (!isNumber(a));

      //    appData.expenses[ask] = +a;
      // }
   },
   getExpensesMonth: function () {
      for (let key in appData.expenses) {
         appData.expensesMonth += +appData.expenses[key];
      }
   },
   getBudget: function () {
      appData.budgetMonth = appData.budget - appData.expensesMonth;
      appData.budgetDay = Math.floor(appData.budgetMonth / 30);
   },
   getTargetMonth: function () {
      return Math.ceil(targetAmount.value / appData.budgetMonth);
      // if (c > 0) {
      //    return "Цель будет достигнута за " + c + " месяцев";
      // } else {
      //    return "Цель не будет достигнута";
      // }
   },
   getStatusIncome: function () {
      if (appData.budgetDay > 1200) {
         return 'У вас высокий уровень дохода';
      }
      if (appData.budgetDay > 600 && appData.budgetDay <= 1200) {
         return 'У вас средний уровень дохода';
      }
      if (appData.budgetDay <= 600 && appData.budgetDay > 0) {
         return 'К сожалению у вас уровень дохода ниже среднего';
      }
      if (appData.budgetDay <= 0) {
         return 'Что то пошло не так';
      }
   },
   getInfoDeposit: function () {
      if (appData.deposit) {
         do {
            appData.percentDeposit = prompt('Какой годовой процент?', 10);
         } while (!isNumber(appData.percentDeposit));
         do {
            appData.moneyDeposit = prompt('Какая сумма заложена?', 1000);
         } while (!isNumber(appData.moneyDeposit));
      }
   },
   calcPeriod: function () {
      return appData.budgetMonth * periodSelect.value;
   }
};

start.addEventListener('click', appData.start);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener('change', () => {
   periodAmount.textContent = periodSelect.value;
});

// console.log(appData.getTargetMonth());
// console.log('budgetDay: ', appData.budgetDay);

// console.dir(appData);

// console.log('Наша программа включает в себя данные:');
// for (let key in appData) {
//    console.log(key + " : " + appData[key]);
// }

// function vivodAddExpenses() {
//    let sum = [];
//    appData.addExpenses.forEach((item) => {
//       sum.push(item[0].toUpperCase() + item.slice(1));
//    });
//    return sum.join(', ');
// }

// console.log(vivodAddExpenses());







