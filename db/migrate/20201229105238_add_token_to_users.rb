# frozen_string_literal: true

# add token to users
class AddTokenToUsers < ActiveRecord::Migration[6.1]
  # rubocop:disable Rails/BulkChangeTable
  def change
    add_column :users, :token, :string, after: :id
    add_index :users, :token, unique: true
  end
  # rubocop:enable Rails/BulkChangeTable
end
