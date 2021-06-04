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
   mission: 3000,
   period: 10,
   budget: money,
   budgetDay: 0,
   budgetMonth: 0,
   expensesMonth: 0,
   asking: function () {
      let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'интернет, Такси, коммуналка');

      appData.addExpenses = addExpenses.toLowerCase().split(', ');

      appData.deposit = confirm("Есть ли у вас депозит в банке?");

      for (let i = 0; i < 2; i++) {
         let ask = prompt('Введите обязательную статью расходов?');

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
