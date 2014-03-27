class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  skip_before_filter :verify_authenticity_token

  include User::BlogModule

  def role?(r)
    role.include? r.to_s
  end
end
