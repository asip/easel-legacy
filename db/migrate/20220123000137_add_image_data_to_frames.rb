class AddImageDataToFrames < ActiveRecord::Migration[6.1]
  def up
    add_column :frames, :image_data, :text, after: :comment
    remove_column :frames, :image_id
  end

  def down
    remove_column :image_data
    add_column :frames, :image_id, :string, after: :comment
  end
end
