"use strict";

class Car {
   constructor(brand, model) {
      this.brand = brand;
      this.model = model;
      this.washed = false;
   }

   get fullTitle() {
      return this.brand + ' ' + this.model;
   }

   set fullTitle(val) {
      this.brand = val;
   }
}

const car1 = new Car('mazda', 3);

console.log(car1);