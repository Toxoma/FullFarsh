"use strict";

let money = prompt('Ваш месячный доход?');
let income = 'фриланс';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'интернет, Такси, коммуналка');
let deposit = confirm("Есть ли у вас депозит в банке?");
let mission = 3000;
let period = 10;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев`);
console.log('Цель заработать ' + mission + ' рублей');

addExpenses.toLowerCase().split(', ').forEach(item => console.log(item));

let expenses1 = prompt('Введите 1ую обязательную статью расходов?');
let amount1 = prompt('1) Во сколько это обойдется??');
let expenses2 = prompt('Введите 2ую обязательную статью расходов?');
let amount2 = prompt('2) Во сколько это обойдется??');

let budgetMonth = +money - +amount1 - +amount2;
console.log('budgetMonth: ', budgetMonth);

console.log("Цель будет достигнута за " + Math.ceil(mission / budgetMonth) + " месяцев");

let budgetDay = budgetMonth / 30;
console.log('budgetDay: ', Math.floor(budgetDay));

//! 1ый варик
if (budgetDay > 1200) {
   console.log('У вас высокий уровень дохода');
}
if (budgetDay > 600 && budgetDay <= 1200) {
   console.log('У вас средний уровень дохода');
}
if (budgetDay <= 600 && budgetDay > 0) {
   console.log('К сожалению у вас уровень дохода ниже среднего');
}
if (budgetDay <= 0) {
   console.log('Что то пошло не так');
}
//! 2ой варик
console.log(budgetDay <= 0 ? 'Что то пошло не так' : budgetDay <= 600 && budgetDay > 0 ? 'К сожалению у вас уровень дохода ниже среднего' : budgetDay > 600 && budgetDay <= 1200 ? 'У вас средний уровень дохода' : 'У вас высокий уровень дохода');

