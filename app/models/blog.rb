# == Schema Information
#
# Table name: blogs
#
#  id         :integer          not null, primary key
#  title      :string(255)      not null
#  body       :text             not null
#  created_at :datetime
#  updated_at :datetime
#

class Blog < ActiveRecord::Base
  # self.table_name = 'blogs'
  validates :title, :presence => true
  validates :body, :presence => true
  has_one :user_blog, :dependent => :destroy
  belongs_to :section

  acts_as_taggable

  scope :by_join_date, order("created_at ASC")
end
