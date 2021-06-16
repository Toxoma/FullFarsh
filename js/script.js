"use strict";

const isNumber = function (n) {
   return !isNaN(parseFloat(n)) && isFinite(n);
};

function setCookie(key, value, minutes = 5) {
   let cookieStr = key + '=' + value;

   if (minutes) {
      var date = new Date();
      date.setTime(date.getTime() + (minutes * 60 * 1000));
      cookieStr += "; expires=" + date.toGMTString();
   }

   document.cookie = cookieStr;
}

function resetStorage() {
   localStorage.clear();
   document.cookie.split(';').some(item => {
      const name = item.trim().split('=')[0];
      document.cookie = name + '=; Max-Age=-99999999;';
   });
}

function compareCookies() {
   const masCookie = [];

   document.cookie.split(';').forEach(item => {
      item = item.trim().split('=');
      const value = item.pop();
      const name = item.pop();
      const str = { name: name, value: value };
      masCookie.push(str);
   });

   if (!masCookie.some(item => item.name === "isLoad" && item.value === 'true')) {
      return false;
   } else {
      masCookie.shift();
   }


   for (const key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
         let localValue;

         if (localStorage.getItem(key) !== null) {
            localValue = localStorage.getItem(key).split('"')[1];
         }

         if (!masCookie.some(item => key === item.name && localValue === item.value)) {
            return false;
         }
      }
   }
   return true;
}

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
   periodAmount = document.querySelector('.period-amount'),
   depositBank = document.querySelector('.deposit-bank'),
   depositAmount = document.querySelector('.deposit-amount'),
   depositPercent = document.querySelector('.deposit-percent');

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

   start() {
      this.budget = +salaryAmount.value;
      this.getExpInc();
      this.getExpensesMonth();
      this.getAddExpInc();
      this.getInfoDeposit();
      this.getBudget();
      setCookie('isLoad', true);
      this.showResult();
   }

   saveLocal(key, value) {
      const str = JSON.stringify(value);
      localStorage.setItem(key, str);
   }

   unLoadLocal() {
      for (const key in localStorage) {
         if (localStorage.hasOwnProperty(key)) {
            const str = JSON.parse(localStorage[key]);
            switch (key) {
               case 'budget_month-value':
                  this.budgetMonth = +str;
                  break;
               case 'expenses_month-value':
                  this.expensesMonth = +str;
                  break;
               case 'additional_income-value':
                  this.addIncome = str.split(', ');
                  break;
               case 'income_period-value':
                  incomePeriodValue.value = +str;
                  break;
               case 'budget_day-value':
                  this.budgetDay = +str;
                  break;
               case 'additional_expenses-value':
                  this.addExpenses = str.split(', ');
                  break;
               case 'target_month-value':
                  setTimeout(() => {
                     targetMonthValue.value = str;
                     appData.showResult();
                  }, 300);
                  break;
            }
         }
      }
   }

   showResult() {
      budgetMonthValue.value = this.budgetMonth;
      budgetDayValue.value = this.budgetDay;
      expensesMonthValue.value = this.expensesMonth;
      if (typeof this.addExpenses === 'string') {
         additionalExpensesValue.value = this.addExpenses;
      } else {
         additionalExpensesValue.value = this.addExpenses.join(', ');
      }
      additionalIncomeValue.value = this.addIncome.join(', ');

      if (salaryAmount.value !== '') {
         targetMonthValue.value = this.getTargetMonth();
      }

      incomePeriodValue.value = this.calcPeriod(periodSelect.value);

      const result = document.querySelectorAll('.result-total');
      result.forEach(item => {
         const name = item.className.split(' ')[1];
         this.saveLocal(name, item.value);
         setCookie(name, item.value);
      });
   }

   addBlockExpInc(target, items, btn) {
      const cloneItem = items[0].cloneNode(true);
      this.newInputs(cloneItem.querySelectorAll('*'));

      items[0].parentNode.insertBefore(cloneItem, btn);
      items = document.querySelectorAll(`.${target}-items`);

      if (items.length === 3) {
         btn.style.display = 'none';
      }

      this.rusWordNames();
      this.rusWordSumma();
   }

   newInputs(items) {
      items.forEach(item => {
         item.value = '';
      });
   }

   getAddExpInc() {
      const count = (item, income) => {
         item = item.trim();

         if (item !== '') {

            if (income) {
               this.addIncome.push(item);

            } else {
               let addIncome = '',
                  flag = true;
               if (flag) {
                  flag = false;
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

      const expensesStr = additionalExpensesItem.value.split(',');
      expensesStr.forEach(item => count(item, false));
   }


   getExpInc() {
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
   }

   getExpensesMonth() {
      for (let key in this.expenses) {
         this.expensesMonth += +this.expenses[key];
      }
   }

   getBudget() {
      const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
      this.budgetMonth = +this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
      this.budgetDay = Math.floor(this.budgetMonth / 30);
   }

   getTargetMonth() {
      return Math.ceil(targetAmount.value / this.budgetMonth);
   }

   calcPeriod(period) {
      return this.budgetMonth * period;
   }

   rusWordNames() {
      placeholderNames = document.querySelectorAll('input[placeholder="Наименование"]');
      placeholderNames.forEach(item => {
         item.addEventListener('input', () => {
            if (/[A-Z]|[a-z]|[0-9]/.test(item.value)) {
               item.value = item.value.substring(0, (item.value.length - 1));
            }
         });
      });
   }

   rusWordSumma() {
      placeholderSumma = document.querySelectorAll('input[placeholder="Сумма"]');
      placeholderSumma.forEach(item => {
         item.addEventListener('input', () => {
            if (/[^0-9]/.test(item.value)) {
               item.value = item.value.substring(0, (item.value.length - 1));
            }
         });
      });
   }

   reset() {
      const block = document.querySelector('.data');
      let blockItems = document.querySelectorAll('input[type=text]');

      blockItems.forEach(item => {
         item.value = '';
      });

      periodSelect.value = 1;
      periodAmount.textContent = '1';
      checkBox.checked = false;
      this.depositHandler();

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
      resetStorage();
   }

   getInfoDeposit() {
      if (this.deposit) {
         this.percentDeposit = depositPercent.value;
         this.moneyDeposit = depositAmount.value;
      }
   }

   percentInput() {
      if (!isNumber(depositPercent.value) || (depositPercent.value < 0) || (depositPercent.value > 100)) {
         alert('Введите корректное значение в поле проценты!');
         start.setAttribute('disabled', true);
      } else {
         start.removeAttribute('disabled');
      }
   }

   changePercent() {
      const valueIndex = this.value;
      if (valueIndex === 'other') {
         depositPercent.value = '';
         depositPercent.style.display = 'inline-block';
         depositPercent.addEventListener('change', appData.percentInput);
      } else {
         depositPercent.value = this.value;
         depositPercent.style.display = 'none';
         depositPercent.removeEventListener('change', appData.percentInput);
      }
   }

   depositHandler() {
      if (checkBox.checked) {
         depositBank.style.display = 'inline-block';
         depositAmount.style.display = 'inline-block';
         this.deposit = true;
         depositBank.addEventListener('change', this.changePercent);
      } else {
         depositBank.style.display = 'none';
         depositAmount.style.display = 'none';
         depositBank.value = '';
         depositAmount.value = '';
         depositPercent.value = '';
         this.deposit = false;
         depositBank.removeEventListener('change', this.changePercent);
      }
   }

   blockItems() {
      const block = document.querySelector('.data');
      let blockItems = block.querySelectorAll('input[type=text] ');

      blockItems.forEach(item => {
         item.setAttribute("disabled", "disabled");
      });

      start.style.display = 'none';
      cancel.style.display = 'block';
      cancel.addEventListener('click', () => {
         this.reset();
      });
   }

   eventsListeners() {
      const _this = this;

      start.addEventListener('click', () => {
         if (salaryAmount.value !== '') {
            _this.start();
            _this.blockItems();

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

      checkBox.addEventListener('change', this.depositHandler.bind(this));


      periodSelect.addEventListener('input', () => {
         incomePeriodValue.value = this.calcPeriod(periodSelect.value);
      });
   }
}

const appData = new AppData();

appData.eventsListeners();
appData.rusWordNames();
appData.rusWordSumma();


document.addEventListener('DOMContentLoaded', () => {
   if (localStorage.length > 0 && compareCookies()) {
      appData.blockItems();
      appData.unLoadLocal();
   } else {
      resetStorage();
   }
});