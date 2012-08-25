# Numerous.js
Unobtrusive Javascript helper for dynamically creating fields_for objects for Rails.


## Minimum Requirements
- JQuery 1.7 or higher


## Installment
1. Download numerous.js file
2. Move it to your javascript folder or anywhere that can be accessed by your app
3. Include it in your html file


## Quick Start

1. Create a div where the new forms will be appended.
`<div id="objects"></div>`


2. Create an fields_for template to be used when adding a new object. 
      <div id="fields-for-objects" class="numerous'>
        <%= form.fields_for :objects, Object.new, :child_index => 'replace_this' do |f| %>
          <%= f.text_field :object_field %>
          <%= f.text_field :another_object_field %>
          
          ...
          
          <div class="numerous-remove">
            <%= f.hidden_field :_destroy, :value => 0 %>
            <%= link_to 'Remove', '#' %>
          </div>
      </div>


3. Create a link to add new objects. 
`<%= link_to 'Add Object', '#', :id => 'add-to-objects' %>`



4. Call `Numerous.init()` when the document is ready:
      $(document).ready(function(){
        Numerous.init();
      });



## Naming Conventions

1. The whole `fields_for` section must be under a div like this:
`<div id="fields-for-[element's id where to append new forms]" class="numerous">`

2. `fields_for` objects must have 'replace_this' as the `:child_index` value.

3. Put a `numerous-remove` element if you want the ability to delete objects.
      <div class="numerous-remove">
        <%= f.hidden_field :_destroy, :value => 0 %>
        <%= link_to 'Remove', '#' %>
      </div>
      
Note: Set `:allow_destroy => true` to the parent model if you want this functionality.
    class Parent < ActiveRecord::Base
      has_many :objects
      accepts_nested_attributes_for :objects, :allow_destroy => true
    end


4. The add link must follow this id template:
`<%= link_to 'Add Object', '#', :id => 'add-to-[element's id where to append new forms]' %>`



## Credits

Karl Bryan P. Paragua
www.daftcoder.com


## License

numerous.js is a free software, and may be redistributed under the terms specified in the LICENSE file.
