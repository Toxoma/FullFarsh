"use strict";

const isNumber = function (n) {
   return !isNaN(parseFloat(n)) && isFinite(n);
};

const start = document.getElementById('start'),
   cancel = document.getElementById('cancel'),
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

   expensesTitle = document.querySelectorAll('.expenses-title'),

   targetAmount = document.querySelector('.target-amount'),
   periodSelect = document.querySelector('.period-select'),
   periodAmount = document.querySelector('.period-amount');

let incomeItems = document.querySelectorAll('.income-items'),
   placeholderNames = document.querySelectorAll('input[placeholder="Наименование"]'),
   placeholderSumma = document.querySelectorAll('input[placeholder="Сумма"]'),
   expensesItems = document.querySelectorAll('.expenses-items');

class AppData {
   constructor() {
      this.income = {};
      this.incomeMonth = 0;
      this.addIncome = [];
      this.expenses = {};
      this.addExpenses = [];
      this.deposit = false;
      this.percentDeposit = 0;
      this.moneyDeposit = 0;
      this.budget = 0;
      this.budgetDay = 0;
      this.budgetMonth = 0;
      this.expensesMonth = 0;
   }
}

AppData.prototype.start = function () {
   this.budget = +salaryAmount.value;
   this.getExpInc();
   this.getExpensesMonth();

   this.getAddExpInc();

   // this.getAddExpenses();
   // this.getAddIncome();

   this.getBudget();
   this.showResult();
};

AppData.prototype.showResult = function () {
   budgetMonthValue.value = this.budgetMonth;
   budgetDayValue.value = this.budgetDay;
   expensesMonthValue.value = this.expensesMonth;
   additionalExpensesValue.value = this.addExpenses.join(', ');
   additionalIncomeValue.value = this.addIncome;
   targetMonthValue.value = this.getTargetMonth();

   incomePeriodValue.value = this.calcPeriod(periodSelect.value);
   periodSelect.addEventListener('input', () => {
      incomePeriodValue.value = this.calcPeriod(periodSelect.value);
   });
};

AppData.prototype.addBlockExpInc = function (target, items, btn) {
   const cloneItem = items[0].cloneNode(true);
   this.newInputs(cloneItem.querySelectorAll('*'));

   items[0].parentNode.insertBefore(cloneItem, btn);
   items = document.querySelectorAll(`.${target}-items`);

   if (items.length === 3) {
      btn.style.display = 'none';
   }

   this.rusWordNames();
   this.rusWordSumma();
};

AppData.prototype.newInputs = function (items) {
   items.forEach(item => {
      item.value = '';
   });
};

AppData.prototype.getAddExpenses = function () {
   const addExpenses = additionalExpensesItem.value.split(',');

   addExpenses.forEach(item => {
      item = item.trim();
      if (item !== '') {
         this.addExpenses.push(item);
      }
   });

};

AppData.prototype.getAddIncome = function () {
   let addIncome = '',
      count = true;

   additionalIncomeItems.forEach(item => {
      if (item.value.trim() === '') {
         return;
      }

      if (count) {
         count = false;
         addIncome += item.value.trim();
      } else {
         addIncome += ', ' + item.value.trim();
      }
   });

   this.addIncome.push(addIncome);
};

AppData.prototype.getAddExpInc = function () {

   const count = (item, income) => {
      item = item.trim();
      if (item !== '') {

         if (income) {
            this.addIncome.push(item);
         } else {
            let addIncome = '',
               count = true;
            if (count) {
               count = false;
               addIncome += item;
            } else {
               addIncome += ', ' + item;
            }
            this.addExpenses.push(addIncome);
         }

      }
   };


   additionalIncomeItems.forEach(item => {
      count(item.value, true);
   });

   const ExpensesStr = additionalExpensesItem.value.split(',');
   ExpensesStr.forEach(item => count(item, false));
};


