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
   targetAmount = document.querySelector('.target-amount'),
   periodSelect = document.querySelector('.period-select'),
   periodAmount = document.querySelector('.period-amount');

let appData = {
   income: {},
   incomeMonth: 0,
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

      appData.budget = +salaryAmount.value;
      appData.getExpenses();
      appData.getIncome();
      appData.getExpensesMonth();
      appData.getAddExpenses();
      appData.getBudget();

      appData.showResult();
   },
   showResult: function () {
      budgetMonthValue.value = appData.budgetMonth;
      budgetDayValue.value = appData.budgetDay;
      expensesMonthValue.value = appData.expensesMonth;
      additionalExpensesValue.value = appData.addExpenses.join(', ');
      additionalIncomeValue.value = appData.addIncome.join(', ');
      targetMonthValue.value = appData.getTargetMonth();

      incomePeriodValue.value = appData.calcPeriod(periodSelect.value);
      periodSelect.addEventListener('input', () => {
         incomePeriodValue.value = appData.calcPeriod(periodSelect.value);
      });
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
         let itemIncome = item.querySelector('.income-title').value,
            cashIncome = item.querySelector('.income-amount').value;
         if (itemIncome !== '' && cashIncome !== '') {
            appData.income[itemIncome] = cashIncome;
         }
      });

      for (let key in appData.income) {
         appData.incomeMonth += +appData.income[key];
      }
   },
   getExpensesMonth: function () {
      for (let key in appData.expenses) {
         appData.expensesMonth += +appData.expenses[key];
      }
   },
   getBudget: function () {
      appData.budgetMonth = +appData.budget + +appData.incomeMonth - appData.expensesMonth;
      appData.budgetDay = Math.floor(appData.budgetMonth / 30);
   },
   getTargetMonth: function () {
      return Math.ceil(targetAmount.value / appData.budgetMonth);
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
   calcPeriod: function (period) {
      return appData.budgetMonth * period;
   }
};


salaryAmount.addEventListener('change', () => {
   if (isNumber(salaryAmount.value)) {
      start.addEventListener('click', appData.start);
   } else {
      start.removeEventListener('click', appData.start);
   }
});

expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener('input', () => {
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







