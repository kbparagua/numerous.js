# Numerous.js
Unobtrusive Javascript helper for dynamically creating fields_for objects for Rails.


## Minimum Requirements
- JQuery 1.7


## Installment
1. Download numerous.js file
2. Move it to your javascript folder or anywhere that can be accessed publicly


## Example on Rails 3

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