AppData.prototype.getExpInc = function () {
   incomeItems = document.querySelectorAll('.income-items');
   expensesItems = document.querySelectorAll('.expenses-items');

   const count = item => {
      const startStr = item.className.split('-')[0];
      const itemTitle = item.querySelector(`.${startStr}-title`).value;
      const itemAmount = item.querySelector(`.${startStr}-amount`).value;

      if (itemTitle !== '' && itemAmount !== '') {
         this[startStr][itemTitle] = itemAmount;
      }
   };

   incomeItems.forEach(count);
   expensesItems.forEach(count);

   for (let key in this.income) {
      this.incomeMonth += +this.income[key];
   }
};

AppData.prototype.getExpensesMonth = function () {
   for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
   }
};

AppData.prototype.getBudget = function () {
   this.budgetMonth = +this.budget + this.incomeMonth - this.expensesMonth;
   this.budgetDay = Math.floor(this.budgetMonth / 30);
};

AppData.prototype.getTargetMonth = function () {
   return Math.ceil(targetAmount.value / this.budgetMonth);
};

AppData.prototype.calcPeriod = function (period) {
   return this.budgetMonth * period;
};

AppData.prototype.rusWordNames = function () {
   placeholderNames = document.querySelectorAll('input[placeholder="Наименование"]');
   placeholderNames.forEach(item => {
      item.addEventListener('input', () => {
         if (/[A-Z]|[a-z]|[0-9]/.test(item.value)) {
            item.value = item.value.substring(0, (item.value.length - 1));
         }
      });
   });
};

AppData.prototype.rusWordSumma = function () {
   placeholderSumma = document.querySelectorAll('input[placeholder="Сумма"]');
   placeholderSumma.forEach(item => {
      item.addEventListener('input', () => {
         if (/[^0-9]/.test(item.value)) {
            item.value = item.value.substring(0, (item.value.length - 1));
         }
      });
   });
};

AppData.prototype.reset = function () {
   const block = document.querySelector('.data');
   let blockItems = document.querySelectorAll('input[type=text]');

   blockItems.forEach(item => {
      item.value = '';
   });

   periodSelect.value = 1;
   periodAmount.textContent = '1';
   checkBox.checked = false;

   for (let item in this) {

      if (typeof this[item] === 'number') {
         this[item] = 0;
      }
      if (typeof this[item] === 'object') {
         this[item] = [];
      }
   }

   while (incomeItems.length !== 1) {
      incomeItems[incomeItems.length - 1].remove();
      incomeItems = document.querySelectorAll('.income-items');
   }
   while (expensesItems.length !== 1) {
      expensesItems[expensesItems.length - 1].remove();
      expensesItems = document.querySelectorAll('.expenses-items');
   }


   blockItems = block.querySelectorAll('input[type=text]');
   blockItems.forEach(item => {
      item.removeAttribute("disabled");
   });


   start.style.display = 'block';
   cancel.style.display = 'none';
};

AppData.prototype.eventsListeners = function () {
   const _this = this;

   start.addEventListener('click', () => {
      if (salaryAmount.value !== '') {
         _this.start();
         const block = document.querySelector('.data');
         let blockItems = block.querySelectorAll('input[type=text] ');

         blockItems.forEach(item => {
            item.setAttribute("disabled", "disabled");
         });

         start.style.display = 'none';
         cancel.style.display = 'block';
         cancel.addEventListener('click', () => {
            _this.reset();
         });
      }
   });

   expensesPlus.addEventListener('click', () => {
      _this.addBlockExpInc(expensesPlus.classList[1].split('_')[0], expensesItems, expensesPlus);
   });

   incomePlus.addEventListener('click', () => {
      _this.addBlockExpInc(incomePlus.classList[1].split('_')[0], incomeItems, incomePlus);
   });

   periodSelect.addEventListener('input', () => {
      periodAmount.textContent = periodSelect.value;
   });
};

const appData = new AppData();

appData.eventsListeners();
appData.rusWordNames();
appData.rusWordSumma();