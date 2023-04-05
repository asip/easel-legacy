# frozen_string_literal: true

# AddNameEmailIndexToUsers
class AddNameEmailIndexToUsers < ActiveRecord::Migration[7.0]
  def change
    change_table :users, bulk: true do |t|
      t.remove_index :name
      t.index %i[name email], unique: true
    end
  end
end
