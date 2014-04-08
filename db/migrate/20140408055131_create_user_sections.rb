class CreateUserSections < ActiveRecord::Migration
  def change
    create_table :user_sections do |t|
      t.integer :user_id, null: false
      t.integer :section_id, null: false

      t.timestamps
    end

    add_index :user_sections, [:user_id, :section_id], unique: true

  end
end
