//---------Back end-----------
//----------Order Logic--------
function Order() {
  this.pizzas = [];
  this.currentId = 0;
}

Order.prototype.addPizza = function(pizza) {
  pizza.price = getPrice(pizza)
  pizza.id = this.assignId()
  this.pizzas.push(pizza)
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
  if(pizza.size === "small"){
    price += 10
  }else if(pizza.size === "medium"){
    price += 15
  }else{
    price += 18
  }
  pizza.toppings.forEach(topping => {
    if (topping === "peperoni" || topping === "sausage"){
      price += 2
    }else if(topping === "pineapple" || topping === "mushrooms"){
      price += .75
    }
  });
  return price
}

// -------UI-------
var order = new Order();
var toppings = [];

function attachContactListeners() { 
  $( ".pizza-size" ).on( "click", function(){
    $( "#pizza-image" ).html( $( ".pizza-size:checked" ).val() + " pizza selected" )
  });

  $("input.toppings").on("change", function(){
    var topping = $(this);
    if (topping.is(":checked")) {
      toppings.push(topping.val());
    }
    else{
      toppings = toppings.filter(i => i != topping.val());
    }
  });
}

$(document).ready(function(){
  attachContactListeners();
  $("#form-pizza").submit(function(event) {
    event.preventDefault();
    var size = $(".pizza-size:checked").val()
    var newPizza = new Pizza(size, toppings, "free")
    order.addPizza(newPizza)
    console.log(order)
  })
});

