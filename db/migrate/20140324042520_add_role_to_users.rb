class AddRoleToUsers < ActiveRecord::Migration
  def change
    add_column :users, :role, :string, :default => 'reader', after: :email
    add_column :users, :name, :string, after: :role

    User.create! do |u|
      u.email    = 'achillessatan@gmail.com'
      u.password = 'admin123'
      u.role     = 'administrator'
      u.name     = 'yunjie.zhang'
    end
  end
end
