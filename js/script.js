"use strict";

let isNumber = function (n) {
   return !isNaN(parseFloat(n)) && isFinite(n);
};

let start = document.getElementById('start'),
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
   incomeItems = document.querySelectorAll('.income-items'),
   expensesTitle = document.querySelectorAll('.expenses-title'),
   expensesItems = document.querySelectorAll('.expenses-items'),
   targetAmount = document.querySelector('.target-amount'),
   periodSelect = document.querySelector('.period-select'),
   periodAmount = document.querySelector('.period-amount'),
   placeholderNames = document.querySelectorAll('input[placeholder="Наименование"]'),
   placeholderSumma = document.querySelectorAll('input[placeholder="Сумма"]');


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

      this.budget = +salaryAmount.value;
      this.getExpenses();
      this.getIncome();
      this.getExpensesMonth();
      this.getAddExpenses();
      this.getAddIncome();
      this.getBudget();
      this.showResult();
   },
   showResult: function () {
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
   },
   addExpensesBlock: function () {
      let cloneExpensesItem = expensesItems[0].cloneNode(true);
      this.newInputs(cloneExpensesItem.querySelectorAll('*'));

      expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
      expensesItems = document.querySelectorAll('.expenses-items');

      if (expensesItems.length === 3) {
         expensesPlus.style.display = 'none';
      }
      this.rusWordNames();
      this.rusWordSumma();
   },
   addIncomeBlock: function () {
      let cloneIncomeItem = incomeItems[0].cloneNode(true);
      this.newInputs(cloneIncomeItem.querySelectorAll('*'));

      incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);

      incomeItems = document.querySelectorAll('.income-items');

      if (incomeItems.length === 3) {
         incomePlus.style.display = 'none';
      }
      this.rusWordNames();
      this.rusWordSumma();

   },
   newInputs: function (items) {
      items.forEach(item => {
         item.value = '';
      });
   },
   getAddExpenses: function () {
      let addExpenses = additionalExpensesItem.value.split(',');
      addExpenses.forEach(item => {
         item = item.trim();
         if (item !== '') {
            this.addExpenses.push(item);
         }
      });
   },
   getAddIncome: function () {
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
   },
   getExpenses: function () {
      expensesItems.forEach(item => {
         let itemExpenses = item.querySelector('.expenses-title').value,
            cashExpenses = item.querySelector('.expenses-amount').value;
         if (itemExpenses !== '' && cashExpenses !== '') {
            this.expenses[itemExpenses] = cashExpenses;
         }
      });
   },
   getIncome: function () {
      incomeItems.forEach(item => {
         let itemIncome = item.querySelector('.income-title').value,
            cashIncome = item.querySelector('.income-amount').value;
         if (itemIncome !== '' && cashIncome !== '') {
            this.income[itemIncome] = cashIncome;
         }
      });

      for (let key in this.income) {
         this.incomeMonth += +this.income[key];
      }
   },
   getExpensesMonth: function () {
      for (let key in this.expenses) {
         this.expensesMonth += +this.expenses[key];
      }
   },
   getBudget: function () {
      this.budgetMonth = +this.budget + +this.incomeMonth - this.expensesMonth;
      this.budgetDay = Math.floor(this.budgetMonth / 30);
   },
   getTargetMonth: function () {
      return Math.ceil(targetAmount.value / this.budgetMonth);
   },
   calcPeriod: function (period) {
      return this.budgetMonth * period;
   },
   rusWordNames: function () {
      placeholderNames = document.querySelectorAll('input[placeholder="Наименование"]');
      placeholderNames.forEach(item => {
         item.addEventListener('input', () => {
            if (/[A-Z]|[a-z]|[0-9]/.test(item.value)) {
               item.value = item.value.substring(0, (item.value.length - 1));
            }
         });
      });
   },
   rusWordSumma: function () {
      placeholderSumma = document.querySelectorAll('input[placeholder="Сумма"]');
      placeholderSumma.forEach(item => {
         item.addEventListener('input', () => {
            if (/[^0-9]/.test(item.value)) {
               item.value = item.value.substring(0, (item.value.length - 1));
            }
         });
      });
   },
   reset: function () {
      let block = document.querySelector('.data'),
         blockItems = document.querySelectorAll('input[type=text]');

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
   }
};


let mainObj = Object.create(appData);

mainObj.eventsListeners = () => {
   start.addEventListener('click', () => {
      if (salaryAmount.value !== '') {
         mainObj.start();
         let block = document.querySelector('.data'),
            blockItems = block.querySelectorAll('input[type=text] ');

         blockItems.forEach(item => {
            item.setAttribute("disabled", "disabled");
         });

         start.style.display = 'none';
         cancel.style.display = 'block';
         cancel.addEventListener('click', () => {
            mainObj.reset();
         });
      }
   });

   expensesPlus.addEventListener('click', () => {
      mainObj.addExpensesBlock();
   });
   incomePlus.addEventListener('click', () => {
      mainObj.addIncomeBlock();
   });

   periodSelect.addEventListener('input', () => {
      periodAmount.textContent = periodSelect.value;
   });
};

mainObj.eventsListeners();
mainObj.rusWordNames();
mainObj.rusWordSumma();