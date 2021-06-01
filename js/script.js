"use strict";

function getExpensesMonth(a, b) {
   return a + b;
}
function getAccumulatedMonth(a, b) {
   return a - b;
}
function getTargetMonth(a, b) {
   return Math.ceil(a / b);
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

let money = prompt('Ваш месячный доход?');
let income = 'фриланс';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'интернет, Такси, коммуналка');
let deposit = confirm("Есть ли у вас депозит в банке?");
let expenses1 = prompt('Введите 1ую обязательную статью расходов?');
let amount1 = prompt('1) Во сколько это обойдется??');
let expenses2 = prompt('Введите 2ую обязательную статью расходов?');
let amount2 = prompt('2) Во сколько это обойдется??');
let mission = 3000;
let period = 10;
const minus = getExpensesMonth(+amount1, +amount2);
const accumulatedMonth = getAccumulatedMonth(money, minus);
let budgetDay = Math.floor(accumulatedMonth / 30);

showTypeOf(+money);
showTypeOf(income);
showTypeOf(deposit);
console.log('Расходы за месяц: ', minus);
console.log(addExpenses.split(', '));
// addExpenses.toLowerCase().split(', ').forEach(item => console.log(item));
console.log("Цель будет достигнута за " + getTargetMonth(mission, accumulatedMonth) + " месяцев");
console.log('budgetDay: ', budgetDay);
console.log(getStatusIncome(budgetDay));









