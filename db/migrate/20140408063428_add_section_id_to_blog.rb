class AddSectionIdToBlog < ActiveRecord::Migration
  def change
    add_column :blogs, :section_id, :integer, after: :body
  end
end
