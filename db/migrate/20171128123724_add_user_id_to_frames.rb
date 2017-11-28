class AddUserIdToFrames < ActiveRecord::Migration[5.1]
  def change
    add_column :frames, :user_id, :integer, after: :id
  end
end
