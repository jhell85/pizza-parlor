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

function removeVal(arr, val){
  for(var i = 0; i < arr.length; i++)
  {
      if (arr[i] == val)
          arr.splice(i, 1);
  }
}

// -------UI-------
var Order = new Order();


var toppings = new Array()
function attachContactListeners() {
  
  $( ".pizza-size" ).on( "click", function() {
    $( "#pizza-image" ).html( $( ".pizza-size:checked" ).val() + " pizza selected" )});

    $("input[name*='toppings']").click(function() {
      if ($("input[name*='toppings']").attr('checked')){
          toppings.push($(this).val());
      }else{
          removeVal(toppings, $(this).val());
        }
      console.log(toppings);
  });
  
}

$(document).ready(function(){
  attachContactListeners();
  $("#form-pizza").submit(function(event) {
    event.preventDefault();
    var size = $(".pizza-size:checked").val()
    var toppings = $(".toppings:checked").val()
    console.log(size, toppings)
  })
  

});

