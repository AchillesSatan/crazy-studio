class Section < ActiveRecord::Base
  validates :name, presence: true, uniqueness: false
end
