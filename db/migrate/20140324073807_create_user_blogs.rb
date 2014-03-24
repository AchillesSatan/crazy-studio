class CreateUserBlogs < ActiveRecord::Migration
  def change
    create_table :user_blogs do |t|
      t.integer :user_id, null: false
      t.integer :blog_id, null: false

      t.timestamps
    end
    add_index :user_blogs, [:user_id, :blog_id], unique: true
  end
end
