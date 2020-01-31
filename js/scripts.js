
// -------UI-------
var Order = new Order();

$(".pizza-size").click(function(){
  console.log("radio selected")
})

$(document).ready(function(){



});


//---------Back end-----------

function Order() {
  this.Pizzas = [];
  this.currentId = 0;
}

function Pizza(pizzaSize, pizzaPrice) {
  this.size = pizzaSize;
  this.toppings = [];
  this.price = pizzaPrice;
}
