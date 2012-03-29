$(document).ready(function(e)
{
  var numerousList = $(".numerous");
 
  var forms = {};
  for (var i = 0, len = numerousList.length; i < len; i++){
    var numerous = $(numerousList[i]);
    var form = numerous.find(".numerous-form");
    var add = numerous.find(".numerous-add");
    
    forms[add.attr('id')] = form.html();
    form.remove();
  }
  
  
  $(".numerous-add").on('click', function(e){
    e.preventDefault();
    
    // Remove 'for-' on this id
    var update = "#" + this.id.split("for-")[1];
    var form = forms[this.id].replace(/replace_this/g, new Date().getTime());
    
    $(update).append($(form));
  });
  
  
  $("div").on('click', '.numerous-remove', function(e){
    e.preventDefault();
    
    var that = $(this);
    that.siblings().filter(".numerous-remove-field").attr('value', '1');
    that.parent().hide();
  });
  
});
