//---------Back end-----------
//----------Order Logic--------
function Order() {
  this.pizzas = [];
  this.currentId = 0;
  this.price = 0
}

Order.prototype.addPizza = function(pizza) {
  pizza.price = getPrice(pizza)
  pizza.id = this.assignId()
  this.pizzas.push(pizza)
  this.price += pizza.price
}
Order.prototype.addOrderTotal = function(pizza){
  this.price += pizza.price
}

Order.prototype.assignId = function () {
  this.currentId ++;
  return this.currentId
}
//------------Pizza Logic-----------------
function Pizza(pizzaSize,toppings,pizzaPrice) {
  this.size = pizzaSize;
  this.toppings = toppings;
  this.price = pizzaPrice;
}
function getPrice(pizza){
  price = 0
  if(pizza.size === "Small"){
    price += 10
  }else if(pizza.size === "Medium"){
    price += 15
  }else{
    price += 18
  }
  pizza.toppings.forEach(topping => {
    if (topping === "Pepperoni" || topping === "Sausage"){
      price += 2
    }else if(topping === "Pineapple" || topping === "Mushrooms"){
      price += .75
    }
  });
  return price
}

// -------UI-------
var order = new Order();
var toppings = [];

function displayPizzaToppings(toppings) {
  var toppingsList = "";
  toppings.forEach(topping => {
    toppingsList += `<span>${topping}</span><br>`
  })
  return toppingsList
}

function displayOrderDetails(OrderToDisplay) {
  var PizzaList = $("#pizza-table");
  var htmlForPizzaDetails = "";
  OrderToDisplay.pizzas.forEach(pizza => {
    htmlForPizzaDetails += `<tr class="table-secondary"> <td scope="row">Pizza</td> <td>${pizza.size}</td> <td>${displayPizzaToppings(pizza.toppings)}</ul></td> <td>${pizza.price}</td>`
  })
  htmlForPizzaDetails += `<tr class="table-success"> <th scope="row"><button id="button-order" class="btn btn-primary">submit Order</button><th/> <th> Total:</th> <th>${OrderToDisplay.price}</th>`
  PizzaList.html(htmlForPizzaDetails)
}

function attachContactListeners() { 
  $("input.toppings").on("change", function(){
    var topping = $(this);
    if (topping.is(":checked")) {
      toppings.push(topping.val());
    }
    else{
      toppings = toppings.filter(i => i != topping.val());
    }
  });

  $("#order").on("click", "#button-order", function(){

    alert("thanks for your order we will get that to you ASAP")
  })
}
function clearInputs(){
  $('input[type=checkbox]').each(function() { 
          this.checked = false; 
  }); 
  $('input[type=radio]').each(function() { 
    this.checked = false; 
}); 
}

$(document).ready(function(){
  attachContactListeners();
  $("#form-pizza").submit(function(event) {
    event.preventDefault();
    var size = $(".pizza-size:checked").val();
    var newPizza = new Pizza(size, toppings);
    order.addPizza(newPizza);
    displayOrderDetails(order);
    clearInputs();
    toppings = [];
    console.log(`Order: ${order} toppings: ${toppings}`);
  })
});

