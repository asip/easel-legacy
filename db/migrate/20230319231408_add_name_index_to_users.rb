# frozen_string_literal: true

# AddNameIndexToUsers
class AddNameIndexToUsers < ActiveRecord::Migration[7.0]
  def change
    add_index :users, :name, unique: true
  end
end
