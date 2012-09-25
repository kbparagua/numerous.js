// Numerous.js
// Unobtrusive Javascript helper for dynamically creating fields_for objects for Rails.
// Version 2.1.0
//
// Author: Karl Bryan Paragua
// Source: https://github.com/kbparagua/numerous.js 


$(document).ready(function(e)
{
  Numerous = {};
  
  
  Numerous.init = function(options){
    var forms = $('.numerous');
    
    Numerous.addFormHash = {};
    Numerous.options = options || {};
  
  
    for (var i = 0, len = forms.length; i < len; i++){
      var form = $(forms[i]),
        fieldsFor = form.attr('id'),
        list = fieldsFor.replace(/fields-for-/, ''),
        addLinkId = 'add-to-' + list,
        updateDiv = '#' + list,
        listOptions = Numerous.options[list];
        
      
      // Remove Numerous class and id
      form.removeClass('numerous').attr('id','');
      
      
      // use temp as a container because html() 
      // function only returns the inner html
      var temp = $('<div></div>').append(form); 
      Numerous.addFormHash[addLinkId] = {
        'form' : temp.html(),
        'fields-for' : fieldsFor,
        'update-div' : updateDiv,
        'list'  : list 
      };
       
      form.remove();
      
      Numerous.clickHandlerForAdd(addLinkId);
      Numerous.createHandlersForRemove(list);
      
      if (listOptions) {
        var initialOption = listOptions['initial'],
          addButton = $('#' + addLinkId),
          initial = initialOption;
          
        if ( typeof(initialOption) === 'function' ){ initial = initialOption(); }
        for (var i = 0; i < initial; i++){ addButton.trigger('click'); }
        
        
        var afterInitialize = listOptions['after-initialize'];
        if (afterInitialize){ afterInitialize(); } 
      }
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
      
      var sampleInputName = form.find('[name*='+ childIndex + ']:first').attr('name'),
        namePrefixRegex = new RegExp("^(\\[|\\]|\\w|\\s|-)+\\[" + childIndex + "\\]")
        namePrefix = sampleInputName.match(namePrefixRegex)[0],
        removeInputName = namePrefix + '[_destroy]',
        removeInput = $('<input type="hidden" value="0" class="numerous-remove-field" name="' + 
          removeInputName +'"/>');
      
      form.append(removeInput);
      $(data['update-div']).append(form);
      
      var options = Numerous.options[data['list']];
      if (options){
        var callback = options['add'];
        if (callback){ callback(form); }
      } 
    });
  };
  
  
  Numerous.createHandlersForRemove = function(list){
    var element = '.fields-for-' + list  + ' .numerous-remove';
    
    $('body').off('click', element);
    $('body').on('click', element, function(e){
      e.preventDefault();
      
      var _this = $(this),
        form = _this.parent(),
        destroyField = _this.siblings('.numerous-remove-field:first');
      
      // If existing record
      if (destroyField.length == 0) {
        var idField = form.find('input[name*="[id]"]:first'),
          prefix = idField.attr('name').replace('[id]',''),
          destroyFieldName = prefix + '[_destroy]';
        
        destroyField = $('<input type="hidden" value="0" class="numerous-remove-field" name="' + 
          destroyFieldName +'"/>');
          
        form.append(destroyField);
      }
      
      destroyField.attr('value', '1');
      
      form.removeClass('fields-for-' + list);
      form.hide();
      
      var options = Numerous.options[list];
      if (options){
        var callback = options['remove'];
        if (callback) { callback(form); }
      }
    });
  };
  
  
  
  // ***************************************************************************
  // Helper Methods
  // ***************************************************************************
  
  Numerous.count = function(list){ 
    return $('.fields-for-' + list).length; 
  };
  
  
  Numerous.get = function(list){
    return $('.fields-for-' + list);
  };
  
  
  Numerous.removeAll = function(list){
    Numerous.get(list).find('.numerous-remove').trigger('click');
  };
});
