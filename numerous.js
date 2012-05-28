$(document).ready(function(e)
{
  window.numerous_init = function(){
    var numerousList = $(".numerous");
 
    window.forms = {};
    for (var i = 0, len = numerousList.length; i < len; i++){
      var numerous = $(numerousList[i]);
      var form = numerous.find(".numerous-form");
      var add = numerous.find(".numerous-add");
      
      var container = $("<div></div>");
      container.append(form.removeClass("numerous-form"));
      
      forms[add.attr('id')] = container.html();
      form.remove();
    }
  };
  
  
  $("body").on('click', ".numerous-add", function(e){
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
