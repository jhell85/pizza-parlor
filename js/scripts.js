//---------Back end-----------
//----------Order Logic--------
function Order() {
  this.pizzas = [];
  this.currentId = 0;
  this.price = 0;
}

Order.prototype.addPizza = function(pizza) {
  pizza.price = pizza.getPrice();
  pizza.id = this.assignId();
  this.pizzas.push(pizza);
  this.price += pizza.price;
}

Order.prototype.addOrderTotal = function(pizza){
  this.price += pizza.price;
}

Order.prototype.assignId = function () {
  this.currentId ++;
  return this.currentId;
}
//------------Pizza Logic-----------------
class Pizza {
  constructor(pizzaSize,toppings,pizzaPrice) {
  this.size = pizzaSize;
  this.toppings = toppings;
  this.price = pizzaPrice;
  }

  getPrice(){
    this.price = 0;
    if(this.size === "Small"){
      this.price += 10;
    }else if(this.size === "Medium"){
      this.price += 15;
    }else{
      this.price += 18;
    }
    this.toppings.forEach(topping => {
      if (topping === "Pepperoni" || topping === "Sausage"){
        this.price += 2;
      }else if(topping === "Pineapple" || topping === "Mushrooms"){
        this.price += .75;
      }
    });
    return this.price
  }
}
// -------UI-------
var order = new Order();
 

function displayPizzaToppings(toppings) {
  var toppingsList = "";
  toppings.forEach(topping => {
    toppingsList += `<span>${topping}</span><br>`;
  })
  return toppingsList
}

function displayOrderDetails(OrderToDisplay) {
  var PizzaList = $("#pizza-table");
  var htmlForPizzaDetails = "";
  OrderToDisplay.pizzas.forEach(pizza => {
    htmlForPizzaDetails += `<tr class="table-secondary"> <td scope="row">Pizza</td> <td>${pizza.size}</td> <td>${displayPizzaToppings(pizza.toppings)}</ul></td> <td>${pizza.price}</td>`;
  })
  htmlForPizzaDetails += `<tr class="table-success"> <th scope="row"><button id="button-order" class="btn btn-primary">submit Order</button><th/> <th> Total:</th> <th>${OrderToDisplay.price}</th>`
  PizzaList.html(htmlForPizzaDetails);
}



function attachContactListeners(toppings) {
  $("input.toppings").on("change", function(){
    var topping = $(this);
    if (topping.is(":checked")) {
      toppings.push(topping.val());
      return toppings
    }
    else {
      toppings = toppings.filter(i => i != topping.val());
      return toppings
    }
  });

  $("#order").on("click", "#button-order", function(){
    alert("thanks for your order we will get that to you ASAP");
    location.reload(true);
  });

  return toppings
}

function clearInputs(){
  $('input[type=checkbox]').each(function() { 
          this.checked = false; 
  }); 
  $('input[type=radio]').each(function() { 
    this.checked = false; 
  }); 
}

function checkSize(){
  let smallChecked = $('#small').is(':checked');
  let mediumChecked = $('#medium').is(':checked');
  let largeChecked = $('#large').is(':checked');
  if (smallChecked === false && mediumChecked === false && largeChecked === false){ 
    alert("you must choose a size for you pie");
    return false
  } 
}

$(document).ready(function(){
  var toppings = [];
  attachContactListeners(toppings);
  $("#form-pizza").submit(function(event) {
    event.preventDefault();
    if (checkSize() === false){return false};
    var size = $(".pizza-size:checked").val();
    var newPizza = new Pizza(size, toppings, 0);
    order.addPizza(newPizza);
    displayOrderDetails(order);
    clearInputs();
    toppings = [];
  })
});