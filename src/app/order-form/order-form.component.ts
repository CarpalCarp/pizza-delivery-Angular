import { Component, OnInit, NgModule } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Menu } from '../pizza-data/menu';
import { SharedService } from '../shared.service';

@Component({
  selector: 'order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})

export class OrderFormComponent implements OnInit {
  private fontType: string;
  private fontSize: string;
  private formIndex: number;
  form: FormGroup;

  // separate order object
  order = {
    pizzaSize: "",
    pizzaSauce: "",
    pizzaToppings: [],
    drinks: [],
    sides: [],
    subTotal: 0.00,
    total: 0.00,
    taxRate: 0.0175,
    tax: 0.00
  };

  // binding menu items to the DOM
  pizzaSizes = Menu.pizzaSizes;
  pizzaSauces = Menu.pizzaSauces;
  pizzaToppings = Menu.pizzaToppings;
  drinks = Menu.drinks;
  sides = Menu.sides;

  private formSection = ["Home", "Size Screen", "Sauce Screen", "Topping Screen", "Drinks Screen", "Side Screen", "Review Screen", "Address Screen", "Card Screen"];

  constructor(fb: FormBuilder, private sharedService: SharedService) {
    this.formIndex = 0;

    this.form = fb.group({
      pizzaSize: ['', Validators.required],
      pizzaSauce: ['', Validators.required],
      fullName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expirationDate: ['', Validators.required],
      securityCode: ['', Validators.required],
      houseAddress: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.sharedService.sharedMessage.subscribe(message => this.fontType = message);
    this.sharedService.sharedFontSizes.subscribe(message => this.fontSize = message);
  }

  nextGroup() { this.formIndex++; }
  previousGroup() { this.formIndex--; }

  nextGroupAndCalculateTax() {
    this.formIndex++;
    this.order.tax = this.order.subTotal * this.order.taxRate;
    this.order.total = this.order.subTotal + this.order.tax;
  }

  // adds pizza size to order object
  getSize(size: string) {
    this.order.pizzaSize = size;
    this.calculatePrice();
  }

  // adds pizza sauce to order object
  getSauce(sauce: string) { this.order.pizzaSauce = sauce; }
  getFormSection(): string { return this.formSection[this.formIndex]; }
  getFontType(): string { return this.fontType; }
  getFontSize(): string { return this.fontSize; }

  get fullName() { return this.form.get('fullName'); }
  get cardNumber() { return this.form.get('cardNumber'); }
  get expirationDate() { return this.form.get('expirationDate'); }
  get securityCode() { return this.form.get('securityCode'); }
  get houseAddress() { return this.form.get('houseAddress'); }
  get city() { return this.form.get('city'); }
  get state() { return this.form.get('state'); }
  get zipCode() { return this.form.get('zipCode'); }

  // adds a topping to pizzaToppings array in order object
  // if topping is already included, then remove it since user
  // is checking off the checkbox for the topping
  addTopping(topping: string): void {
    if (this.order.pizzaToppings.includes(topping))
      this.order.pizzaToppings.splice(this.order.pizzaToppings.indexOf(topping), 1);
    else
      this.order.pizzaToppings.push(topping);

    this.calculatePrice();
  }

  // adds a drink to the drinks array in order object
  // if drink is already included, then remove it since user
  // is checking off the checkbox for the drink
  addDrinks(drink: string): void {
    if (this.order.drinks.includes(drink))
      this.order.drinks.splice(this.order.drinks.indexOf(drink), 1);
    else
      this.order.drinks.push(drink);

    this.calculatePrice();
  }

  addSides(side: string): void {
    if (this.order.sides.includes(side))
      this.order.sides.splice(this.order.sides.indexOf(side), 1);
    else
      this.order.sides.push(side);

    this.calculatePrice();
  }

  // calculate price looks at the items in this.order and using the menu
  // adds the price accordingly
  calculatePrice(): void {
    // reset subtotal
    this.order.subTotal = 0.00;
    // checks data items in order and adds price according to the menu
    let sizes = this.pizzaSizes;
    sizes.forEach(size => {
      if (size.name === this.order.pizzaSize) {
        this.order.subTotal += size.price;
      }
    });

    let toppings = this.pizzaToppings;
    toppings.forEach(topping => {
      if (this.order.pizzaToppings.includes(topping.name))
        this.order.subTotal += topping.price;
    });

    let drinks = this.drinks;
    drinks.forEach(drink => {
      if (this.order.drinks.includes(drink.name))
        this.order.subTotal += drink.price;
    });

    let sides = this.sides;
    sides.forEach(side => {
      if (this.order.sides.includes(side.name))
        this.order.subTotal += side.price;
    });
  }

  sendPayment(): void {
    window.confirm('Payment submitted. Yummy pizza is on its way!');
    this.formIndex = 0;
    this.cancelOrder();
  }

  cancelOrder(): void {
    // reset formIndex
    this.formIndex = 0;
    // reset order
    this.order.pizzaSize = "";
    this.order.pizzaSauce = "";
    this.order.pizzaToppings = [];
    this.order.drinks = [];
    this.order.sides = [];
    this.order.subTotal = 0;
    this.order.total = 0;
    this.order.tax = 0
    // reset form
    this.form.reset();
  }
}
