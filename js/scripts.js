//---------Back end-----------

function Order() {
  this.pizzas = [];
  this.currentId = 0;
}

Order.prototype.addPizza = function(pizza) {
  pizza.id = this.assignId()
  this.pizzas.push(pizza)
}

Order.prototype.assignId = function () {
  this.currentId ++;
  return this.currentId
}

function Pizza(pizzaSize,toppings,pizzaPrice) {
  this.size = pizzaSize;
  this.toppings = toppings;
  this.price = pizzaPrice;
}

function removeVal(arr, val){
  for(var i = 0; i < arr.length; i++)
  {
      if (arr[i] == val)
          arr.splice(i, 1);
  }
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
      toppings = toppings.filter(x => x != topping.val());
    }
    console.log(toppings);
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

