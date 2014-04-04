class Blog < ActiveRecord::Base
  # self.table_name = 'blogs'
  validates :title, :presence => true
  validates :body, :presence => true
  has_one :user_blog, :dependent => :destroy
end
