class Blog < ActiveRecord::Base
  # self.table_name = 'blogs'
  has_one :user_blog, :dependent => :destroy
end
