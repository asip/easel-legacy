class CreateFrames < ActiveRecord::Migration[5.1]
  def change
    create_table :frames do |t|
      t.string :name, null: false
      t.text :comment
      t.string :image_id, null: false
      t.timestamps
    end
    add_index :frames, :image_id, unique: true
  end
end
