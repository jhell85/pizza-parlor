
// -------UI-------
var Order = new Order();


$(document).ready(function(){

  $( ".pizza-size" ).on( "click", function() {
    $( "#pizza-image" ).html( $( ".pizza-size:checked" ).val() + " pizza selected" )});

  

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
