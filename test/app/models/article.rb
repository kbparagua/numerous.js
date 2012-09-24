class Article < ActiveRecord::Base
  attr_accessible :title, :body, :tags_attributes
  
  has_many :tags, :dependent => :destroy
  accepts_nested_attributes_for :tags, :allow_destroy => true
end
