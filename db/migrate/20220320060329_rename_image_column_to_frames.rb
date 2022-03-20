class RenameImageColumnToFrames < ActiveRecord::Migration[7.0]
  def change
    rename_column :frames, :image_data, :file_data
  end
end
