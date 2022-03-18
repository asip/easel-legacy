class AddShootedAtToFrames < ActiveRecord::Migration[7.0]
  def change
    add_column :frames, :shooted_at, :datetime, after: :image_data
  end
end
