// Numerous.js
// Unobtrusive Javascript helper for dynamically creating fields_for objects for Rails.
// Version 2.0
//
// Author: Karl Bryan Paragua
// Source: https://github.com/kbparagua/numerous.js 

$(document).ready(function(e)
{
  Numerous = {};
  
  
  Numerous.init = function(){
    var forms = $('.numerous');
    
    Numerous.addFormHash = {};
  
    for (var i = 0, len = forms.length; i < len; i++){
      var form = $(forms[i]);
      var addLinkId = 'add-to-' + form.attr('id').replace(/fields-for-/, '');
      
      // Remove Numerous class and id
      form.removeClass('numerous').attr('id','');
      
      // use temp as a container because html() 
      // function only returns the inner html
      var temp = $('<div></div>').append(form); 
      Numerous.addFormHash[addLinkId] = temp.html();
      form.remove();
      
      Numerous.clickHandlerForAdd(addLinkId);
    }
    
    Numerous.createHandlersForRemove();
  };
  
  
  
  Numerous.clickHandlerForAdd = function(addLinkId){
    var addLink = '#' + addLinkId;
    $('body').on('click', addLink, function(e){
      e.preventDefault();
      
      var updateDiv = '#' + this.id.replace(/add-to-/, ''),
        childIndex = new Date().getTime(),
        form = Numerous.addFormHash[this.id].replace(/replace_this/g, childIndex);

      $(updateDiv).append( $(form) );
    });
  };
  
  
  Numerous.createHandlersForRemove = function(){
    $('body').on('click', '.numerous-remove a', function(e){
      e.preventDefault();
      
      var _this = $(this);
      _this.siblings('input').attr('value', '1');
      _this.parent().parent().hide();
    });
  }
  
});
