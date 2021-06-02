"use strict";

let isNumber = function (n) {
   return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;
let income = 'фриланс';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'интернет, Такси, коммуналка');
let deposit = confirm("Есть ли у вас депозит в банке?");
let expenses = [];
let mission = 3000;
let period = 10;

let start = function () {
   do {
      money = prompt('Ваш месячный доход?');
   } while (!isNumber(money));
};
start();

function getExpensesMonth() {
   let sum = 0;
   for (let i = 0; i < 2; i++) {
      expenses[i] = prompt('Введите обязательную статью расходов?');
      let a;
      do {
         a = prompt('Во сколько это обойдется?');
      } while (!isNumber(a));
      sum += +a;
   }
   return sum;
}

function getAccumulatedMonth(a, b) {
   return a - b;
}

const minus = getExpensesMonth(),
   accumulatedMonth = getAccumulatedMonth(money, minus);
let budgetDay = Math.floor(accumulatedMonth / 30);

function getTargetMonth(a, b) {
   let c = Math.ceil(a / b);
   if (c < 0) {
      return "Цель будет достигнута за " + c + " месяцев";
   } else {
      return "Цель не будет достигнута";
   }
}

function showTypeOf(data) {
   console.log(data + " : " + typeof (data));
}

function getStatusIncome(a) {
   if (a > 1200) {
      return 'У вас высокий уровень дохода';
   }
   if (a > 600 && a <= 1200) {
      return 'У вас средний уровень дохода';
   }
   if (a <= 600 && a > 0) {
      return 'К сожалению у вас уровень дохода ниже среднего';
   }
   if (a <= 0) {
      return 'Что то пошло не так';
   }
}

showTypeOf(+money);
showTypeOf(income);
showTypeOf(deposit);
console.log('Расходы за месяц: ', minus);
console.log(addExpenses.split(', '));
// addExpenses.toLowerCase().split(', ').forEach(item => console.log(item));
console.log(getTargetMonth(mission, accumulatedMonth));
console.log('budgetDay: ', budgetDay);
console.log(getStatusIncome(budgetDay));









