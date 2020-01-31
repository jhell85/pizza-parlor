
// -------UI-------
var Order = new Order();

function attachContactListeners() {

  $( ".pizza-size" ).on( "click", function() {
    $( "#pizza-image" ).html( $( ".pizza-size:checked" ).val() + " pizza selected" )});

}

$(document).ready(function(){
  attachContactListeners();
  $("#form-pizza").submit(function(event) {
    event.preventDefault();
    var size = $(".pizza-size:checked").val()
    console.log(size)
  })
  

});


//---------Back end-----------

function Order() {
  this.Pizzas = [];
  this.currentId = 0;
}

Order.prototype.addPizza = function(Pizza) {
  Pizza.id = this.assignId()
  this.Pizzas.push()
}

Order.prototype.assignId = function () {
  this.currentId ++;
  return this.currentId
}

function Pizza(pizzaSize, pizzaPrice) {
  this.size = pizzaSize;
  this.toppings = [];
  this.price = pizzaPrice;
}
