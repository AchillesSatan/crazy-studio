class UserBlog < ActiveRecord::Base
  belongs_to :user
  has_one :blog
end
