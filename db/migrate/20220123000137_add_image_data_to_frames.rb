# frozen_string_literal: true

# add image_data to frames
class AddImageDataToFrames < ActiveRecord::Migration[6.1]
  # rubocop:disable Rails/BulkChangeTable
  def up
    add_column :frames, :image_data, :text, after: :comment
    remove_column :frames, :image_id
  end
  # rubocop:enable Rails/BulkChangeTable

  def down
    remove_column :image_data
    add_column :frames, :image_id, :string, after: :comment
  end
end
