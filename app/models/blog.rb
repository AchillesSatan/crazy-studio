class Blog < ActiveRecord::Base
  self.table_name = 'blogs'
  has_many :user_blogs
end
