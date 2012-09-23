// Numerous.js
// Unobtrusive Javascript helper for dynamically creating fields_for objects for Rails.
// Version 2.0.1
//
// Author: Karl Bryan Paragua
// Source: https://github.com/kbparagua/numerous.js 


$(document).ready(function(e)
{
  Numerous = {};
  
  
  Numerous.init = function(options){
    var forms = $('.numerous');
    
    Numerous.addFormHash = {};
    Numerous.options = options;
  
  
    for (var i = 0, len = forms.length; i < len; i++){
      var form = $(forms[i]),
        fieldsFor = form.attr('id'),
        objectName = fieldsFor.replace(/fields-for-/, ''),
        addLinkId = 'add-to-' + objectName,
        updateDiv = '#' + objectName;
      
      
      // Remove Numerous class and id
      form.removeClass('numerous').attr('id','');
      
      
      // use temp as a container because html() 
      // function only returns the inner html
      var temp = $('<div></div>').append(form); 
      Numerous.addFormHash[addLinkId] = {
        'form' : temp.html(),
        'fields-for' : fieldsFor,
        'update-div' : updateDiv 
      };
       
      form.remove();
      
      Numerous.clickHandlerForAdd(addLinkId);
      Numerous.createHandlersForRemove(fieldsFor);
    }
  };
  
  
  
  Numerous.clickHandlerForAdd = function(addLinkId){
    var addLink = '#' + addLinkId;
    
    $(addLink).click(function(e){
      e.preventDefault();
      
      var data = Numerous.addFormHash[this.id],
        childIndex = new Date().getTime(),
        form = data['form'].replace(/replace_this/g, childIndex);

      form = $(form);
      form.addClass(data['fields-for']);
      $(data['update-div']).append(form);
      
      var options = Numerous.options[data['fields-for']];
      if (options){
        var callback = options['add'];
        if (callback){ callback(form); }
      } 
    });
  };
  
  
  Numerous.createHandlersForRemove = function(fieldsFor){
    
    var element = '.' + fieldsFor + ' .numerous-remove a';
    
    $('body').off('click', element);
    $('body').on('click', element, function(e){
      e.preventDefault();
      
      var _this = $(this),
        form = _this.parent().parent();
      
      _this.siblings('input').attr('value', '1');
      form.hide();
      
      var options = Numerous.options[fieldsFor];
      if (options){
        var callback = options['remove'];
        if (callback) { callback(form); }
      }
    });
  }
  
});
