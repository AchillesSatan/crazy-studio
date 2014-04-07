# == Schema Information
#
# Table name: user_blogs
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  blog_id    :integer          not null
#  created_at :datetime
#  updated_at :datetime
#
# Indexes
#
#  index_user_blogs_on_user_id_and_blog_id  (user_id,blog_id) UNIQUE
#

class UserBlog < ActiveRecord::Base
  belongs_to :user
  belongs_to :blog
end
