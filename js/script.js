"use strict";

let isNumber = function (n) {
   return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;

let start = function () {
   do {
      money = prompt('Ваш месячный доход?');
   } while (!isNumber(money));
};
start();

let appData = {
   income: {},
   addIncome: [],
   expenses: {},
   addExpenses: [],
   deposit: false,
   percentDeposit: 0,
   moneyDeposit: 0,
   mission: 3000,
   period: 10,
   budget: money,
   budgetDay: 0,
   budgetMonth: 0,
   expensesMonth: 0,
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

      for (let i = 0; i < 2; i++) {
         let ask;
         do {
            ask = prompt('Введите обязательную статью расходов?');
         } while (isNumber(ask));
         let a;
         do {
            a = prompt('Во сколько это обойдется?');
         } while (!isNumber(a));

         appData.expenses[ask] = +a;
      }
   },
   getExpensesMonth: function () {
      for (let key in appData.expenses) {
         appData.expensesMonth += appData.expenses[key];
      }
   },
   getBudget: function () {
      appData.budgetMonth = appData.budget - appData.expensesMonth;
      appData.budgetDay = Math.floor(appData.budgetMonth / 30);
   },
   getTargetMonth: function () {
      let c = Math.ceil(appData.mission / appData.budgetMonth);
      if (c > 0) {
         return "Цель будет достигнута за " + c + " месяцев";
      } else {
         return "Цель не будет достигнута";
      }
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
   calcSaveMoney: function () {
      return appData.budgetMonth * appData.period;
   }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

console.log('Расходы за месяц: ', appData.expensesMonth);
console.log(appData.getTargetMonth());
console.log('budgetDay: ', appData.budgetDay);
console.log(appData.getStatusIncome());

console.dir(appData);

console.log('Наша программа включает в себя данные:');
for (let key in appData) {
   console.log(key + " : " + appData[key]);
}

function vivodAddExpenses() {
   let sum = [];
   appData.addExpenses.forEach((item) => {
      sum.push(item[0].toUpperCase() + item.slice(1));
   });
   return sum.join(', ');
}

console.log(vivodAddExpenses());

// console.dir(appData);

let count = document.getElementById('start');
let btn1 = document.getElementsByTagName('button')[0];
let btn2 = document.getElementsByTagName('button')[1];
let checkBox = document.querySelector('#deposit-check');
let additionalIncomeItems = document.querySelectorAll('.additional_income-item');

let result1 = document.getElementsByClassName('budget_day-value');
let result2 = document.getElementsByClassName('expenses_month-value');
let result3 = document.getElementsByClassName('additional_income-value');
let result4 = document.getElementsByClassName('additional_expenses-value');
let result5 = document.getElementsByClassName('income_period-value');
let result6 = document.getElementsByClassName('target_month-value');

let result0 = document.querySelector('.budget_month-value');
let salaryAmount = document.querySelector('.salary-amount');
let incomeTitle = document.querySelectorAll('.income-title');
let incomeAmount = document.querySelectorAll('.income-amount');
let expensesTitle = document.querySelectorAll('.expenses-title');
let expensesAmount = document.querySelectorAll('.expenses-amount');
let additionalExpensesItem = document.querySelectorAll('.additional_expenses-item');
let targetAmount = document.querySelectorAll('.target-amount');
let periodSelect = document.querySelectorAll('.period-select');



