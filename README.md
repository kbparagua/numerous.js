# Numerous.js
Unobtrusive Javascript helper for dynamically creating fields_for objects for Rails.


## Minimum Requirements
- JQuery 1.7 or higher
- Rails 2.3.2 to 3.*


## Installation
1. Download numerous.js file
2. Move it to your javascript folder or anywhere that can be accessed by your app
3. Include it in your html file


## Live Demo

[Try Numerous.js!!](http://numerous-js.herokuapp.com/)


## Quick Start

1. Create an element where the new forms will be appended.

        <div id="list"></div>


2. Create a `fields_for` template to be used when adding a new object. 

        <div id="fields-for-list" class="numerous'>
        
          <%= form.fields_for :objects, Object.new, :child_index => 'replace_this' do |f| %>
            <%= f.text_field :object_field %>
            <%= f.text_field :another_object_field %>
           ...    
            <%= link_to 'Remove', '#', :class => 'numerous-remove' %>
        </div>


3. Create a link for adding new objects. 

        <%= link_to 'Add Object', '#', :id => 'add-to-list' %>



4. Call `Numerous.init()` when the document is ready:

        $(document).ready(function(){
          Numerous.init();
        });



## Naming Conventions

1. The whole `fields_for` section must be under a div like this:

        <div id="fields-for-[list id]" class="numerous">

2. `fields_for` objects must have 'replace_this' as the `:child_index` value.
        
        <%= form.fields_for :objects, Object.new, :child_index => 'replace_this' do |f| %>


3. Put a `numerous-remove` link if you want the ability to delete objects.
        
        <%= link_to 'Remove', '#', :class => 'numerous-remove' %>
      

  Set `:allow_destroy => true` to the parent model if you want this functionality.

        class Parent < ActiveRecord::Base
          has_many :lists
          accepts_nested_attributes_for :lists, :allow_destroy => true
        end


4. The add link must follow this id template:
        
        <%= link_to 'Add Object', '#', :id => 'add-to-[list id]' %>


## Callbacks
You can add callbacks which will be called after adding or removing a `fields_for` instance.

        Numerous.init({
          'list-name' : {
            'add' : function(form){
              alert("I'm adding another fields_for instance!");
              // do something here
            },
            
            'remove' : function(form){
              alert("I'm removing a fields_for instance!");
              // do something here
            }
          }
        });

The `add` and `remove` callbacks take 1 parameter which is the `fields_for` element that is added or removed. 


## Updating Objects
By default numerous.js is adding `fields-for-[list id]` class to all `fields_for` instance you've added.
If you want to be able to remove existing objects, put the `fields_for` under a `fields-for-[list id]` div.

        <% parent.lists.each do |list| %>
          <div class='fields-for-list'>
            <%= form.fields_for :list, list do |f| %>
              <%= f.text_field :object_field %>
              <%= f.text_field :another_object_field %>
              ...    
              <%= link_to 'Remove', '#', :class => 'numerous-remove' %>
            <% end %>
          </div>
        <% end %>

## Initialization Options

`add : function()`
- A callback that will be called every time a new object is added.
- This function may be called while show/hide animations are still playing.

`remove : function()`
- A callback that will be called every time an object is removed.
- This function may be called while show/hide animations are still playing.

`initial : number | function()`
- An integer or a funtion that returns an integer.
- The list will initially have this number of object.
- defaults to 0.

`after-initialize : function()`
- A callback that will be called after initializing the list.

`animation-options : PlainObject`
- A hash of options passed to jQuery's [show()](http://api.jquery.com/show/) and [hide()](http://api.jquery.com/hide/) methods.
- See [jQuery's documentation](http://api.jquery.com/) for information on the fields avaliable for this option.

## Helper Methods

`Numerous.count(String list)`
- returns the current count (Number) of the visible objects under the passed list


`Numerous.get(String list)`
- returns all the objects (HTML Elements) under the passed list


`Numerous.removeAll(String list)`
- triggers the remove link of all the list objects

## Credits

Karl Bryan P. Paragua

www.daftcoder.com


## License

numerous.js is a free software, and may be redistributed under the terms specified in the LICENSE file.
