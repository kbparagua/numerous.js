# Numerous.js
Unobtrusive Javascript helper for dynamically creating fields_for objects for Rails.


## Minimum Requirements
- JQuery 1.7


## Installment
1. Download numerous.js file
2. Move it to your javascript folder or anywhere that can be accessed publicly


## Example in Rails 3

Assuming that Post has many Tags

    <%= form_for @post do |form| %>
      Title: <%= form.text_field :title %>
      Body: <%= form.text_field :body %>
      
      Tags:
      <div id="tag-list"></div>
      
      <div class="numerous">
        <div>
          <%= form.fields_for :tag, Tag.new, :child_index => "replace_this" do |f| %>
            <%= f.text_field :name %>
            <%= f.hidden_field :_destroy, :value => 0, :class => "numerous-remove-field" %>
            <%= link_to "delete", "#", :class => "numerous-remove" %>
          <% end %>
        </div>
        
        <%= link_to "add tag", "#", :class => "numerous-add", :id => "for-key-list" %>
      </div>
    <% end %>
    
        
## Usage and Conventions

### Add Tag

`<%= link_to "add tag", "#", :class => "numerous-add", :id => "for-key-list" %>`

- `numerous-add` class is required
- `for-key-list` id is used as a reference on which div will the new fields
will be appended

Add Tag's id must be in this format: `for-<id of div to update>`


### Fields For

`<%= form.fields_for :tag, Tag.new, :child_index => "replace_this" do |f| %>`

- The target `fields_for` must be inside a div element
- The target `fields_for` must have the string `"replace_this"` as its `child_index` value


### Delete Tag

`<%= f.hidden_field :_destroy, :value => 0, :class => "numerous-remove-field" %>`
`<%= link_to "delete", "#", :class => "numerous-remove" %>`

- `numerous-remove` class is required
- a hidden_field `_destroy` is required and must have the class `numerous-remove-field` 
- `:allow_destroy => true` must be set on `accpets_nested_attributes_for`


## Credits

Karl Bryan P. Paragua
www.daftcoder.com


## License

numerous.js is a free software, and may be redistributed under the terms specified in the LICENSE file.



