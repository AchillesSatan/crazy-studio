class Section < ActiveRecord::Base
  has_many :blogs
  has_one :user_section, :dependent => :destroy

  validates :name, presence: true, uniqueness: true
end
