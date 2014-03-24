class Blog < ActiveRecord::Base
  has_many :user_blogs
end
