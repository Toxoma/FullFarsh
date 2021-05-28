"use strict";

let money = 300; //“Доход за месяц”
let income = 'фриланс';
let addExpenses = 'интернет, Такси, коммуналка';
let deposit = true;
let mission = 3000;
let period = 10;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев`);
console.log('Цель заработать ' + mission + ' рублей');

addExpenses.toLowerCase().split(', ').forEach(item => console.log(item));

const budgetDay = money / 30;
console.log(budgetDay);