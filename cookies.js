function Cookie(type, bake_time){
  this.type = type;
  this.bake_time = bake_time;
  this.bake_time_elapsed = 0;
  this.cookie_id = 0;
  this.doneness = "raw"
  this.rack = 0
}


function Oven(cookies){
  this.rack_0 = cookies[0]
  this.rack_1 = cookies[1]
  this.rack_2 = cookies[2]


};

Cookie.prototype.renderColor = function(){
  var tableCellNumber = 'rack_'+''+this.rack+''

  var tableCell = $('td[id='+tableCellNumber+']')

  if (this.doneness == "crispy")
  {
    tableCell.css("background-color", "black")
  }
  else if (this.doneness == "perfect")
  {
    tableCell.css("background-color", "green")
  }
  else
  {
    tableCell.css("background-color", "yellow")
  }
}

Cookie.prototype.bake = function(){
  this.bake_time_elapsed++
};

Cookie.prototype.updateDoneness = function(){
  if ( this.bake_time_elapsed > this.bake_time )
  {
    return this.doneness = "crispy"
  }
  else if (this.bake_time_elapsed == this.bake_time)
  {
    return this.doneness = "perfect"
  }
  else
  {
    return "raw"
  }
}


cookies = []

counter = 0

$( document ).ready(function() {
  $("input[value='Make Batch']").on("click", function(event){
    event.preventDefault();

    var cookieType = $("input[name='batch_type']").val();
    var bakeTime = $("input[name='bake_time']").val();


    var cookie = new Cookie(cookieType, bakeTime);

    counter++

    cookie.cookie_id = counter

    $('#prep_batches').append('<li id='+ cookie.cookie_id +'> ' + cookie.type + ' <button class="put_in_oven">put in oven</button></li>')

    $('.put_in_oven').on("click", function(){

      var cookieListItem = $(this).parent();

      var rackNumber = cookie.cookie_id
      cookie.rack = rackNumber -1

      var rack = $('#oven tr:nth-child('+rackNumber+') td')

      rack.html(cookie.type)

      var oven = new Oven(cookies)


    });



    $('#bake').on("click", function(){
      cookie.bake();
      cookie.updateDoneness();
      cookie.renderColor();
      console.log(cookie.doneness);
    });



  });
});































