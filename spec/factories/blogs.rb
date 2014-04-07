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

FactoryGirl.define do
  factory :blog do
    title "myblog"
    body  "This is a blog"
  end
end
